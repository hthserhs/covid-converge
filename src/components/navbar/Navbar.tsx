import c from 'classnames';
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../auth-state';
import appLogo from '../../logo.svg';
import './Navbar.css';

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const onToggleMenu = () => {
    setMenu(!menu);
  };

  const { token, signOut, user } = useContext(AuthContext);

  return (
    <nav
      className="navbar is-light is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={appLogo} alt="COVID converge" width="32" height="32" />
          <span className="Navbar-app_name">
            COVID
            <span className="has-text-weight-bold is-italic">Converge</span>
          </span>
        </Link>
        {token && (
          /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
          <a
            role="button"
            className={c('navbar-burger', { 'is-active': menu })}
            aria-label="menu"
            aria-expanded="false"
            onClick={onToggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        )}
      </div>

      {token && (
        <div className={c('navbar-menu', { 'is-active': menu })}>
          <div className="navbar-start">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              to="/patients"
              onClick={() => setMenu(false)}
            >
              Patients
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              to="/quarantine-centers"
              onClick={() => setMenu(false)}
            >
              Centers
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="navbar-link">{user?.name}</a>
              <div className="navbar-dropdown">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="navbar-item" onClick={signOut}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
