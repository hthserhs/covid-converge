import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import c from 'classnames';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../auth-state';
import './Login.css';

const Verify = () => {
  const query = useQuery();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const valid = /^\d{6}$/.test(otp);
  const mobileNumber = query.get('mobileNumber');
  const { signIn } = useContext(AuthContext);

  const onSubmitOTP = () => {
    if (!mobileNumber) {
      return;
    }
    setLoading(true);
    signIn(mobileNumber, otp)
      .then(() => {
        //
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onChangeOtp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };

  return (
    <div className="Login">
      <div className="notification is-info is-light">
        Enter the 6 digit OTP sent to your mobile number{' '}
        <strong>{mobileNumber}</strong>. Not the right number?{' '}
        <Link to="/login">Change</Link>.
      </div>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input has-text-centered"
            type="tel"
            placeholder="OTP"
            autoFocus={true}
            value={otp}
            onChange={onChangeOtp}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon="mobile" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-text-centered">
          <button
            className={c('button is-primary has-text-weight-bold', {
              'is-loading': loading
            })}
            onClick={onSubmitOTP}
            disabled={!valid || loading}
          >
            Submit
          </button>
        </p>
      </div>
    </div>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default Verify;
