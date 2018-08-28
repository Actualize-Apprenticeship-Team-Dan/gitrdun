import React from 'react';
import { Router, Link } from "@reach/router";

const Nav = () => (
    <div>
      <nav className="custom-nav">
        <Link to="signup" className="nav-item">Sign Up</Link>
        <Link to="/">Home</Link>
        <Link to="signin">Log In</Link>
      </nav>
    </div>
  )

export default Nav;