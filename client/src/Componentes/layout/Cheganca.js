import React from 'react';
import '../../App.css';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'


const Cheganca = ({isAuthenticated}) => {

  if(isAuthenticated){
    return <Redirect to='/painel'/>;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large p-1" >Sementes de Saberes</h1>
          <p className="lead p-1">
            Crie seu perfil na comunidade, compartilhe saberes, e articule com
            outras pessoas.
          </p>
          <div className="buttons">
          <Link to='/cadastro' className="btn btn-primary">
              Cadastro
            </Link>
            <Link to='/login' className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Cheganca.propTypes ={
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps = estado => ({
  isAuthenticated : estado.autentica.isAuthenticated
  });


export default connect(mapStateToProps)(Cheganca);
