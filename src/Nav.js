import React, {Fragment} from 'react';
import { Link } from "@reach/router";


const Nav = (props) => (
    <div>
      <nav className="custom-nav">
      {props.currentUser ?                 <a onClick={props.signOut}>Signout</a> : 
        <Fragment>
          <Link to="signup" className="nav-item">Sign Up</Link>
          <Link to="signin">Sign In</Link>
        </Fragment>
      }
      </nav>
    </div>
  )

export default Nav;