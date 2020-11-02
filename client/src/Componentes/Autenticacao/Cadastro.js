import React, { Fragment, useState } from 'react';
import { Link , Redirect} from 'react-router-dom';
import { connect } from 'react-redux'; //conecta o componente ao redux
import { setAlerta } from '../../actions/setAlerta';
import { autenticA } from '../../actions/autenticA';
import PropTypes from 'prop-types';

// import axios from 'axios';

const Cadastro = ({ setAlerta, autenticA, isAuthenticated }) => {
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
    }); // pegar os dados dos campos do formulario

  const onSubmit = async (inpt) => {
    inpt.preventDefault();
    if (senha !== senha2) {
      setAlerta('Senhas não são iguais', 'danger', 3000);
    } else {
      autenticA({ nome, email, senha });
    }
  };

  //Redirecionar quando logar
  if(isAuthenticated){
    return <Redirect to="/painel"/>
  }


  return (
    <Fragment>
      <h1 className="large text-primary">Se inscreva :)</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Crie sua conta
      </p>
      <form className="form" onSubmit={(inpt) => onSubmit(inpt)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            value={nome}
            onChange={(inpt) => onChange(inpt)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Endereço de Email"
            value={email}
            onChange={(inpt) => onChange(inpt)}
            name="email"
            // required
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
            // minLength="6"
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirme a Senha"
            name="senha2"
            minLength="6"
            value={senha2}
            onChange={(inpt) => onChange(inpt)}
            // required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Cadastro" />
      </form>
      <p className="my-1">
        Já tem uma conta?<Link to="/login">Entre</Link>
      </p>
    </Fragment>
  );
};

Cadastro.propTypes = {
  setAlerta: PropTypes.func.isRequired,
  autenticA: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
};
const mapStateToProps = estado => ({
  isAuthenticated:estado.autentica.isAuthenticated
});


export default connect(mapStateToProps, { setAlerta, autenticA })(Cadastro); //conecta o componente ao redux
