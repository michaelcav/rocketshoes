import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
// Toast usado para dar aviso sobre o stock para o user.
import { ToastContainer } from 'react-toastify';
// Reactotron antes de store
import './config/ReactotronConfig';
import GlobalStyle from "./styles/global";
import Header from "./components/Header/index.js";
import Routes from "./routes";
// "history": "^4.9.0" funcionando, versão mais recente contem problemas.
import history from './services/history';
import store from "./store";
// Privider deixa disponivel o store, para todos os modulos da aplicação.
// com o history Router é usado no lugar de BrowserRouter 
// ReactRouterDom recebe as infos de history e faz a navegação de telas automaticamente. 
function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
