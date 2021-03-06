import React, {Fragment} from 'react';
import { Link } from "@reach/router";
import FaAngellist from 'react-icons/lib/fa/angellist';



const Nav = (props) => (
    <div>
        <h1 className="title" >
          <FaAngellist />
          {'Git R Dun'}
        </h1>
      <nav className="custom-nav mb-5">
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