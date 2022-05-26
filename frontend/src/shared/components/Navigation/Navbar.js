import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Overlay from '../UI/Overlay';

const StyledNavbar = styled.nav`
  height: 80px;
  width: 100%;
  background: #334155;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  font-size: 2.4rem;
  position: fixed;
  z-index: 10000;

  .nav-logo {
    font-size: 4rem;
    font-weight: 500;
    text-decoration: none;
    color: white;
  }

  .nav-item:not(:last-child) {
    padding-right: 4rem;
  }

  .nav-links {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 20px;
    list-style: none;
  }

  .nav-link {
    text-decoration: none;
    color: white;
    transition: 0.2s all;
  }

  .nav-link:hover {
    color: salmon;
  }

  .nav-link-active {
    color: salmon;
  }

  .nav-icon {
    display: none;
    font-size: 4rem;
    cursor: pointer;
  }

  @media only screen and (max-width: 950px) {
    position: fixed;

    .nav-links {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      width: 100%;
      top: 80px;
      left: -100%;
      transition: 0.5s all;
    }

    .nav-links.active {
      background: #334155;
      left: 0;
    }

    .nav-links.active .nav-item {
      text-align: center;
      padding: 0;
      width: 80%;
      padding-bottom: 2rem;
    }

    /* .nav-links.active .nav-item:last-child {
      padding-bottom: 2rem;
    } */

    .nav-links.active .nav-item:not(:last-child) {
      border-bottom: 1px solid #777;
    }

    .nav-icon {
      display: flex;
    }
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <StyledNavbar className="navbar">
      <Overlay show={open} closeMenu={closeMenu} />
      <NavLink to="/" className="nav-logo">
        Visita
      </NavLink>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? 'nav-links active' : 'nav-links'}>
        <li className="nav-item">
          <NavLink
            to="/"
            className="nav-link"
            // activeClassName={'nav-link-active'}
            onClick={closeMenu}
          >
            All Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/user-id/places"
            className="nav-link"
            activeClassName={'nav-link-active'}
            onClick={closeMenu}
          >
            My Places
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/places/new"
            className="nav-link"
            activeClassName={'nav-link-active'}
            onClick={closeMenu}
          >
            Add Place
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/auth"
            className="nav-link"
            activeClassName={'nav-link-active'}
            onClick={closeMenu}
          >
            Signup/Login
          </NavLink>
        </li>
      </ul>
    </StyledNavbar>
  );
};

export default Navbar;
