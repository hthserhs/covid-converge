import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Affiliations from './affiliations/Affiliations';
import Patients from './patients/Patients';
import Profile from './profile/Profile';

const Content = () => {
  return (
    <section className="section">
      <div className="container">
        <Switch>
          <Route path="/patients">
            <Patients />
          </Route>
          <Route path="/affiliations">
            <Affiliations />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Redirect to="/patients" />
          </Route>
        </Switch>
      </div>
    </section>
  );
};

export default Content;
