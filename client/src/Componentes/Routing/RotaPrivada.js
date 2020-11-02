import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Router } from 'react-router-dom';
const RotaPrivada = ({
  component: Component,
  autentica: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" /> // se não tiver autenticado vai pro login
      ) : (
        <Component {...props} /> // else se tiver o componente vai carregar
      )
    }
  />
);

RotaPrivada.propTypes = {
  autentica: PropTypes.object.isRequired,
};

const mapStateToProps = (estado) => ({
  autentica: estado.autentica,
});

export default connect(mapStateToProps)(RotaPrivada);
