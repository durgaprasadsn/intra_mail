import React from "react";
import M from "materialize-css";
import SimplePortal from "../components/SimplePortal";
import { NavLink } from "react-router-dom";
import { Modal, Button, Dropdown, DropdownItem } from "react-materialize";

const trigger = <Button>Compose Mail</Button>

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compose: false, display: "notification" };

  };
  showModal = e => {
    this.setState({ compose: !this.state.compose });
  };

  componentDidMount() {
    // Auto initialize all the things!
    var check = localStorage.getItem('token');
    if (!check) {
      alert("You have logged out");
      window.location.href = "/login";
    }
    M.AutoInit();
    if (this.state.display == "notification") {
      document.getElementById("display").innerHTML = "Initial";
    }
    console.log();
    function check_login_state() {
      var sender_object = {
        xhr: new XMLHttpRequest(),
        send: function () {
          const token = localStorage.getItem('token');
          alert("Sending request");
          this.xhr.open("GET", "http://localhost:8080/users/checkLogged", true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.setRequestHeader('Authorization',token);
          this.xhr.send();
        },
        callback: function () {
          if (this.readyState == 4) {
            if (this.status != 200) {
              alert("Not logged in");
              alert(this.status);
              window.location='/login';
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
      //document.getElementById("display").innerHTML = "Assignment Change";
      var obj = {
        xhr: new XMLHttpRequest(),
        get_mails: function () {
          const token = localStorage.getItem('token');
          this.xhr.open("GET", "http://localhost:8080/mails/received?category=assignment", true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.setRequestHeader('Authorization',token);
          this.xhr.send();
        },
        callback: function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              console.log("Correct");
              const mails = JSON.parse(this.responseText);
              //TODO mails is a list of mails
            }
          }
        }
      }
      obj.get_mails();
    }

    function notification_display() {
      //document.getElementById("display").innerHTML = "Notification Change";
      var obj = {
        xhr: new XMLHttpRequest(),
        get_mails: function () {
          const token = localStorage.getItem('token');
          this.xhr.open("GET", "http://localhost:8080/mails/received?category=notification", true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.setRequestHeader('Authorization',token);
          this.xhr.send();
        },
        callback: function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              console.log("Correct");
              const mails = JSON.parse(this.responseText);
              //TODO: mails is a list of mails for each mail create a div showing subject
            }
          }
        }
      }
      obj.get_mails();
    }

    function send_mail() {
      console.log("Sending MAil");
      console.log(document.getElementById("to_mail").value);
      console.log(document.getElementById("subject").value);
      console.log(document.getElementById("content").value);
      var mail_object = {
        xhr: new XMLHttpRequest(),
        mail_send: function () {
          const token = localStorage.getItem('token');
          this.xhr.open("POST", "http://localhost:8080/mails/post", true);
          this.xhr.onreadystatechange = this.callback;
          let receiver = document.getElementById("to_mail").value.split(',');
          var content = {
            receiver: receiver,
            subject: document.getElementById("subject").value,
            body: document.getElementById("content").value
          }
          console.log("Sending data");
          console.log(content);
          this.xhr.send(JSON.stringify(content));
        },
        callback: function () {
          if (this.readyState == 4) {
            if (this.status == 201) {
              alert("Mail sent");
              window.location.href = "/home";
            }
            if(this.status == 500){
              alert("Internal Server Error");
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
            {/* <div className="col s6 m2 offset-m8 card center">
                <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>
                  <ul id='dropdown1' class='dropdown-content'>
                    <li><a href="#!">one</a></li>
                    <li><a href="#!">two</a></li>
                    <li class="divider" tabindex="-1"></li>
                    <li><a href="#!">three</a></li>
                    <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                    <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
                  </ul>
                </div> */}
            <div className="col s8">
              {/* <div className="col s3 m1 offset-m12 card center">
                <h6>
                  <NavLink to="/sent" exact>
                    Sent
                  </NavLink>
                </h6>
                </div> */}
              <div className="col s8 m1 offset-m12 card center">
                <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop</a>
                <ul id='dropdown1' class='dropdown-content'>
                  <li>
                    <NavLink to="/home" exact>
                      Home
                      </NavLink>
                  </li>
                  <li>
                    <NavLink to="/sent" exact>
                      Sent
                      </NavLink>
                  </li>
                  <li class="divider" tabindex="-1"></li>


                </ul>
              </div>
            </div>
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