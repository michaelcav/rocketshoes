import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from "react-icons/md";
import { formatPrice } from "../../util/format";

import api from "../../services/api";
import * as CartActions from '../../store/modules/cart/actions'
import { ProductList } from "./styles";

function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state => state.cart.reduce((sumAmount, product) => {
    // criando um objeto que a chave é o id do produto e o valor vindo do amount
    sumAmount[product.id] = product.amount

    return sumAmount;
  }, {})); // obj initical como vazio,)

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("products");
      // formatar o preço apartir da api. Evitando funcs dentro do render() todo o tipo de formatação e recomendavel fazer antes mesmo de cheggar no render.
      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []); /* <-- array vazio, para o useEffect executar apenas 1 vez quando o componente for montado */

  function handleAddProduct(id) {
    // dispatch serve para disparar uma action ao Redux.
    // dispatch faz com q todos os reducers da aplicação sejam chamados, por isso o switch em reducer.js garante que cart só ouça a acction ADD_TO_CART.
    // dispatch em mapDispachToProps.
    dispatch(CartActions.addToCartRequest(id));

    // this.props.history.push('/cart') o js n sabe que o saga está sendo utilizado, se a ação de add um produto dentro do cart demorar, o user será encaminhado para a rota sem o produto.
  }

  return (
    <ProductList>
      {products.map((product) => (
        // apos um map o primeiro comp precisa ter uma key.
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button"
            // conectado com o Redux.
            onClick={() => handleAddProduct(product.id)}
          >
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />{" "}
              {amount[product.id] || 0 /* se product.amount n existir*/}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

export default Home;
