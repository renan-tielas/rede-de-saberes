import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';



const PerfilSaberes = ({
    saberes:{
        status,titulos,escolas,temas,local,atual,até,desde,descrição
    }
}) => {
    return (
        <div>
            <h3 className="text-dark">{escolas}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{desde}</Moment> - 
                {!até ? 'Presente' : 
                <Moment format='YYYY/MM/DD'>{até}</Moment>
                }
            </p>
            <p>
                <strong>{titulos}</strong>
            </p>
            <p>
                <strong>Temas</strong>{temas}
            </p>
            <p>
            <strong>Descrição</strong>{' '}{descrição}
            </p>
        </div>
    )
}

PerfilSaberes.propTypes = {
saberes:PropTypes.array.isRequired,
}

export default PerfilSaberes
