import React from 'react'
import {Link} from 'react-router-dom'
const Navegacao = () => {
    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to='/'><i className="fas fa-code"></i> Rede de Saberes</Link>
        </h1>
        <ul>
          <li><a href="profiles.html">Pessoas</a></li>
          <li><a href="profiles.html">Grupos</a></li>
          <li><a href="profiles.html">Redes</a></li>         
          <li><Link to='/cadastro'>Cadastro</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </nav>
    )
}

export default Navegacao
