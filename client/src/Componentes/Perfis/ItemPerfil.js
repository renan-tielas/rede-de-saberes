import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ItemPerfil = ({
    perfil: {
        usuario:{_id,nome,avatar},
        status,
        grupo,
        rede,
        local,
        habilidades,
        // saberes,

    }
    }) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>{nome}</h2>
    <p>
    {status} {grupo && <span> parte de {grupo}</span>}
    {rede && <span> e da {rede}</span>}
    </p>
    <p className="my-1">{local && <span> {local}</span>}</p>
    <Link to={`/perfis/usuario/${_id}`} className="btn btn-primary">
        Ver perfil
    </Link>
            </div>
            <ul>
                {
                habilidades.slice(0,4).map((habilidade,indice)=>
                (<li key={indice} className="text-primary">
                    <i className="fas fa-check"></i>{habilidade}
                </li>))
                
                }
            </ul>
            {/* <ul>
                {ACRESCENTAR SABERES
                    saberes.titulos
                }
            </ul> */}
        </div>
    )
}

ItemPerfil.propTypes = {
    perfil:PropTypes.object.isRequired,
}

export default ItemPerfil
