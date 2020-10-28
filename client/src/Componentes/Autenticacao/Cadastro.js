import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom'
// import axios from 'axios';


const Cadastro = () => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    email: '',
    senha: '',
    senha2: '',
  });

  const { nome, email, senha, senha2 } = dadosFormulario;

  const onChange = async (inpt) =>
    setDadosFormulario({
      ...dadosFormulario,
      [inpt.target.name]: inpt.target.value,
    });// pegar os dados dos campos do formulario

    const onSubmit = async (inpt) =>{
        inpt.preventDefault();
        if (senha !== senha2){
            console.log('Senhas não são iguais');
        } else{
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
    }

  return (
    <Fragment>
      <h1 className="large text-primary">Se inscreva :)</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Crie sua conta
      </p>
      <form className="form" onSubmit={inpt => onSubmit(inpt)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            value={nome}
            onChange={(inpt) => onChange(inpt)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Endereço de Email"
            value={email}
            onChange={(inpt) => onChange(inpt)}
            name="email"
            required
          />
          <small className="form-text">
            Esse site usa Gravatar, então se você quer uma imagem de perfil, use
            um email cadastrado no Gravatar
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirme a Senha"
            name="senha2"
            minLength="6"
            value={senha2} 
          onChange={ inpt => onChange(inpt)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Cadastro" />
      </form>
      <p className="my-1">
        Já tem uma conta?<Link to='/login'>Entre</Link>
      </p>
    </Fragment>
  );
};

export default Cadastro;
