import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Searches from "./components/Searches";
import UserPosts from "./components/UserPosts";
import Navbar from "./components/Navbar";
import UpBtn from "./components/UpBtn";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/saved" component={Searches} />
            <Route exact path="/userPosts" component={UserPosts} />
          </Switch>
          <UpBtn />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
