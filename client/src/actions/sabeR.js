import axios from 'axios';
import {setAlerta} from './setAlerta';
import { PEGA_SABERES, ERRO_SABER, ATUALIZA_CURTIDAS,ATUALIZA_INSCRIÇÃO,ATUALIZA_PERFIL, DELETAR_SABER} from './types';


//Pega Saberes


export const pegaSaberes = () => async dispatch =>{
    try {
        const res = await axios.get('api/posts');

        dispatch({
            type: PEGA_SABERES,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: ERRO_SABER,
            payload: { msg: err.response.statusText, status: err.response.status },
          });
    }
}


//Adiciona Curtida - inscrição Saber


export const addCurtida = (id) => async dispatch =>{
    try {
        const res = await axios.put(`api/posts/curtir/${id}`);
        //  const res3 = await axios.put(`api/perfis`,saber);
         

        dispatch({
            type: ATUALIZA_CURTIDAS,
            payload: ({id, curtidas: res.data})
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
}


//Deleta Curtida - inscrição


export const deletaCurtida = id => async dispatch =>{
    try {
        const res = await axios.put(`api/posts/descurtir/${id}`);

        dispatch({
            type: ATUALIZA_CURTIDAS,
            payload: ({id, curtidas: res.data})
            //retorna id do post e array de curtidas
        });

    } catch (err) {
        dispatch({
            type: ERRO_SABER,
            payload: { msg: err.response.statusText, status: err.response.status },
          });
    }
}





//Deleta Saber


export const deletaSaber = id => async dispatch =>{
    try {
        const res = await axios.delete(`api/posts/${id}`);

        dispatch({
            type: DELETAR_SABER,
            payload: id
            //retorna id do post
        });
        
        dispatch(setAlerta('Saber Removido','success'));

    } catch (err) {
        dispatch({
            type: ERRO_SABER,
            payload: { msg: err.response.statusText, status: err.response.status },
          });
    }
}
