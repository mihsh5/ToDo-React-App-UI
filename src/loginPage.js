import React, { Component } from "react";
import { BACKEND_URL, LOGIN_ENDPOINT } from "./constants";
import { Redirect } from "react-router-dom";
import "../styles/loginStyle.css";

class LogIn extends Component {
  state = {
    logInError: false,
    loggedIn: false,
    userName: "",
    userId: "",
    signingUp: false
  };
  signUp = () => {
    this.setState({ signingUp: true });
  };
  logIn = () => {
    const userName = this.usernameNode.value;
    const password = this.passwordNode.value;
    fetch(BACKEND_URL + LOGIN_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        userName,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonRes => {
        if (jsonRes.response === "Ok") {
          console.log("Should be redirected!");
          this.setState({
            loggedIn: true,
            userName: userName,
            userId: jsonRes.userId
          });
        } else {
          this.setState({ logInError: true });
          this.passwordNode.value = "";
          this.usernameNode.value = "";
        }
      });
  };
  renderRedirect = () => {
    if (this.state.loggedIn)
      return (
        <Redirect
          to={{
            pathname: "/todos",
            userDetails: {
              userName: this.state.userName,
              userId: this.state.userId
            }
          }}
        />
      );
    else if (this.state.signingUp)
      return (
        <Redirect
          to={{
            pathname: "/signup"
          }}
        />
      );
  };
  render() {
    return (
      <div className="logInContainer">
        {this.renderRedirect()}
        <input
          className="userInput"
          ref={node => (this.usernameNode = node)}
          placeholder="Enter Username"
        />
        <input
          className="userInput"
          ref={node => (this.passwordNode = node)}
          placeholder="Enter Password"
          type="password"
        />
        <button className="logInButton" onClick={this.logIn}>
          Log In
        </button>

        <button className="logInButton" onClick={this.signUp}>
          Sign Up
        </button>
        {this.state.logInError ? <h3>Try Again</h3> : null}
      </div>
    );
  }
}

export default LogIn;
