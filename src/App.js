import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Logout from './pages/logout';
import { AuthContext } from "./context/auth";
import Navbar from "./components/Navbar";
import Intro from "./pages/intro";
import Loginnav from "./components/Loginnav";
import Signupnav from "./components/Signupnav";
import Homenav from "./components/Homenav";
import Compose from "./pages/compose";
import Composenav from "./components/composenav";
import About from "./pages/about";

class App extends React.Component {
  render() {
    return (
      <AuthContext.Provider value={false}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <>
            <Navbar />
            <Intro />
            </>
          </Route>
          <Route path="/login" exact>
            <>
            <Loginnav />
            <Login />
            </>
          </Route>
          <Route path="/logout" exact>
            <>
            <Logout />
            </>
          </Route>
          <Route path="/signup" exact>
            <>
              <Signupnav />
              <Signup />
            </>
          </Route>
          <Route path="/home" exact>
            <>
              <Homenav />
              <Home />
            </>
          </Route>
          <Route path="/compose" exact>
            <Composenav />
            <Compose />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
        </Switch>
      </Router>
      </AuthContext.Provider>
    )
  }
}

export default App;