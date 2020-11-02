import {combineReducers} from 'redux';
import alerta from './alerta'
import autentica from './autentica'
import perfil_r from './perfil_r'
//esse é o root reducer, que combina os reducers

export default combineReducers({
alerta,
autentica,
perfil_r,
});