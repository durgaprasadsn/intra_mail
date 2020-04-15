import React from "react";
import M from "materialize-css";
import { NavLink } from "react-router-dom";

class Login extends React.Component {
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
    /*function check_login_state(){
      var sender_object = {
        xhr: new XMLHttpRequest(),
        send:function(){
          this.xhr.open("POST","http://localhost:8080/users/login",true);
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
    check_login_state();*/
  }
  render() {
    function attempt_login(){
      var sender_object = {
        xhr: new XMLHttpRequest(),
        send:function(){
          const data = {
            user: document.getElementById("email").value,
            password: document.getElementById("password").value
          };
          this.xhr.open("POST","http://localhost:8080/users/login",true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          console.log("Sending login data");
          console.log(data);
          this.xhr.send(JSON.stringify(data));
        },
        callback:function(){
          if (this.readyState == 4){
            if (this.status == 200){
              alert("Successful login");
              let token = "Bearer " + JSON.parse(this.responseText).token;
              localStorage.setItem('token',token);
              var check = localStorage.getItem('token');
              if (check) {
                window.location.href = "/home";
              }
              else {
                alert("Error in Logging");
                window.location.href = "/login"
              }
            }
          }
        }
      }
      sender_object.send();
    }

    function checkUser(){
      console.log("Checking user");
      var sender_object = {
        xhr: new XMLHttpRequest(),
        send:function(){
          this.xhr.open("GET","http://localhost:8080/users/check?user="+document.getElementById("email").value,true);
          this.xhr.onreadystatechange = this.callback;        
          this.xhr.send();
        },
        callback:function(){
          if (this.readyState === 4){
              const button = document.getElementById("login");
              if(this.status == 404){
                console.log("404");
                alert("User does not exist");
                button.disabled = "true";
              }
              if(this.status == 200){
                console.log("200");
                button.removeAttribute("disabled");                
              }
              if(this.status == 500){
                console.log("500");
                alert("server error");
              }
          }
        }
      }
      sender_object.send()
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
                <input className="validate" type="text" name="email" id="email" onBlur={checkUser} required />
                <label for="email">Username</label>
              </div>

              <div className="input-field col s12">
                <input className="validate" type="password" name="password" id="password" required />
                <label for="password">Password</label>
              </div>
              <div>
              <button id="login" className="btn btn-small blue waves-effect" onClick={attempt_login}>
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