import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Alerta = ({alertas}) => alertas !== null && alertas.length > 0 && alertas.map(alerta =>(
    <div key={alerta.id} className={`alert alert-${alerta.tipoAlerta}`}>
        {alerta.msg}
    </div>
));//exibe todos os alertas, por 5s


Alerta.propTypes = {
    alertas:PropTypes.array.isRequired,
}

//cria props.alertas (nao sei como?)
const mapStateToProps = estado => ({
    alertas: estado.alerta
})

export default connect(mapStateToProps)(Alerta);
