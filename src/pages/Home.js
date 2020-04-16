import React from "react";
import M from "materialize-css";
import SimplePortal from "../components/SimplePortal";
import { NavLink } from "react-router-dom";
import { Modal, Button, Dropdown, DropdownItem } from "react-materialize";
import Particles from 'react-particles-js';

const trigger = <Button>Compose Mail</Button>

class Home extends React.Component {
  interval1;
  interval2;
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
    console.log();

    function add_mails(id, response) {
      document.getElementById(id).innerHTML = ""
      for (var i = 0; i < response.length; i++) {
        //console.log("notification");
        console.log(response[i]["sender"]);
        console.log(response[i]["subject"]);
        console.log(response[i]["body"]);
        // document.getElementById("display").innerHTML += response[i]["subject"]
        var division = document.createElement("div");
        division.className = "col m12 card";
        division.setAttribute("id", i);
        var head = document.createElement("h5");
        var anchor = document.createElement("a");
        anchor.setAttribute("id", i);
        anchor.href = "#";
        anchor.innerHTML = response[i]["sender"] + " " + response[i]["subject"];
        anchor.addEventListener("click", function (e) {
          display_mail(e, response);
        });
        head.appendChild(anchor);
        division.appendChild(head);
        document.getElementById(id).appendChild(division);
      }
    };

    function assignment_get() {
      // Display all the Assignment Mails
      //document.getElementById("display").innerHTML = "Assignment Change";
      console.log("assignment get called");
      var obj = {
        xhr: new XMLHttpRequest(),
        get_mails: function () {
          const token = localStorage.getItem('token');
          this.xhr.open("GET", "http://localhost:8080/mails/received?category=assignment", true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.setRequestHeader('Authorization', token);
          this.xhr.send();
        },
        callback: function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              console.log("Correct");
              const mails = JSON.parse(this.responseText);
              console.log(mails)
              console.log(this.responseText)
              //TODO mails is a list of mails
              var response = [
                {
                  "receiver": [
                    "user2"
                  ],
                  "readBy": [],
                  "_id": "5e95afce99bc312288633f48",
                  "sender": "user1",
                  "timeSent": "2020-04-14T12:42:54.386Z",
                  "subject": "subject2",
                  "body": "body2",
                  "category": "assignment",
                  "mailId": 10000,
                  "__v": 0
                }
              ]

              //TODO: mails is a list of mails for each mail create a div showing subject
              add_mails("display_ass", response);
            }
            if (this.status == 401) {
              alert("Token Expired! You are being logged out");
              window.location = '/logout';
            }
          }
        }
      }
      obj.get_mails();
    };

    function notification_get() {
      //document.getElementById("display").innerHTML = "Notification Change";
      console.log("notification called");
      var obj = {
        xhr: new XMLHttpRequest(),
        get_mails: function () {
          const token = localStorage.getItem('token');
          this.xhr.open("GET", "http://localhost:8080/mails/received?category=notification", true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.setRequestHeader('Authorization', token);
          this.xhr.send();
        },
        callback: function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              console.log("Correct");
              const mails = JSON.parse(this.responseText);
              console.log(this.responseText)
              console.log(mails)
              var response = [
                {
                  "receiver": [
                    "user2"
                  ],
                  "readBy": [],
                  "_id": "5e95afce99bc312288633f48",
                  "sender": "user1",
                  "timeSent": "2020-04-14T12:42:54.386Z",
                  "subject": "subject3",
                  "body": "body3",
                  "category": "notification",
                  "mailId": 10001,
                  "__v": 0
                },
                {
                  "receiver": [
                    "user2"
                  ],
                  "readBy": [],
                  "_id": "5e95afce99bc312288633f48",
                  "sender": "user1",
                  "timeSent": "2020-04-14T12:42:54.386Z",
                  "subject": "subject4",
                  "body": "body4",
                  "category": "notification",
                  "mailId": 10002,
                  "__v": 0
                }
              ];
              //TODO: mails is a list of mails for each mail create a div showing subject
              add_mails("display_not", response);
            }
            if (this.status == 401) {
              alert("Token Expired! You are being logged out");
              window.location = '/logout';
            }
          }
        }
      }
      obj.get_mails();
    };

    function display_mail(e, response) {
      var id = e.target.id;
      //var response = e.currentTarget.response;
      document.getElementById("individual_display").innerHTML = "";
      console.log(e.target.id.substring(0, e.target.id.toString()));
      console.log(document.getElementById("individual_display").innerHTML);
      console.log(response[id]);
      var division = document.createElement("div");
      division.setAttribute("className", "col m12");
      var head_subject = document.createElement("h5");
      var head_sub = document.createElement("h6");
      head_sub.innerHTML = response[id]["subject"];
      head_subject.innerHTML = "Subject :" + "<br>";
      var head_body = document.createElement("h5");
      var head_bod = document.createElement("h6");
      head_bod.innerHTML = response[id]["body"];
      head_body.innerHTML += "Body :" + "<br>";
      division.appendChild(head_subject);
      division.appendChild(head_sub);
      division.appendChild(head_body);
      division.appendChild(head_bod);
      document.getElementById("individual_display").append(division);
    };

    function check_login_state() {
      var sender_object = {
        xhr: new XMLHttpRequest(),
        send: function () {
          const token = localStorage.getItem('token');
          //alert("Sending request");
          this.xhr.open("GET", "http://localhost:8080/users/checkLogged", true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.setRequestHeader('Authorization', token);
          this.xhr.send();
        },
        callback: function () {
          if (this.readyState == 4) {
            if (this.status != 200) {
              alert("Not logged in");
              //alert(this.status);
              window.location = '/login';
            }
          }
        }
      }
      sender_object.send();
    }
    check_login_state();
    if (this.state.display == "notification") {
      notification_get.bind(this);
      assignment_get.bind(this);
      document.getElementById("display_not").style.display = "block";
      document.getElementById("display_ass").style.display = "none";
      notification_get();
      setTimeout(assignment_get, 1000);
    }
    this.interval1 = setInterval(assignment_get, 10000);
    this.interval2 = setInterval(notification_get, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }
  render() {
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
          this.xhr.setRequestHeader('Authorization', token);
          this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
            if (this.status == 500) {
              alert("Internal Server Error");
              window.location.href = "/home";
            }
            if (this.status == 401) {
              alert("Token Expired! You are being logged out");
              window.location = '/logout';
            }
          }
        }
      }
      mail_object.mail_send();
    }

    function notification_display() {
      document.getElementById("display_ass").style.display = "none";
      document.getElementById("display_not").style.display = "block";
    }

    function assignment_display() {
      document.getElementById("display_ass").style.display = "block";
      document.getElementById("display_not").style.display = "none";
    }

    const particleStyle = {
      width: "100%",
      height: "100%",
      position: "fixed",
      "z-index": "-10",
      top: "0",
      left: "0",
      "background-color": "white"
    }

    const divStyle = {
      "background-color": "transparent"
    }
    return (

      <>
        <main className="col s2">
          <Particles style={particleStyle}
            params={{
              "particles": {
                "number": {
                  "value": 160,
                  "density": {
                    "enable": true,
                    "value_area": 800
                  }
                },
                "color": {
                  "value": "#a40000"
                },
                "shape": {
                  "type": "circle",
                  "stroke": {
                    "width": 0,
                    "color": "#000000"
                  },
                  "polygon": {
                    "nb_sides": 5
                  },
                  "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                  }
                },
                "opacity": {
                  "value": 1,
                  "random": true,
                  "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0,
                    "sync": false
                  }
                },
                "size": {
                  "value": 5,
                  "random": true,
                  "anim": {
                    "enable": false,
                    "speed": 1,
                    "size_min": 0.3,
                    "sync": false
                  }
                },
                "line_linked": {
                  "enable": true,
                  "distance": 150,
                  "color": "#4f538e",
                  "opacity": 0.4,
                  "width": 1
                },
                "move": {
                  "enable": true,
                  "speed": 18.940440207397828,
                  "direction": "none",
                  "random": true,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 600
                  }
                }
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": true,
                    "mode": "bubble"
                  },
                  "onclick": {
                    "enable": true,
                    "mode": "repulse"
                  },
                  "resize": true
                },
                "modes": {
                  "grab": {
                    "distance": 400,
                    "line_linked": {
                      "opacity": 1
                    }
                  },
                  "bubble": {
                    "distance": 250,
                    "size": 0,
                    "duration": 2,
                    "opacity": 0,
                    "speed": 3
                  },
                  "repulse": {
                    "distance": 400,
                    "duration": 0.4
                  },
                  "push": {
                    "particles_nb": 4
                  },
                  "remove": {
                    "particles_nb": 2
                  }
                }
              },
              "retina_detect": true
            }}
          />
          <div className="row">
            <div className="col s6 m2 offset-m1 card center" style={divStyle}>
              <Modal header="Compose Mail" trigger={trigger}>
                <div className="col s12 m5 offset-m3 card center">
                  <div className="input-field col s12">
                    <input className="validate" type="text" name="to_mail" id="to_mail" required />
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
              <div className="col s8 m1 offset-m12 card center" style={divStyle}>
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
              <div className="col m6 card center" style={divStyle}>
                <h5>
                  <a href="#" onClick={notification_display}>Notification</a>
                </h5>
              </div>
              <div className="col m6 card center">
                <h5>
                  <a href="#" onClick={assignment_display}>Assignment</a>
                </h5>
              </div>

              <div className="col m12 card" style={divStyle}>
                <h5 id="display_ass"></h5>
                <h5 id="display_not"></h5>
              </div>
            </div>
            <div className="col s6">
              <div className="col m12 card" id="individual_display" style={divStyle}>
                <p>Displaying Each Individual Mail</p>
                <p>Disply Mail which might be in the format of Subject and Content</p>
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