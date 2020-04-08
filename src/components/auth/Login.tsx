import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import c from 'classnames';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import image from '../../advise.svg';
import { AuthContext } from '../../auth-state';
import './Login.css';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const valid = /^\d{10}$/.test(mobileNumber);
  const { sendOtp } = useContext(AuthContext);

  const onSubmit = () => {
    setLoading(true);
    sendOtp(mobileNumber).then(() => {
      setLoading(false);
      history.push(`/verify?mobileNumber=${mobileNumber}`, location.state);
    });
  };

  const onChangeMobileNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNumber(event.target.value);
  };

  return (
    <div className="Login">
      <div className="notification is-info is-light">
        As a healthcare professional you can login using your 10 digit mobile
        number. Note that you can <strong>not</strong> register for an account
        here. Contact <code>prateek.jain@embryyo.com</code> if you have
        questions or need access.
      </div>
      <div className="field">
        <img className="Login-image" src={image} alt="doctor" />
      </div>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input has-text-centered"
            type="email"
            placeholder="Mobile number"
            value={mobileNumber}
            onChange={onChangeMobileNumber}
            autoFocus={true}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon="phone-alt" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-text-centered">
          <button
            className={c('button is-primary has-text-weight-bold', {
              'is-loading': loading
            })}
            onClick={onSubmit}
            disabled={!valid || loading}
          >
            Continue
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
