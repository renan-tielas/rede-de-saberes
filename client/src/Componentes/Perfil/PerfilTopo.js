import React from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'

const PerfilTopo = ({
    
    perfil: {
        status, grupo, rede, local,site,links,
        usuario:{
            nome,avatar
        }
    }
}) => {
    return (
        <div className="profile-top bg-primary p-2">
        <img
          className="round-img my-1"
          src={avatar}
          alt=""
        />
        <h1 className="large">{nome}</h1>
    <p className="lead"> { grupo && <span>participa de {grupo}</span> } 
    { rede && <span> que integra {rede}</span>}
    </p>
        <p>{local}</p>
        <div className="icons my-1">

        {site && (
            <a href={`https:/${site}`} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>     )}

          {links && links.facebook && (
              <a href={`https:/${links.facebook}`} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
           )}
           {links && links.instagram && (
               <a href={`https:/${links.instagram}`} target="_blank" rel="noopener noreferrer">
               <i className="fab fa-instagram fa-2x"></i>
             </a>
           )}
           {links && links.youtube && (
               <a href={`https:/${links.youtube}`} target="_blank" rel="noopener noreferrer">
               <i className="fab fa-youtube fa-2x"></i>
             </a>
           )}
           
        </div>
      </div>

    )
}

PerfilTopo.propTypes = {
perfil:PropTypes.object.isRequired,
}

export default PerfilTopo
