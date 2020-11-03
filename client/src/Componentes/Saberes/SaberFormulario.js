import React , {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addSaber} from '../../actions/sabeR'

const SaberFormulario = ({addSaber}) => {

    const [texto, setTexto] = useState(' ')
    //formulario de um campo só


    return (
        <div>
         <div class="post-form">
        <div class="bg-primary p">
          <h3>Criação de Saber</h3>
        </div>
        <form class="form my-1" 
            onSubmit={ e => {
            e.preventDefault();
            addSaber({texto}); // envia o conteudo
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

SaberFormulario.propTypes = {
    addSaber: PropTypes.func.isRequired,

}

export default connect(null,{addSaber}) (SaberFormulario)
