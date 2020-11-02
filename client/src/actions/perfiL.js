import axios from 'axios';
import { setAlerta } from './setAlerta';

import { PEGA_PERFIL,PEGA_PERFIS, ERRO_PERFIL, ATUALIZA_PERFIL, CLEAR_PERFIL, CONTA_DELETADA, PEGA_GITHUB } from './types';

//Pega o perfil do usuário atual
//rota back:api/perfis/eu

export const pegaPerfilAtual = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/perfis/eu');

    dispatch({
      type: PEGA_PERFIL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERRO_PERFIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//Pega perfil por id
//rota back:api/perfis/:id

export const pegaPerfilPorId = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/perfis/usuario/${userId}`);

    dispatch({
      type: PEGA_PERFIL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERRO_PERFIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};



//Pega todos os perfis
//rota back:api/perfis

export const pegaPerfis = () => async (dispatch) => {
  // dispatch ({type:CLEAR_PERFIL})
  try {
    const res = await axios.get('/api/perfis');

    dispatch({
      type: PEGA_PERFIS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERRO_PERFIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//Cria ou atualiza perfil

export const criaPerfil = (dadosFormulario, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { 'Content-type': 'application/json' },
    };


    const res =await axios.post('/api/perfis',dadosFormulario,config);
    dispatch({
        type: PEGA_PERFIL,
        payload: res.data,
      });

      dispatch(setAlerta(edit ? 'PerfilAtualizado' : 'Perfil Criado', 'success'));
// 
      if(!edit) {
          history.push('/painel'); // Redireciona o usuario para o painel, nao pode usar <Redirect/>
      }



  } catch (err) {

    const errors = err.response.data.errors;

        if (errors){  //manda mensagem de erro flexivel
            errors.forEach( error => dispatch(setAlerta(error.msg,'danger')))
        }
    dispatch({
        type: ERRO_PERFIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
  }
};


// ADICIONAR EXPERIENCIA

export const addExperiencia = (dadosFormulario, history) => async dispatch => {

  try {
    const config = {
      headers: { 'Content-type': 'application/json' }
    };


    const res =await axios.put('/api/perfis/experiencia',dadosFormulario,config);
    dispatch({
        type: ATUALIZA_PERFIL,
        payload: res.data,
      });

      dispatch(setAlerta('Experiencia adicionada', 'success'));

    history.push('/painel'); // Redireciona o usuario para o painel, nao pode usar <Redirect/>

  } catch (err) {

    const errors = err.response.data.errors;

        if (errors){  //manda mensagem de erro flexivel
            errors.forEach( error => dispatch(setAlerta(error.msg,'danger')))
        }
    dispatch({
        type: ERRO_PERFIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
  }


}





// ADICIONAR SABERES

export const addSaberes = (dadosFormulario, history) => async dispatch => {

  try {
    const config = {
      headers: { 'Content-type': 'application/json' },
    };


    const res =await axios.put('/api/perfis/saberes',dadosFormulario,config);
    dispatch({
        type: ATUALIZA_PERFIL,
        payload: res.data
      });

      dispatch(setAlerta('Saber adicionado', 'success'));
// 

          history.push('/painel'); // Redireciona o usuario para o painel, nao pode usar <Redirect/>

  } catch (err) {

    const errors = err.response.data.errors;

        if (errors){  //manda mensagem de erro flexivel
            errors.forEach( error => dispatch(setAlerta(error.msg,'danger')))
        }
    dispatch({
        type: ERRO_PERFIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
  }


}


// DELETAR EXPERIENCIA

export const deletaExperiencia = id => async dispatch => {

  try {
    const res = await axios.delete(`/api/perfis/experiencia/${id}`);


    dispatch( {
      type: ATUALIZA_PERFIL,
      payload: res.data
    });

    dispatch(setAlerta('Experiencia removida', 'success'));

  } catch (err) {
    dispatch({
        type: ERRO_PERFIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
  }
}



// DELETAR SABER

export const deletaSaberes = id => async dispatch => {

  try {
    const res = await axios.delete(`/api/perfis/saberes/${id}`);


    dispatch( {
      type: ATUALIZA_PERFIL,
      payload: res.data
    });

    dispatch(setAlerta('Saber removido', 'success'));

  } catch (err) {
    dispatch({
        type: ERRO_PERFIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
  }
}


//DELETA CONTA E PERFIL




export const deletaConta = () => async dispatch => {


  if(window.confirm('Tem certeza? Isso não pode ser desfeito')){
  try {
    await axios.delete(`/api/perfis`);


    dispatch( { type: CLEAR_PERFIL });
    dispatch( { type: CONTA_DELETADA });
    dispatch(setAlerta('Sua conta foi deletada permanentemente'));

  } catch (err) {
    dispatch({
        type: ERRO_PERFIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
  }
}
};




//Pega os repositórios no github
//rota back: ?

export const pegaGithub = nomeusuario => async dispatch => {
  try {
    const res = await axios.get(`/api/perfis/github/${nomeusuario}`);

    dispatch({
      type: PEGA_GITHUB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERRO_PERFIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
