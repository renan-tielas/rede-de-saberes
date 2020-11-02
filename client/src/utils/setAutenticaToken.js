import axios from 'axios'; //pra fazer um global header

const setAutenticacaoToken = token => {

    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;

    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }

}

export default setAutenticacaoToken