import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navegacao from './Componentes/layout/Navegacao';
import Cheganca from './Componentes/layout/Cheganca';
import Cadastro from './Componentes/Autenticacao/Cadastro';
import Login from './Componentes/Autenticacao/Login';

import Alerta from './Componentes/layout/Alerta';

import Painel from './Componentes/Painel/Painel';
import CriarPerfil from './Componentes/Perfil_formulario/CriarPerfil';
import EditarPerfil from './Componentes/Perfil_formulario/EditarPerfil';
import AddExperiencia from './Componentes/Perfil_formulario/AddExperiencia';
import AddSaberes from './Componentes/Perfil_formulario/AddSaberes';
import RotaPrivada from './Componentes/Routing/RotaPrivada';

import Perfis from './Componentes/Perfis/Perfis';
import Perfil from './Componentes/Perfil/Perfil';
import Saberes from './Componentes/Saberes/Saberes';
import Saber from './Componentes/Saber/Saber';



//Redux
import {Provider} from 'react-redux'; //conecta react e redux botando tudo dentro do provider
import Armazenagem from './Armazenagem';
import {carregaUsuario} from './actions/autenticA';
import setAutenticaToken from './utils/setAutenticaToken'

if(localStorage.token){  //vê se usuario tem token
  setAutenticaToken(localStorage.token)
}


const App = () => {
  
  useEffect(()=>{
    Armazenagem.dispatch(carregaUsuario());
  },[]); //só roda uma vez, quando é carregado, por causa do []
// se fosse pra rodar mais de uma vez, precisa colocar a condição dentro do []


  
  return(
  <Provider store ={Armazenagem}>
  <Router>
    <Fragment>
      <Navegacao />
      <Route exact path='/' component={Cheganca} />
      <section className="container">
        <Alerta/>
        <Switch>
          <Route exact path="/cadastro" component={Cadastro} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/perfis" component={Perfis} />
          <Route exact path="/perfis/usuario/:id" component={Perfil} />
          <RotaPrivada exact path="/painel" component={Painel} />
          <RotaPrivada exact path="/criar-perfil" component={CriarPerfil} />
          <RotaPrivada exact path="/editar-perfil" component={EditarPerfil} />
          <RotaPrivada exact path="/adicionar-experiencia" component={AddExperiencia} />
          <RotaPrivada exact path="/adicionar-saberes" component={AddSaberes} />
          <RotaPrivada exact path="/posts" component={Saberes} />
          <RotaPrivada exact path="/posts/:id" component={Saber} />
        </Switch>
      </section>
    </Fragment>
  </Router>
  </Provider>
);

  }

export default App;
