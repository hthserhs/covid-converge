import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { hasToken } from './util';

type Props = {
  path: string;
};

const AuthRoute: FC<Props> = ({ children, path }) => {
  return (
    <Route
      path={path}
      render={() =>
        hasToken() ? (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default AuthRoute;
