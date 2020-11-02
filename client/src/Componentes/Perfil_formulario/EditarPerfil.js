import React, { useState, Fragment,useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom'
//para usar o redirecionamento de pagina com history dentro de uma ação
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {criaPerfil, pegaPerfilAtual} from '../../actions/perfiL'

const EditarPerfil = ({ perfil_r:{perfil, loading} ,criaPerfil, pegaPerfilAtual, history}) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    grupo: '',
    rede:'',
    site: '',
    local: '',
    status: '',
    habilidades: '',
    githubusername: '',
    biografia: '',
    youtube: '',
    facebook: '',
    email: '',
    instagram: '',
  });

  const [mostrandoLinks, mostraLink] = useState(false);

  useEffect (()=>{
      pegaPerfilAtual();

      setDadosFormulario({

        grupo: loading || !perfil.grupo ? '' :perfil.grupo,
        rede: loading || !perfil.rede ? '' :perfil.rede,
        site: loading || !perfil.site ? '' :perfil.site,
        local: loading || !perfil.local ? '' :perfil.local,
        status: loading || !perfil.status ? '' :perfil.status,
        habilidades: loading || !perfil.habilidades ? '' :perfil.habilidades,
        githubusername: loading || !perfil.githubusername ? '' :perfil.githubusername,
        biografia: loading || !perfil.links ? '' :perfil.biografia,
        youtube: loading || !perfil.links ? '' :perfil.youtube,
        facebook: loading || !perfil.links ? '' :perfil.facebook,
        email: loading || !perfil.links ? '' :perfil.email,
        instagram: loading || !perfil.links ? '' :perfil.instagram,
       
      });

  }, [loading, pegaPerfilAtual]);

  const {
    grupo,
    rede,
    site,
    local,
    status,
    habilidades,
    githubusername,
    biografia,
    youtube,
    facebook,
    email,
    instagram,
  } = dadosFormulario;

  const onChange = (e) =>
    setDadosFormulario({ ...dadosFormulario, [e.target.name]: e.target.value });


  const onSubmit = e =>{
      e.preventDefault();
      criaPerfil(dadosFormulario, history,true);
    }
  return (
    <Fragment>
      <h1 className="large text-primary">Crie seu perfil</h1>
      <p className="lead">
        <i className="fas fa-user"></i> 
        Vamos adicionar suas informações para que os outros possam ver.
      </p>
      <small>* = campo obrigatório</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0"> Você é...</option>
            <option value="Pessoa">Pessoa</option>
            <option value="Grupo">Grupo</option>
            <option value="Rede">Rede</option>
            <option value="Outro">Outro</option>
          </select>
          {/* <small className="form-text"
            >Uma breve apresentação sobre você</small
          > */}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Grupo"
            name="grupo"
            value={grupo}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Grupo do qual faz parte</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Rede"
            name="rede"
            value={rede}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Rede da qual faz parte</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Site"
            name="site"
            value={site}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Um site para saber mais sobre você{' '}
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Local"
            name="local"
            value={local}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Estado, Cidade e Localidade</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Habilidades"
            name="habilidades"
            value={habilidades}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Favor separar com virgula (ex. comunicação, bioconstrução, plantio
            ...)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Uma descrição curta sobre você"
            name="biografia"
            value={biografia}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Nos conte sobre você</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => mostraLink(!mostrandoLinks)}
            type="button"
            className="btn btn-light"
          >
            Adicionar Links
          </button>
          <span>Opcional</span>
        </div>

        {/* //testa se tem o mostraLink */}
        {mostrandoLinks && (
          <Fragment>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" value="Editar perfil"/>
        <Link className="btn btn-light my-1" to='/painel'>
          Voltar
        </Link>
      </form>
    </Fragment>
  );
};

EditarPerfil.propTypes = {
  criaPerfil:PropTypes.func.isRequired,
  perfil_r: PropTypes.object.isRequired,
  pegaPerfilAtual:PropTypes.func.isRequired
};

const mapStateToProps = estado => ({
    perfil_r:  estado.perfil_r
});

export default connect(mapStateToProps, {criaPerfil, pegaPerfilAtual})(withRouter(EditarPerfil));
