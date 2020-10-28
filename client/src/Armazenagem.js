import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './Reducers';

const estadoInicial = {};

const middleWare = [thunk];

const Armazenagem = createStore(
  rootReducer,
  estadoInicial,
  composeWithDevTools(applyMiddleware(...middleWare))
);


export default Armazenagem