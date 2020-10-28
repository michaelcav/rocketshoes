// func busca as infos na pai e só apos chama o reducer
// function* é um generator igual o async, só que mais potente.
// yield = await no generator
// sempre que precisar utilizar algo asyncrono antes de uma info ser alterada pelo reducer, o uso do ReduxSaga é recomendado.
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { toast } from 'react-toastify'
import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
    const productExists = yield select(state =>
        state.cart.find(p => p.id === id));

        const stock = yield call(api.get, `/stock/${id}`);

        const stockAmount = stock.data.amount;
        const currentAmount = productExists ? productExists.amount : 0;
        const amount = currentAmount + 1;
      
        if (amount > stockAmount) {
          toast.error('Quantidade solicitada fora do estoque.');
          return;
        }

    if (productExists) {
        const amount = productExists.amount + 1;
      // Com Request o saga teria que verificar o stock mais uma vez.
        yield put(updateAmountSuccess(id, amount));
    } else {
        const response = yield call(api.get, `/products/${id}`);

        const data = {
            ...response.data,
            amount: 1,
            priceFormatted: formatPrice(response.data.price),
        };


        yield put(addToCartSuccess(data));
        
     
    }
       // user será encaminhado para a rota cart após add produto.
       history.push('/cart');
}

function* updateAmount({ id, amount }) {
    // n deixa o valor do update ser menor do que 1.
    if (amount <= 0) return;
  
    const stock = yield call(api.get, `/stock/${id}`);
  
    const stockAmount = stock.data.amount;
    if (amount > stockAmount) {
      toast.error('Quantidade solicitada fora do estoque.');
      return;
    }
  
    yield put(updateAmountSuccess(id, amount));
  }

// takeLatest é um listner q vai previnir que 2 produtos sejam add se o user clicar muito rápido no button de add cart.
export default all([
    takeLatest('@cart/ADD_REQUEST', addToCart),
    takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount)
]);
