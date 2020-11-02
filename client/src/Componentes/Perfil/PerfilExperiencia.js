import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';



const PerfilExperiencia = ({
    experiencia:{
        status,titulo,local,atual,até,desde,descrição
    }
}) => {
    return (
        <div>
            <h3 className="text-dark">{status}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{desde}</Moment> - 
                {!até ? 'Presente' : 
                <Moment format='YYYY/MM/DD'>{até}</Moment>
                }
            </p>
            <p>
                <strong>{titulo}</strong>
            </p>
            <p>
            <strong>Descrição</strong>{' '}{descrição}
            </p>
        </div>
    )
}

PerfilExperiencia.propTypes = {
experiencia:PropTypes.array.isRequired,
}

export default PerfilExperiencia
