import React from "react";
import M from "materialize-css";

class Login extends React.Component {
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  render() {
    return (
        <>
            <main className="col s3">
                <div className="row">
                    <div className="col s12 m6 offset-m3 card center">
                        <div className="input-field col s12">
                            <input className="validate" type="email" name="to_mail" id="to_mail" required />
                            <label for="to_mail">To:</label>
                        </div>
                    </div>

                    <div className="col s12 m6 offset-m3 card center">
                        <div className="input-field col s12">
                            <input className="validate" type="text" name="subject" id="subject" required />
                            <label for="subject">Subject:</label>
                        </div>
                    </div>

                    <div className="col s12 m6 offset-m3 card center">
                        <div className="input-field col s12">
                            <input className="validate" type="textbox" name="content" id="content" required />
                            <label for="content">Content:</label>
                        </div>
                    </div>
      
                </div>
            </main>
        </>
    );
  }
}

export default Login;