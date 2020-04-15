import React from "react";
import "materialize-css";
import M from "materialize-css";
import { DatePicker } from "react-materialize";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-materialize";

const trigger = <Button>Compose Mail</Button>

class Sent extends React.Component {
  componentDidMount() {
    var check = localStorage.getItem('token');
    if (!check) {
      window.location.href = "/login";
    }

    // Auto initialize all the things!
    M.AutoInit();
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
                      <NavLink to="/sent" exact>
                        Sent
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/home" exact>
                        Home
                      </NavLink>
                    </li>
                    <li class="divider" tabindex="-1"></li>
                    
                  </ul>
                </div>
              </div>
              </div>
              <div className="row">
            <div className="col s6">
              <div className="col m12 card center">
              <h5>
              Sent
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

export default Sent;