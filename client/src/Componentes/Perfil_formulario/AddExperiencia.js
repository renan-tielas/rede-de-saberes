import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'; //para poder redirecionar dentro de ações
import PropTypes from 'prop-types'; // para usar estado
import { connect } from 'react-redux'; // para usar o redux
import { addExperiencia} from '../../actions/perfiL';

const AddExperiencia = ({addExperiencia,history}) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    titulo: '',
    status: '',
    tema:'',
    grupo: '',
    rede: '',
    local: '',
    desde: '',
    até: '',
    atual: false,
    descrição: '',
  });

  const [atéDesativado, setAtéDesativado] = useState(false);

  const {
    titulo,
    status,
    tema,
    grupo,
    rede,
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
      <h1 className="large text-primary">Adicione experiências</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Adicione experiencias atuais e passadas.
      </p>
      <small>* = campo necessário</small>
      <form className="form" onSubmit={e=>{
          e.preventDefault();
          addExperiencia(dadosFormulario,history);
      }}>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Título da Experiência"
            name="titulo"
            value={titulo}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Tema da Experiência"
            name="tema"
            value={tema}
            onChange={(e) => onChange(e)}
            required
          />
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

        <div className="form-group">
          <input
            type="text"
            placeholder="Grupo"
            name="grupo"
            value={grupo}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Rede"
            name="rede"
            value={rede}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Local"
            name="local"
            value={local}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Começou em</h4>
          <input
            type="date"
            name="desde"
            value={desde}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
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
            Continuo fazendo
          </p>
        </div>
        <div className="form-group">
          <h4>Até</h4>
          <input
            type="date"
            name="até"
            value={até}
            onChange={(e) => onChange(e)}
            disabled={atéDesativado ? 'disabled' : ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="descrição"
            value={descrição}
            cols="30"
            rows="5"
            placeholder="Descrição da experiência"
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Adicionar"/>
        <Link className="btn btn-light my-1" to="/painel">
          Voltar
        </Link>
      </form>
    </Fragment>
  );
};

AddExperiencia.propTypes = {
  // para dizer qual tipo dos estados sendo passados
  addExperiencia: PropTypes.func.isRequired,
};

export default connect(null, { addExperiencia })(withRouter(AddExperiencia));
