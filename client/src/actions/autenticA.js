
// //rascunho

// <div className="profile-top bg-primary p-2">
// <img
//   className="round-img my-1"
//   src={avatar}
//   alt=""
// />
// <h1 className="large">{nome}</h1>
// <p className="lead">{status} 
// {grupo && <span> em {grupo}</span>}
//  </p>
// <p>{local && <span> em {local}</span>}</p>
// <div className="icons my-1">

// {/* {
//     site &&(<a href="#" target="_blank" rel="noopener noreferrer">
//     <i className="fas fa-globe fa-2x"></i>
//   </a>

//     )
// } */}


//AÇÕES

import axios from 'axios';
import {
    CADASTRO_SUCESSO,
    CADASTRO_FALHA,
    USUARIO_CARREGADO,
    ERRO_AUTENTICACAO,
    LOGIN_SUCESSO,
    LOGIN_FALHA,
    LOGOUT,
    CLEAR_PERFIL
} from'./types'
import {setAlerta} from './setAlerta'

import setAutenticaToken from'../utils/setAutenticaToken'

//CARREGA USUARIO

export const carregaUsuario = () => async dispatch => {
    if(localStorage.token){
        setAutenticaToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/autenticacao');

        dispatch({
            type: USUARIO_CARREGADO,
            payload: res.data // dado é o usuario, do back
        })

     
    } catch (err) {
        dispatch({ type: ERRO_AUTENTICACAO})
        
    }

}


// CADASTRA USUARIO

export const autenticA = ( {nome, email, senha}) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({ nome, email , senha});

    try {
        const res = await axios.post('/api/usuarios', body, config);




        dispatch({
            type:CADASTRO_SUCESSO,
            payload: res.data
        });

        dispatch(carregaUsuario())

    } catch (err){
        const errors = err.response.data.errors;


        if (errors){
            errors.forEach( error => dispatch(setAlerta(error.msg,'danger')))
        }
        dispatch({
            type: CADASTRO_FALHA
        });
    }
};





// LOGIN USUARIO

export const logiN = ( email, senha) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({ email , senha});

    try {
        const res = await axios.post('/api/autenticacao', body, config);


        dispatch({
            type:LOGIN_SUCESSO,
            payload: res.data
        });
        dispatch(carregaUsuario());

    } catch (err){
        const errors = err.response.data.errors;

        if (errors){
            errors.forEach( error => dispatch(setAlerta(error.msg,'danger')))
        }
        dispatch({
            type: LOGIN_FALHA
        });
    }
};



//LOGOUT  /CLEAR PROFILE

export const logouT = () => dispatch => {
    dispatch({type : CLEAR_PERFIL});
    dispatch({type : LOGOUT});
    
}
   
    