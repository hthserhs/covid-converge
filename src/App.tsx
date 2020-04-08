import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Auth,
  AuthContext,
  initialState,
  reducer,
  updateToken
} from './auth-state';
import { deleteToken, getToken, setToken } from './components/auth/util';
import Main from './components/Main';
import Navbar from './components/navbar/Navbar';
import './icons';

function App() {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation<{
    from: {
      pathname: string;
    };
  }>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token } = state;

  const auth: Auth = useMemo(
    () => ({
      token,
      sendOtp: async (mobileNumber: string) => {
        console.log(mobileNumber);
        await new Promise((r) => setTimeout(r, 3000));
      },
      signIn: async (mobileNumber: string, otp: string) => {
        console.log(mobileNumber, otp);
        await new Promise((r) => setTimeout(r, 3000));
        setToken('token');
        dispatch(updateToken('token'));
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      },
      signOut: async () => {
        deleteToken();
        dispatch(updateToken(null));
      }
    }),
    [token, history, location.state]
  );

  useEffect(() => {
    const checkToken = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      const authToken = getToken();
      if (authToken) {
        dispatch(updateToken(authToken));
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <Navbar />
      {loading ? <>Loading...</> : <Main />}
    </AuthContext.Provider>
  );
}

export default App;
