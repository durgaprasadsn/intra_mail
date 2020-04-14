import React from "react";
import M from "materialize-css";
import SimplePortal from "../components/SimplePortal";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-materialize";

const trigger = <Button>Compose Mail</Button>

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { compose : false};
    };
    showModal = e => {
      this.setState({compose:!this.state.compose});
    };
    
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
            if (this.status == 200) {
              //
            }
          }
        }
      }
      sender_object.send();
    }
    check_login_state();
  }
  render() {
    function send_mail() {
      console.log("Sending MAil");
      console.log(document.getElementById("to_mail").value);
      console.log(document.getElementById("subject").value);
      console.log(document.getElementById("content").value);
      var mail_object = {
        xhr: new XMLHttpRequest(),
        mail_send: function() {
          this.xhr.open("POST","http://localhost:8080/api/mail",true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.withCredentials = true;
          var content = new FormData();
          content.append("to_mai", document.getElementById("to_mail").value);
          content.append("subject", document.getElementById("subject").value);
          content.append("content", document.getElementById("content").value);
          console.log(content)
          this.xhr.send(content);
        },
        callback: function(){
          if (this.readyState == 4) {
            if (this.status == 200) {
              console.log("Correct");
              window.location.href = "/home";
            }
          }
        }
      }
    }
    return (
      <>
        <main className="col s2">
            <div className="row">
            <div className="col s12 m2 offset-m1 card center">
            <Modal header="Compose Mail" trigger={trigger}>
            <div className="col s12 m5 offset-m3 card center">
              <div className="input-field col s12">
                <input className="validate" type="email" name="to_mail" id="to_mail" required />
                <label for="to_mail">To:</label>
              </div>

              <div className="input-field col s12">
                <input className="validate" type="text" name="subject" id="subject" required />
                <label for="subject">Subject:</label>
              </div>

              <div className="input-field col s12">
                <input className="validate" type="text" name="content" id="content" required />
                <label for="content">Content:</label>
              </div>

              <Button onClick={send_mail}>Send Mail</Button>
            </div>
              </Modal>
             {/* <h6><a className="waves effect " href="#" onClick={e => { this.showModal(); }}>
            Compose Mail
             <NavLink to="/compose" exact>
              Compose Mail
            </NavLink> 
          </a></h6> */}

          
            
            </div>
            </div>
          <div className="row">
            <div className="col s12 m5 offset-m0 card center">
              <p>All Mails Here</p>
              <p>Will be seen one by one</p>
            </div>
            <div className="col s12 m7 offset-m0 card center">
              <p>Displaying Each Individual Mail</p>
              <p>Diaply Mail which might be in the format of Subject and Content</p>
            </div>
          </div>
          {/* <Modal onClose={this.showModal} compose={this.state.compose}>durgaprasadsn123@gmail.com</Modal> */}
            
        </main>

      </>
    );
  }
}

export default Login;