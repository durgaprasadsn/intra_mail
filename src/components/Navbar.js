import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import { NavLink } from "react-router-dom";
import M from "materialize-css";

class Navbar extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <header>
        <nav>
          <div className="nav-wrapper blue">
            <a className="brand-logo">
              Intra mail System
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a className="waves-effect waves-light btn green" href="#">
                  <NavLink to="/about" exact>
                    Aboout
                  </NavLink>
                </a>

                <a className="waves-effect waves-light btn green" href="#">
                  <NavLink to="/login" exact>
                    Login
                  </NavLink>
                </a>

                
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;