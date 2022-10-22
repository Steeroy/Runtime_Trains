import { React, useRef } from 'react';

import '../App.css';

import { Container } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { CloseRounded, MenuRounded } from '@mui/icons-material';

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
    display: 'Account',
    path: '/account',
  },
];

function Navbar() {
  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  return (
    <header className=" shadow">
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
    </header>
  );
}

export default Navbar;
