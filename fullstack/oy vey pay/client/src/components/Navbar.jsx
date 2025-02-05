import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import { logOut } from "../api/auth";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="/images/logo,webp" alt="logo" width={30} height={50} />
      </Link>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/expenses"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setIsOpen(false)}
        >
          Expenses
        </NavLink>
        <NavLink
          to="#"
          className={() => {}}
          onClick={(e) => {
            e.preventDefault();
            logOut();
          }}
        >
          Logout
        </NavLink>
      </div>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};