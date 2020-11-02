import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {pegaSaberes} from '../../actions/sabeR'
import Roda from '../layout/Roda'
import SaberItem from './SaberItem'

const Saberes = ({pegaSaberes, saber_r:{saberes, loading}}) => {

    useEffect(() => {
        pegaSaberes();
    },[pegaSaberes])


    return loading? <Roda/> : (
        <Fragment>
            <h1 className="large text-primary">Saberes</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Bem vinde à comunidade!
            </p>
            {/*Formulario de Saber*/}
            <div className="posts">
                {saberes.map(saber=>(
                    <SaberItem key={saber._id} saber={saber}/>
                ))}
            </div>
        </Fragment>
    )
}

Saberes.propTypes = {
pegaSaberes:PropTypes.func.isRequired,
saber_r: PropTypes.object.isRequired
}

const mapStateToProps = estado => ({
    saber_r: estado.saber_r
})

export default connect(mapStateToProps, {pegaSaberes})(Saberes);
