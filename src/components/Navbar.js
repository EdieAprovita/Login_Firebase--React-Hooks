import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../firebase';

import { withRouter } from 'react-router-dom';

const Navbar = (props) => {
  const logout = () => {
    auth.signOut().then(() => {
      props.history.push('/login');
    });
  };
  return (
    <div className='navbar navbar-dark bg-dark'>
      <Link to='/' className='navbar-brand'>
        AUTH
      </Link>
      <div>
        <div className='d-flex'>
          <NavLink className='btn btn-dark mr-2' to='/' exact>
            Inicio
          </NavLink>
          {props.firebaseUser !== null ? (
            <NavLink className='btn btn-dark mr-2' to='/admin'>
              Admin
            </NavLink>
          ) : null}
          {props.firebaseUser !== null ? (
            <button className='btn btn-dark' onClick={() => logout()}>
              Logout
            </button>
          ) : (
            <NavLink className='btn btn-dark mr-2' to='/login'>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
