import axios from 'axios';
import { setAlerta } from './setAlerta';
import {
  PEGA_SABER,
  PEGA_SABERES,
  ERRO_SABER,
  ATUALIZA_CURTIDAS,
  ATUALIZA_INSCRIÇÃO,
  ATUALIZA_PERFIL,
  ADICIONA_SABER,
  ADICIONA_COMENTARIO,
  DELETA_SABER,
  DELETA_COMENTARIO,
} from './types';

//Pega Saberes

export const pegaSaberes = () => async (dispatch) => {
  try {
    const res = await axios.get('api/posts');

    dispatch({
      type: PEGA_SABERES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERRO_SABER,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Pega Saberes

export const pegaSaber = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`api/posts/${id}`);

    dispatch({
      type: PEGA_SABER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERRO_SABER,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Adiciona Curtida - inscrição Saber

export const addCurtida = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/curtir/${id}`);
    //  const res3 = await axios.put(`api/perfis`,saber);

    dispatch({
      type: ATUALIZA_CURTIDAS,
      payload: { id, curtidas: res.data },
      //retorna id do post e array de curtidas
    });

    // dispatch({
    //     type: ATUALIZA_INSCRIÇÃO,
    //     payload: res3.data
    //     //retorna saber-post para perfil do usuario como inscrição
    // })
    // const res2 =await axios.put('/api/perfis/experiencia',perfil,config);
    // dispatch({
    //     type: ATUALIZA_PERFIL,
    //     payload: res2.data,
    //   });
  } catch (err) {
    dispatch({
      type: ERRO_SABER,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Deleta Curtida - inscrição

export const deletaCurtida = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/descurtir/${id}`);

    dispatch({
      type: ATUALIZA_CURTIDAS,
      payload: { id, curtidas: res.data },
      //retorna id do post e array de curtidas
    });
  } catch (err) {
    dispatch({
      type: ERRO_SABER,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Deleta Saber

export const deletaSaber = (id) => async (dispatch) => {
  if (window.confirm('Quer mesmo deletar este Saber?')) {
    try {
      const res = await axios.delete(`api/posts/${id}`);

      dispatch({
        type: DELETA_SABER,
        payload: id,
        //retorna id do post
      });

      dispatch(setAlerta('Saber Removido', 'success'));
    } catch (err) {
      dispatch({
        type: ERRO_SABER,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Addiciona saber
export const addSaber = (dadosFormulario) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`api/posts`, dadosFormulario, config);

    dispatch({
      type: ADICIONA_SABER,
      payload: res.data,
      //retorna dados do formulario de saber
    });

    dispatch(setAlerta('Saber Criado', 'success'));
  } catch (err) {
    dispatch({
      type: ERRO_SABER,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};





//Addiciona COMENTARIO
export const addComentario = (idPost,dadosFormulario) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const res = await axios.post(`api/posts/comentarios/${idPost}`, dadosFormulario, config);
  
      dispatch({
        type: ADICIONA_COMENTARIO,
        payload: res.data,
        //retorna dados do formulario de saber
      });
  
      dispatch(setAlerta('Comentario adicionado', 'success'));
    } catch (err) {
      dispatch({
        type: ERRO_SABER,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };


  
//Deleta COMENTARIO
export const deletaComentario = (idPost,idComentario) => async (dispatch) => {
    

    try {
      const res = await axios.delete(`api/posts/comentarios/${idPost}/${idComentario}`);
  
      dispatch({
        type: DELETA_COMENTARIO,
        payload: idComentario,
        //retorna dados do formulario de saber
      });
  
      dispatch(setAlerta('Comentário removido', 'success'));
    } catch (err) {
      dispatch({
        type: ERRO_SABER,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
