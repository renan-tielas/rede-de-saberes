import React from 'react';
import { Link} from 'react-router-dom';

export const PainelAcoes = () => {
    return (
        <div className="dash-buttons">
        <Link to='/editar-perfil' className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i> Editar Perfil</Link>
        <Link to="/adicionar-experiencia" className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"></i> Adicionar Experiência</Link>
        <Link to="/adicionar-saberes" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Adicionar Saber</Link>
      </div>
    )
}
