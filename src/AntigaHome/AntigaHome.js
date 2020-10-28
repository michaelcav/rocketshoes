
/**  HOME ANTES DE SER REFATORADA COM REACT HOOKS  **/

import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from "react-icons/md";
import { formatPrice } from "../../util/format";

import api from "../../services/api";
import * as CartActions from '../../store/modules/cart/actions'
import { ProductList } from "./styles";

function Home({ amount, addToCartRequest }) {
    const [products, setProducts] = useState([]);

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
        addToCartRequest(id);

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

const mapStateToProps = state => ({
    amount: state.cart.reduce((amount, product) => {
        // criando um objeto que a chave é o id do produto e o valor vindo do amount
        amount[product.id] = product.amount

        return amount;
    }, {}) // obj initical como vazio,
});

// mapDispachToProps, converte actions do redux em propriedades para o componente
const mapDispachToProps = dispatch =>
    bindActionCreators(CartActions, dispatch)
// se o primeiro paramentro ainda n tiver mapStateToProps, ele é cetado como null.
export default connect(mapStateToProps, mapDispachToProps)(Home);
