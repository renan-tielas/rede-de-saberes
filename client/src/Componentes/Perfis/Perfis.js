import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Roda from '../layout/Roda';
import {pegaPerfis} from '../../actions/perfiL';
import ItemPerfil from '../Perfis/ItemPerfil';


const Perfis = ({pegaPerfis, perfil:{perfis, loading}}) => {
    useEffect(() =>{// pra acionar assim que abre o componente
        pegaPerfis(); //coloca os perfis no estado
    }, [pegaPerfis]);
    return <Fragment> 
        {loading ? <Roda/> : 
        <Fragment>
        <h1 className="large text-primary">Perfis</h1>
        <p className="lead">
        <i className="fab fa-connectdevelop"></i>Navegue e conecte-se com pessoas, grupos e redes
        </p>
        <div className="profiles">
        {perfis.length > 0? 
        (
            perfis.map(perfil => (<ItemPerfil key={perfil._id} perfil={perfil}/>
                                    )
                        )
        ):<h4> Perfis não encontrados</h4>    }
        </div>
        </Fragment>       }
            
        </Fragment>;
        };

Perfis.propTypes = {
    pegaPerfis:PropTypes.func.isRequired,
    perfil:PropTypes.object.isRequired
}
//pega o estado perfil, do reducer, e atualiza ele toda hora para esse componente!
const mapStateToProps = estado => ({
    perfil: estado.perfil_r
})

export default connect(mapStateToProps, {pegaPerfis})(Perfis)
