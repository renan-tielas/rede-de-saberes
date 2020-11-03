import React, {useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from'react-redux'
import Roda from '../layout/Roda'
import SaberItem from '../Saberes/SaberItem'
import ComentarioFormulario from '../Saber/ComentarioFormulario'
import {pegaSaber, pegaSaberes} from '../../actions/sabeR'



const Saber = ({pegaSaber, saber:{saber, loading}, match}) => {

useEffect(() => {
    pegaSaber(match.params.id);
}, [pegaSaber])

    return (
       loading || saber === null ? <Roda/>:<Fragment>
           <Link to ='/posts' className='btn'>
               Volta para saberes
           </Link>
        <SaberItem saber ={saber} mostraAçoes={false}/>
        {/* <ComentarioFormulario idPost={saber._id}/> */}
       </Fragment>
    )
}

Saber.propTypes = {
pegaSaber: PropTypes.func.isRequired,
saber: PropTypes.object.isRequired
}

const mapStateToProps = estado => ({
    saber: estado.saber_r
})

export default connect(mapStateToProps,{pegaSaber})(Saber)
