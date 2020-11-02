import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Moment from 'react-moment'; //para ldiar com tempo/data
import {deletaSaberes} from '../../actions/perfiL'


const Saberes = ({ saberes, deletaSaberes }) => {
  const saberess = saberes.map((sabe) => (
    <tr key={sabe._id}> 
    {/* //importante ser tr! */}
        <td>{sabe.titulos}</td>
      <td>{sabe.temas}</td>
      {/* <td>{sabe.status}</td> */}
      <td>{sabe.escolas}</td>
      <td>{sabe.aprofundamento}</td>
      {/* <td>
        <Moment format="YYYY/MM/DD">{sabe.desde}</Moment> -{' '}
        {sabe.até == null ? (
          ' Agora'
        ) : (
          <Moment format="YYYY/MM/DD">{sabe.até}</Moment>
        )}
      </td> */}
      <td>
        <button onClick={()=> deletaSaberes(sabe._id)} className="btn btn-danger">Deleta</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Sementes de Saberes</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Saber</th>
            <th className="hide-sm"> Tema </th>
            {/* <th className="hide-sm"> Contexto </th> */}
            <th className="hide-sm"> Escolas </th>
            <th className="hide-sm"> Aprofundamento </th>
          </tr>
        </thead>
  <tbody>{saberess}</tbody>
      </table>
    </Fragment>
  );
};

Saberes.propTypes = {
  saberes: PropTypes.array.isRequired,
  deletaSaberes: PropTypes.func.isRequired
};

export default connect(null,{deletaSaberes})(Saberes);
