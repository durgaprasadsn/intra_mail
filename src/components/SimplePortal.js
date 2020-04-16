import React, { Component } from "react";
import M from "materialize-css";
class SimplePortal extends React.Component {

    componentDidMount() {
        M.AutoInit();
    }
    render() {
        return (
            <>
            <main className="col s3">
                <div className="row">
                    <div className="col s12 m6 offset-m3 card center">
                        <input className="validate" type="text" name="to_mail" id="to_mail" required/>
                        <input className="validate" type="text" name="subject" id="subject" required />
                        <input className="validate" type="textbox" name="content" id="content" />
                    </div>        
                </div>
            </main>
            </>
        )
    }
}

export default SimplePortal;