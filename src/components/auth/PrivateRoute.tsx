import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { hasToken } from './util';

type Props = {
  path: string;
};

const PrivateRoute: FC<Props> = ({ children, path }) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        hasToken() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
