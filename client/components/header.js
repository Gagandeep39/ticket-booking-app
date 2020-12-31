/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-23 02:02:01
 * @modify date 2020-10-23 02:02:01
 * @desc Header Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig) // Returns true values
    .map(({ label, href }) => (
      <li key={href}>
        <Link href={href} key={href} className="nav-item">
          <a className="nav-link"> {label} </a>
        </Link>{' '}
      </li>
    ));
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand"> Ticket X </a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Header;
