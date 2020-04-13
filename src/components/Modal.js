import React from "react";
import "materialize-css";
import "react-materialize";

class Modal extends React.Component {
  // onClose = e => {
  //   this.props.onClose && this.props.onClose(e);
  // };
  render() {
  //   if(!this.props.compose){
  //     return null;
  // }
// return( <div>{this.props.children}
//           <button onClick={e => { this.onClose(e); }}> Close </button>
//         </div>
//         );

  return (
        <div className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
  );
  }
}

export default Modal;