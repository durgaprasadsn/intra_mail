import React from "react";
import M from "materialize-css";
import { NavLink } from "react-router-dom";

class Login extends React.Component {
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
    function check_login_state(){
      var sender_object = {
        xhr: new XMLHttpRequest(),
        send:function(){
          this.xhr.open("POST","http://localhost:8080/api/login",true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.withCredentials = true;
          this.xhr.send();
        },
        callback:function(){
          if (this.readyState == 4){
            if (this.status == 202){
              alert("You are already logged in");
              window.location.href = "/home";
            }
          }
        }
      }
      sender_object.send();
    }
    check_login_state();
  }
  render() {
    function attempt_login(){
      var sender_object = {
        xhr: new XMLHttpRequest(),
        send:function(){
          this.xhr.open("POST","http://localhost:8080/api/login",true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.withCredentials = true;
          let data = new FormData();
          data.append("email",document.getElementById("email").value);
          data.append("password",document.getElementById("password").value);
          console.log(document.getElementById("email").value);
          console.log(document.getElementById("password").value);
          console.log(data);
          this.xhr.send(data);
        },
        callback:function(){
          if (this.readyState == 4){
            if (this.status == 202){
              alert("Successful login");
              window.location.href = "/home";
              }
          }
        }
      }
      sender_object.send();
    }
    return (
      <>
        <main className="col s2">
            <div className="row">
            <div className="col s12 m3 offset-m3 card center">
                <h5>Login</h5>
                </div>
                <div className="col s12 m3 offset-m0 card center">
                <h5>
                    <NavLink to="/signup" exact>
                    Signup
                  </NavLink>
                  </h5>
                </div>
            <div className="col s12 m6 offset-m3 card center">
              <div className="input-field col s12">
                <input className="validate" type="text" name="username" id="email" required />
                <label for="email">Email</label>
              </div>

              <div className="input-field col s12">
                <input className="validate" type="password" name="password" id="password" required />
                <label for="password">Password</label>
              </div>
              <div>
              <button className="btn btn-small blue waves-effect" onClick={attempt_login}>
                Login
              </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Login;