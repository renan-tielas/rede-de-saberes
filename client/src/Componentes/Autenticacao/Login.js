import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom'
// import axios from 'axios';


const Login = () => {
  const [dadosFormulario, setDadosFormulario] = useState({
    email: '',
    senha: ''
  });

  const { email, senha} = dadosFormulario;

  const onChange = async (inpt) =>
    setDadosFormulario({
      ...dadosFormulario,
      [inpt.target.name]: inpt.target.value,
    });// pegar os dados dos campos do formulario

    const onSubmit = async (inpt) =>{
        inpt.preventDefault();
        console.log('Sucesso');
        //     const novoUsuario = {
        //         nome,
        //         email,
        //         senha
        //     }

        //     try {
        //         const config = {
        //             headers: {
        //                 'Content-Type':'application/json'
        //             }
        //         }
        //         const body = JSON.stringify(novoUsuario);

        //         const res = await axios.post('/api/usuarios',body,config);
        //         console.log(res.data)

        //     } catch (err) {
        //         console.error(err.response.data)


        //  }
    };
    

  return (
    <Fragment>
      <h1 className="large text-primary">Entre</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Entre na sua conta
      </p>
      <form className="form" onSubmit={inpt => onSubmit(inpt)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Endereço de Email"
            value={email}
            onChange={(inpt) => onChange(inpt)}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            name="senha"
            value={senha}
            onChange={(inpt) => onChange(inpt)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Entrar" />
      </form>
      <p className="my-1">
        Não tem uma conta? <Link to='/cadastro'>Cadastre-se</Link>
      </p>
    </Fragment>
  )
  };

  


export default Login;
