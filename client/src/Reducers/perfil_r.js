import { ERRO_PERFIL, PEGA_PERFIL, PEGA_PERFIS,CLEAR_PERFIL, ATUALIZA_PERFIL, PEGA_GITHUB } from "../actions/types";

const estadoInicial ={
    perfil:null, //perfil pessoal ou de amigos, singular
    perfis:[], // lista de perfis
    repos:[], //respositorios github
    loading: true,
    error: {} 
}

export default function(estado = estadoInicial, ApplicationCache) {

    const {type, payload} = ApplicationCache;
    switch(type){
        case PEGA_PERFIL:
        case ATUALIZA_PERFIL:
        return{
            ...estado,
            perfil:payload,
            loading:false
        };

        case PEGA_PERFIS:
        return{
            ...estado,
            perfis:payload,
            loading:false
        };
        
        case ERRO_PERFIL:
        return {
            ...estado,
            error:payload,
            loading: false
        };
        case CLEAR_PERFIL:
        return {
            ...estado,
            perfil: null,
            repos: [],
            loading: false
        };
        case PEGA_GITHUB:
        return{
            ...estado,
            repos:payload,
            loading:false
        };
        default:
            return estado;
    }
}