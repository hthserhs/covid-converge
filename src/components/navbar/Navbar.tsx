import c from 'classnames';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import appLogo from '../../logo.svg';
import './Navbar.css';

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const onToggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav
      className="navbar is-warning is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={appLogo} alt="COVID converge" width="32" height="32" />
          <span className="Navbar-app_name">
            COVID
            <span className="has-text-weight-bold">Converge</span>
          </span>
        </Link>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
      </div>

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
            to="/affiliations"
            onClick={() => setMenu(false)}
          >
            Affiliations
          </NavLink>
          <NavLink
            activeClassName="is-active"
            className="navbar-item"
            to="/profile"
            onClick={() => setMenu(false)}
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
