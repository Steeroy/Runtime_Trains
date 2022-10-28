import { React, useContext, useRef } from 'react';

import '../App.css';

import { Container } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { CloseRounded, MenuRounded } from '@mui/icons-material';
import { Store } from '../Store';
import { NavDropdown } from 'react-bootstrap';

const nav__links = [
  {
    display: 'Home',
    path: '/home',
  },
  {
    display: 'About',
    path: '/about',
  },
  {
    display: 'Tickets',
    path: '/tickets',
  },
  {
    display: 'Orders',
    path: '/orderhistory',
  },
];

function Navbar(props) {
  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const userInfo = props.item;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER__SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('stationChosen');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <header className=" shadow">
      {userInfo ? (
        <Container className="header">
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <Link to="/home">
              <div className="logo">
                <h2>Runtime Trains</h2>
              </div>
            </Link>

            {/* === menu === */}

            <div className="navigation" ref={menuRef}>
              <div className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <NavLink
                    onClick={toggleMenu}
                    to={item.path}
                    key={index}
                    className={(navClass) =>
                      navClass.isActive ? 'menu__active' : ''
                    }
                  >
                    {item.display}
                    <div className="dash"></div>
                  </NavLink>
                ))}

                <CloseRounded className="menu__close" onClick={toggleMenu} />
              </div>
            </div>

            {/* === sign in section === */}
            <div className="nav__right d-flex align-items-center gap-3">
              <NavDropdown
                title={userInfo.name}
                id="basic-nav-dropdown"
                className="button__primary signout"
              >
                <Link
                  className="signout dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>

              {/* === Hamburger === */}
              <div className="menu__burger" onClick={toggleMenu}>
                <MenuRounded />
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <Container className="header">
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <Link to="/home">
              <div className="logo">
                <h2>Runtime Trains</h2>
              </div>
            </Link>

            {/* === menu === */}

            <div className="navigation" ref={menuRef}>
              <div className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <NavLink
                    onClick={toggleMenu}
                    to={item.path}
                    key={index}
                    className={(navClass) =>
                      navClass.isActive ? 'menu__active' : ''
                    }
                  >
                    {item.display}
                    <div className="dash"></div>
                  </NavLink>
                ))}

                <CloseRounded className="menu__close" onClick={toggleMenu} />
              </div>
            </div>

            {/* === sign in section === */}
            <div className="nav__right d-flex align-items-center gap-3">
              <Link to="/signin">
                <div className="signin__button button__primary">Log In</div>
              </Link>

              <Link to="/signup">
                <div className="signup__button button__secondary">Sign Up</div>
              </Link>

              {/* === Hamburger === */}
              <div className="menu__burger" onClick={toggleMenu}>
                <MenuRounded />
              </div>
            </div>
          </div>
        </Container>
      )}
    </header>
  );
}

export default Navbar;
