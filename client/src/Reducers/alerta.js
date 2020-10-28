import { SET_ALERTA, REMOVE_ALERTA} from '../actions/types';


const estadoInicial = [{
    // id: 1,
    // msg: 'Faça o login',
    // alertType: 'success'
}];

export default function(estado = estadoInicial, acao){

    const { type, payload} = acao;


    switch(type){
        case SET_ALERTA:
        return [...estado,payload];
        case REMOVE_ALERTA:
        return estado.filter(alert => alert.id !== payload);
        default:
            return estado; //todo reducer tem esse default
    }

}