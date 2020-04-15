import React from "react";
import M from "materialize-css";
import SimplePortal from "../components/SimplePortal";
import { NavLink } from "react-router-dom";
import { Modal, Button, Dropdown, DropdownItem } from "react-materialize";

const trigger = <Button>Compose Mail</Button>

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { compose : false, display : "notification"};

    };
    showModal = e => {
      this.setState({compose:!this.state.compose});
    };
    
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
    if (this.state.display == "notification") {
      document.getElementById("display").innerHTML = "Initial";
    }
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
    function assignment_display() {
      // Display all the Assignment Mails
      document.getElementById("display").innerHTML = "Assignment Change";
    }

    function notification_display() {
      document.getElementById("display").innerHTML = "Notification Change";
    }

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
              <div className="col s6 m2 offset-m1 card center">
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
              </div>
              {/* <div className="col s8">
                <div className="col s3 m1 offset-m12 card center">
                <h6>
                  <NavLink to="/sent" exact>
                    Sent
                  </NavLink>
                </h6>
                </div>
              </div> */}
              {/* <div className="col s8">
                <Dropdown label="dropdown">
                  <DropdownItem link="/sent">Sent</DropdownItem>
                  <DropdownItem link="/logout">Logout</DropdownItem>
                </Dropdown>
              </div> */}
            </div>
          <div className="row">
            <div className="col s6">
              <div className="col m6 card center">
              <h5>
              <a href="#" onClick={notification_display}>Notification</a>
              </h5>
              </div>
                <div className="col m6 card center">
                <h5>
                  <a href="#" onClick={assignment_display}>Assignment</a>
                </h5>
                </div>
                
                <div className="col m12 card center">
                  <h5 id="display">Displaying</h5>
                </div>
            </div>
            <div className="col s6">
              <div className="col m12 card center">
              <p>Displaying Each Individual Mail</p>
                <p>Diaply Mail which might be in the format of Subject and Content</p>
                <p>Hello How r u</p>
              </div>
            </div>
            
          </div>
        </main>

      </>
    );
  }
}

export default Home;