import React from "react";

class Logout extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            localStorage.removeItem('token');
            window.location.href="/login";
        }, 3000);
    }
    render() {
        return (
        <main >
        
        <h5 className="center">Logout</h5>
        <p className="center">Logged Out Redirecting to Login Again.</p>
        
        </main>
        )
    };
}

export default Logout;