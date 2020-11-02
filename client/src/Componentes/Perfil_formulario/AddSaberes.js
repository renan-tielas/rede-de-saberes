import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'; //para poder redirecionar dentro de ações
import PropTypes from 'prop-types'; // para usar estado
import { connect } from 'react-redux'; // para usar o redux
import { addSaberes } from '../../actions/perfiL';

const AddSaberes = ({addSaberes,history}) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    titulos: '',
    aprofundamento: [''],
    escolas: [''],
    temas: [''],
    status:'',
    local: '',
    desde: '',
    até: '',
    atual: false,
    descrição: '',
  });

  const [atéDesativado, setAtéDesativado] = useState(false);

  const {
    titulos,
    aprofundamento,
    escolas,
    temas,
    status,
    local,
    desde,
    até,
    atual,
    descrição,
  } = dadosFormulario;

  const onChange = (e) =>
    setDadosFormulario({ ...dadosFormulario, [e.target.name]: e.target.value }); //pegar o value e coloca no name (key) do Item do Form a seguir

  return (
    <Fragment>
      <h1 class="large text-primary">Adicione Saberes</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Adicione saberes que você já vivenciou e praticou
      </p>
      <small>* = campo necessário</small>
      <form class="form" onSubmit={e=>{
          e.preventDefault();
          addSaberes(dadosFormulario,history)
      }}>

        <div class="form-group">
          <input
            type="text"
            placeholder="* Títulos dos Saberes"
            name="titulos"
            value={titulos}
            onChange={(e) => onChange(e)}
            required
          />
          {/* //falta adicionar separador por virgula */}
        </div>

        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0"> Contexto</option>
            <option value="Pessoa">Pessoal</option>
            <option value="Grupo">Grupo</option>
            <option value="Rede">Rede</option>
            <option value="Outro">Outro</option>
          </select>
          <small className="form-text">
    Essa experiência é pessoal, em contexto de grupo, ou de rede?
    </small>
        </div>

        <div class="form-group">
          <input
            type="text"
            placeholder="* Aprofundamentos"
            name="aprofundamento"
            value={aprofundamento}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        
        <div class="form-group">
          <input
            type="text"
            placeholder="* Escolas"
            name="escolas"
            value={escolas}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Temas"
            name="temas"
            value={temas}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Local"
            name="local"
            value={local}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <h4>Começou em</h4>
          <input
            type="date"
            name="desde"
            value={desde}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="atual"
              checked={atual}
              value={atual}
              onChange={(e) => {
                setDadosFormulario({ ...dadosFormulario, atual: !atual });
                setAtéDesativado(!atéDesativado);
              }}
            />{' '}
            Continuo praticando
          </p>
        </div>
        <div class="form-group">
          <h4>Até</h4>
          <input
            type="date"
            name="até"
            value={até}
            onChange={(e) => onChange(e)}
            disabled={atéDesativado ? 'disabled' : ''}
          />
        </div>
        <div class="form-group">
          <textarea
            name="descrição"
            value={descrição}
            cols="30"
            rows="5"
            placeholder="Descrição do Saber"
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" value="Adicionar"/>
        <Link class="btn btn-light my-1" to="/painel">
          Voltar
        </Link>
      </form>
    </Fragment>
  );
};

AddSaberes.propTypes = {
  // para dizer qual tipo dos estados sendo passados
  addSaberes: PropTypes.func.isRequired,
};

export default connect(null, { addSaberes })(withRouter(AddSaberes));
