import React from 'react';
import '../../App.css';
import {Link} from 'react-router-dom'


const Cheganca = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Rede de Saberes</h1>
          <p className="lead">
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

export default Cheganca;
