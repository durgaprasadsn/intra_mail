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
    let disabled = 'disabled';
    function attempt_signup(){
      var sender_object = {
        xhr: new XMLHttpRequest(),
        send:function(){
          let data = {
            fname: document.getElementById("firstname").value,
            lname: document.getElementById("lastname").value,
            user: document.getElementById("email").value,
            password: document.getElementById("password").value,
            dob: document.getElementById("dob").value,
            no: document.getElementById("phoneno").value
          }
          this.xhr.open("POST","http://localhost:8080/users/signup",true);
          this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          this.xhr.onreadystatechange = this.callback;  
          console.log("Sending data");
          console.log(data);        
          this.xhr.send(JSON.stringify(data));
        },
        callback:function(){
          if (this.readyState === 4 && this.status === 201){
              alert("Successful Signup");
              window.location = '/login';
          }
        }
      }
      sender_object.send()
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
              const button = document.getElementById("signup");
              if(this.status == 404){
                console.log("404");
                button.removeAttribute("disabled");
              }
              if(this.status == 200){
                console.log("200");
                alert("User Already Exists");
                button.disabled = "true";
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
                <input className="validate" type="text" name="email" id="email" onBlur={checkUser} required />
                <label for="email">Username</label>
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
                <input className="validate" type="tel" name="phoneno" id="phoneno" maxLength="10" minLength="10" required />
                <label for="phoneno">Phone No</label>
              </div>

              <div className="input-field col s12">
                <DatePicker name="dob" id="dob" required />
                <label for="dob">DOB</label>
              </div>

              

              <button id="signup" className="btn btn-small blue waves-effect" onClick={attempt_signup}>
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