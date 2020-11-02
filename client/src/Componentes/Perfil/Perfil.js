import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Roda from '../layout/Roda';
import { pegaPerfilPorId } from '../../actions/perfiL';
import PerfilTopo from './PerfilTopo'
import PerfilSobre from './PerfilSobre'
import PerfilExperiencia from './PerfilExperiencia'
import PerfilSaberes from './PerfilSaberes'
// import PerfilSaberes2 from './PerfilSaberes2'

const Perfil = ({
  pegaPerfilPorId,
  perfil_r: { perfil, loading },
  autentica,
  match,
}) => {


  useEffect(() => {
    pegaPerfilPorId(match.params.id); //comando do react para pegar id -match
   
}, [pegaPerfilPorId, match.params.id]);

  return (

  
    <Fragment>
      
      {perfil === null || loading ? (
        <Roda />) : (
        <Fragment>
          <Link to='/perfis' className='btn btn-light'>
            Voltar para perfis
          </Link>
          {autentica.isAuthenticated && autentica.loading === false 
          && autentica.usuario._id === perfil.usuario._id && (<Link to='editar-perfil'
            className="btn btn-dark"> Editar Perfil  </Link>)}
        </Fragment>
      )}



<div class="profile-grid my-1">

<PerfilTopo perfil={perfil}/>
<PerfilSobre perfil={perfil}/>
<div className="profile-exp bg-white p-2">
  <h2 className="text-primary">Experiência</h2>
  {perfil.experiencia.length>0?( 
  <Fragment>
    {perfil.experiencia.map(experiencia=>(
      <PerfilExperiencia key={experiencia._id} experiencia={experiencia}/>
    ))}
  </Fragment>
    
     ):( <h4>Sem experiencias inseridas</h4> )}
</div>


<div className="profile-edu bg-white p-2">
  <h2 className="text-primary">Saberes</h2>
  {perfil.saberes.length>0?( 
  <Fragment>
    {perfil.saberes.map(saberes=>(
      <PerfilSaberes key={saberes._id} saberes={saberes}/>
    ))}
  </Fragment>
    
     ):( <h4>Sem experiencias inseridas</h4> )}
</div>




</div>
    </Fragment>
  );
};

Perfil.propTypes = {
  pegaPerfilPorId: PropTypes.func.isRequired,
  perfil: PropTypes.object.isRequired,
  autentica: PropTypes.object.isRequired,
};

const mapStateToProps = (estado) => ({
  perfil_r: estado.perfil_r,
  autentica: estado.autentica,
});

export default connect(mapStateToProps, { pegaPerfilPorId })(Perfil);
