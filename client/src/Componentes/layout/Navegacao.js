// import { connect } from 'mongoose'
import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from'react-redux';
import PropTypes from 'prop-types';
import {logouT} from'../../actions/autenticA';

const Navegacao = ({autentica:{isAuthenticated, loading},logouT}) => {
    
  const authLinks =(
    <ul>
      <li><Link to='/perfis'>
       Perfis 
        </Link></li>
        <li><Link to='/posts'>
       Saberes
        </Link></li>
      <li><Link to='/painel'>
        <i className='fas fa-user'/>{''} 
        <span className='hide-sm'> Painel </span> 
        </Link></li>
    
    <li><a onClick={logouT} href='#!'>
    <i className="fas fa-sign-out-alt"></i>{' '}
    <span className="hide-sm">Sair</span>
    </a></li>
    </ul>
  )
  

  const guestLinks =(
    <ul>
      <li><Link to='/perfis'>
       Perfis 
        </Link></li>
    <li><a href='#!'>Pessoas</a></li>
    <li><a href='#!'>Grupos</a></li>
    <li><a href='#!'>Redes</a></li>         
    <li><Link to='/cadastro'>Cadastro</Link></li>
    <li><Link to='/login'>Login</Link></li>
  </ul>
  )
  
  
 


  return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to='/'><i className="fas fa-code"></i> Rede de Saberes</Link>
        </h1>
  {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
      </nav>
    )
}

Navegacao.propTypes ={
  logouT:PropTypes.func.isRequired,
  autentica:PropTypes.object.isRequired
}

const mapStateToProps = estado => ({
  autentica:estado.autentica
})

export default connect(mapStateToProps, {logouT})(Navegacao)
