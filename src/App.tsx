import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendOtp, signIn } from './api/auth';
import { getUser } from './api/health-workers';
import {
  Auth,
  AuthContext,
  initialState,
  reducer,
  updateToken,
  updateUser
} from './auth-state';
import {
  deleteId,
  deleteToken,
  getId,
  getToken,
  setId,
  setToken
} from './components/auth/util';
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
  const { token, user } = state;

  const auth: Auth = useMemo(
    () => ({
      token,
      user,
      sendOtp: async (mobileNumber: string) => {
        await sendOtp(mobileNumber);
      },
      signIn: async (mobileNumber: string, otp: string) => {
        const { authToken, healthWorkerDTO } = await signIn(mobileNumber, otp);
        setId(String(healthWorkerDTO.id));
        setToken(authToken);
        dispatch(updateToken(authToken));
        dispatch(updateUser(healthWorkerDTO));
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      },
      signOut: async () => {
        deleteToken();
        deleteId();
        dispatch(updateToken(null));
        dispatch(updateUser(null));
      }
    }),
    [user, token, history, location.state]
  );

  useEffect(() => {
    const checkToken = async () => {
      const authToken = getToken();
      const id = getId();
      if (authToken && id) {
        const healthWorkerDTO = await getUser(authToken, id);
        dispatch(updateToken(authToken));
        dispatch(updateUser(healthWorkerDTO));
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <Navbar />
      {loading ? <>Loading...</> : <Main />}
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
