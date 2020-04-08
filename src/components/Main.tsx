import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthRoute from './auth/AuthRoute';
import Login from './auth/Login';
import PrivateRoute from './auth/PrivateRoute';
import Verify from './auth/Verify';
import Patients from './patients/Patients';
import Profile from './profile/Profile';
import QuarantineCenters from './quarantine-centers/QuarantineCenters';

const Main = () => {
  return (
    <section className="section">
      <div className="container">
        <Switch>
          <AuthRoute path="/login">
            <Login />
          </AuthRoute>
          <AuthRoute path="/verify">
            <Verify />
          </AuthRoute>
          <PrivateRoute path="/patients">
            <Patients />
          </PrivateRoute>
          <PrivateRoute path="/quarantine-centers">
            <QuarantineCenters />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <Route path="/">
            <Redirect to="/patients" />
          </Route>
        </Switch>
      </div>
    </section>
  );
};

export default Main;
