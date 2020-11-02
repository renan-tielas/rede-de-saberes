// REDUCER

import { CADASTRO_FALHA, 
  CADASTRO_SUCESSO, 
  USUARIO_CARREGADO, 
  ERRO_AUTENTICACAO,
  LOGIN_SUCESSO,
  LOGIN_FALHA,
  LOGOUT,
  CONTA_DELETADA } from '../actions/types';

const estadoInicial = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  usuario: null
};

export default function(estado = estadoInicial, action) {
      const { type, payload } = action;

  switch (type) {
    case USUARIO_CARREGADO:
      return{
        ...estado,
        isAuthenticated: true,
        loading: false,
        usuario: payload
      }
    case CADASTRO_SUCESSO:
    case  LOGIN_SUCESSO:
      localStorage.setItem('token', payload.token);
      return {
        ...estado,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case CADASTRO_FALHA:
    case ERRO_AUTENTICACAO:
    case LOGIN_FALHA:
    case LOGOUT:
    case CONTA_DELETADA:
      localStorage.removeItem('token');
      return {
        ...estado,
        token: null,
        isAuthenticated: false,
        loading: false,
      }

    default:
      return estado;
  }
}
