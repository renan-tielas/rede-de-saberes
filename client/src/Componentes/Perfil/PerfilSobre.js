import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const PerfilSobre = ({
    
        perfil:{
            biografia,habilidades,status,
            usuario:{nome}
        }
    
}) => {
    return (
        <div class="profile-about bg-light p-2">
            {
                biografia&&( 
                <Fragment>
                    <h2 class="text-primary">Biografia de  
                    {' '}

                    {nome/* {
                    status ==='Pessoa' && nome.trim().split(' ')[0] || nome
                    } */}
                    
                    </h2>

          <p>
           {biografia}
          </p>
          <div class="line"></div>
                </Fragment> )
            }
          
          <h2 class="text-primary">Habilidades</h2>
          <div class="skills">

              {habilidades.map((habilidade,indice)=>(
                  <div className="p-1" key={indice}>
                      <i className="fas fa-check"></i>
                      {habilidade}
                  </div>
              ))}
              
              
        </div>
        </div>

    )
}

PerfilSobre.propTypes = {
perfil:PropTypes.object.isRequired,
}

export default PerfilSobre
