import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment'; //para ldiar com tempo/data
import {deletaExperiencia} from '../../actions/perfiL'



const Experiencias = ({ experiencia, deletaExperiencia }) => {
  const experiencias = experiencia.map((exp) => (
    <tr key={exp._id}> 
    {/* //importante ser tr! */}
        <td>{exp.titulo}</td>
      <td>{exp.tema}</td>
      <td>{exp.status}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.desde}</Moment> -{' '}
        {exp.até == null ? (
          ' Agora'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.até}</Moment>
        )}
      </td>
      <td>
        <button onClick={() => deletaExperiencia(exp._id)} className="btn btn-danger">Deletar</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experiencias</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Experiência</th>
            <th className="hide-sm"> Tema </th>
            <th className="hide-sm"> Contexto </th>
            <th className="hide-sm"> Anos </th>
          </tr>
        </thead>
  <tbody>{experiencias}</tbody>
      </table>
    </Fragment>
  );
};

Experiencias.propTypes = {
  experiencia: PropTypes.array.isRequired,
  deletaExperiencia: PropTypes.func.isRequired
};

export default connect(null,{deletaExperiencia})(Experiencias);
