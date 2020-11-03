import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComentario} from '../../actions/sabeR'

const ComentarioFormulario = ({idPost, addComentario})  => {

const [texto, setTexto] = useState('');

    return (
        <div>
         <div class="post-form">
        <div class="bg-primary p">
          <h3>Deixe um comentário</h3>
        </div>
        <form class="form my-1" 
            onSubmit={ e => {
            e.preventDefault();
            addComentario(idPost,{texto}); // envia o conteudo
            setTexto(''); // dá um clear no formulário pra proxima 
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Descreva o saber"
            required
            onChange={e => setTexto(e.target.value)}
          ></textarea>
          <input type="submit" class="btn btn-primary my-1" value="Criar" />
        </form>
      </div>
      </div>
    )
}

ComentarioFormulario.propTypes = {
    addComentario:PropTypes.func.isRequired,
}

export default connect(null, {addComentario})(ComentarioFormulario);
