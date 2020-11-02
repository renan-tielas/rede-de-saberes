import {SET_ALERTA , REMOVE_ALERTA} from './types';
import {v4 as uuid} from 'uuid'


export const setAlerta = (msg, tipoAlerta, temporizador = 5000) => dispatch =>{ //usando thunk 
  
    const id = uuid();

    dispatch({
        type: SET_ALERTA,
        payload: {msg, tipoAlerta,id}
    });

    setTimeout(() => dispatch({
        type: REMOVE_ALERTA,
        payload: id
    }),
    temporizador);

};