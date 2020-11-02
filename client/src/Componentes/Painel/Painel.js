import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletaConta, pegaPerfilAtual } from '../../actions/perfiL';
import { PainelAcoes } from '../Painel/PainelAcoes';
import Experiencias from './Experiencias';
import Saberes from './Saberes';
import Roda from '../layout/Roda';

const Painel = ({
  pegaPerfilAtual,
  autentica: { usuario },
  perfil_r: { perfil, loading },
  deletaConta
}) => {
  useEffect(() => {
    pegaPerfilAtual();
  }, [pegaPerfilAtual]);

  return loading && perfil == null ? (
    <Roda />
  ) : (
    <Fragment>
      <h1 className="large text-primary"> Painel </h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Bem vinde {usuario && usuario.nome}
      </p>
      {perfil !== null ? (
        <Fragment>
          <PainelAcoes />
          <Experiencias experiencia={perfil.experiencia}/>
          <Saberes saberes={perfil.saberes}/>

          <div className='my-2'>
            <button className="btn btn-danger" onClick={() => deletaConta()}>
              <i className="fas fa-user-minus"></i> Deletar minha conta

            </button>
          </div>

        </Fragment>
      ) : (
        <Fragment>
          <p>
            Você ainda não tem um perfil, por favor adicione algumas informações
          </p>
          <Link to="/criar-perfil" className="btn btn-primary my-1">
            Criar Perfil
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Painel.propTypes = {
  pegaPerfilAtual: PropTypes.func.isRequired,
  autentica: PropTypes.object.isRequired,
  perfil_r: PropTypes.object.isRequired,
  deletaConta: PropTypes.func.isRequired,
}; // sao os reducers e açoes, com os estados

const mapStateToProps = (estado) => ({
  //busca os estados e coloca aqui nesse componente
  perfil_r: estado.perfil_r,
  autentica: estado.autentica,
  
});

export default connect(mapStateToProps, { pegaPerfilAtual, deletaConta })(Painel);
