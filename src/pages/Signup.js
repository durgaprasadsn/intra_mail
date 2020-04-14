import React from "react";
import "materialize-css";
import M from "materialize-css";
import { DatePicker } from "react-materialize";
import { NavLink } from "react-router-dom";

class Signup extends React.Component {
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }
  render() {
    function attempt_signup(){
      var sender_object = {
        xhr: new XMLHttpRequest(),
        send:function(){
          this.xhr.open("POST","http://localhost:8080/api/signup",true);
          this.xhr.onreadystatechange = this.callback;
          let data = new FormData();
          data.append("firstname", document.getElementById("firstname").value);
          data.append("lastname", document.getElementById("lastname").value);
          data.append("email",document.getElementById("email").value);
          data.append("password",document.getElementById("password").value);
          data.append("dob", document.getElementById("dob").value);
          this.xhr.send(data);
        },
        callback:function(){
          if (this.readyState == 4){
            if (this.status == 200){
              alert("Successful signup")
            }
          }
        }
      }
      sender_object.send()
    }
    return (
      <>
        <main>

        <div className="row s12 m3 offset-m3">
            <div className="col s12 m3 offset-m3 card center">
                <h5>Sign-up</h5>
                </div>
                <div className="col s12 m3 offset-m0 card center">
                <h5>
                    <NavLink to="/login" exact>
                    Login
                  </NavLink>
                  </h5>
                </div>
            </div>
          <div className="row">
            <div className="col s12 m6 offset-m3 card center">

              <div className="input-field col s12">
                <input className="validate" type="text" name="email" id="email" required />
                <label for="email">Email</label>
              </div>

              <div className="input-field col s12">
                <input className="validate" type="text" name="firstname" id="firstname" required />
                <label for="firstname">First Name</label>
              </div>
              <div className="input-field col s12">
                <input className="validate" type="text" name="lastname" id="lastname" required />
                <label for="lastname">Last Name</label>
              </div>


              <div className="input-field col s12">
                <input className="validate" type="password" name="password" id="password" required />
                <label for="password">Password</label>
              </div>

              <div className="input-field col s12">
                <DatePicker name="dob" id="dob" required />
                <label for="dob">DOB</label>
              </div>

              <button className="btn btn-small blue waves-effect" onClick={attempt_signup}>
                SignUp
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Signup;