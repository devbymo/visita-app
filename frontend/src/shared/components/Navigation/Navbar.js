import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

  .nav-icon {
    display: none;
    font-size: 4rem;
    cursor: pointer;
  }

  @media only screen and (max-width: 500px) {
    position: relative;

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
      <Link to="/" className="nav-logo">
        Visita
      </Link>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? 'nav-links active' : 'nav-links'}>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link" onClick={closeMenu}>
            Signup/Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/shop" className="nav-link" onClick={closeMenu}>
            New
          </Link>
        </li>
      </ul>
    </StyledNavbar>
  );
};

export default Navbar;
