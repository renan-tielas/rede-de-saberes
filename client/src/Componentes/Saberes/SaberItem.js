import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {addCurtida, deletaCurtida} from '../../actions/sabeR'
import {deletaSaber} from '../../actions/sabeR'
const SaberItem = ({
  autentica,
  addCurtida, deletaCurtida,
  saber: { _id, texto, nome, avatar, usuario, curtidas, comentarios, data },
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="" />
          <h4>{nome}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{texto}</p>
        <p className="post-date">
          Publicado em <Moment format="DD/MM/YYYY">{data}</Moment>
        </p>
        <button onClick={e => addCurtida(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          <span>{curtidas.length>0 && (<span>{curtidas.length}</span>) }
           </span>
        </button>
        <button onClick={e => deletaCurtida(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-primary">
          Discussão {comentarios.length>0 && (<span className="comment-count">{comentarios.length}</span>) }
           
        </Link>
        {!autentica.loading && usuario === autentica.usuario._id && (
          <button onClick={e => deletaSaber(_id)} type="button" className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
        {/* //compara o usuario com o dono do post e mostra o botao de deletar */}
      </div>
    </div>
  );
};

SaberItem.propTypes = {
  saber: PropTypes.object.isRequired,
  autentica: PropTypes.object.isRequired,
  addCurtida:PropTypes.func.isRequired,
  deletaCurtida:PropTypes.func.isRequired,
  deletaSaber:PropTypes.func.isRequired
};

const mapStateToProps = (estado) => ({
  autentica: estado.autentica,
  perfil_r: estado.perfil
//   addCurtida:
//   deletaCurtida:
});

export default connect(mapStateToProps, {addCurtida, deletaCurtida, deletaSaber})(SaberItem);
