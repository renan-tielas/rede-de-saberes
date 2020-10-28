import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navegacao from './Componentes/layout/Navegacao';
import Cheganca from './Componentes/layout/Cheganca';
import Cadastro from './Componentes/Autenticacao/Cadastro';
import Login from './Componentes/Autenticacao/Login';


//Redux
import {Provider} from 'react-redux'; //conecta react e redux botando tudo dentro do provider
import Armazenagem from './Armazenagem'


const App = () => (
  <Provider store ={Armazenagem}>
  <Router>
    <Fragment>
      <Navegacao />
      <Route exact path='/' component={Cheganca} />
      <section className="container">
        <Switch>
          <Route exact path="/cadastro" component={Cadastro} />
  <Login/>
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
  </Provider>
);

export default App;
