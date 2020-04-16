import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import { NavLink } from "react-router-dom";
import M from "materialize-css";

class Homenav extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <header>
        <nav className="transparent">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">
              Intra mail System
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {/* <li>
                <a className="waves-effect waves-light btn green" href="#">
                  <NavLink to="/home" exact>
                    Home
                  </NavLink>
                </a>                
              </li> */}
              <li>
                <a className="waves-effect waves-light btn" href="#">
                  <NavLink to="/logout" exact>
                    Logout
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

export default Homenav;