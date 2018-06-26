import React, { Component } from "react";
import { BACKEND_URL, SIGNUP_ENDPOINT } from "./constants";
import { Redirect } from "react-router-dom";
import "../styles/loginStyle.css";

class SignUp extends Component {
  state = {
    signUpError: false,
    signedUp: false,
    userName: "",
    userId: ""
  };
  signUp = () => {
    const userName = this.usernameNode.value;
    const name = this.fullNameNode.value;
    const password = this.passwordNode.value;
    fetch(BACKEND_URL + SIGNUP_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        userName,
        password,
        name
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonRes => {
        if (jsonRes.response.id) {
          console.log("Should be redirected!");
          this.setState({
            signedUp: true,
            userName: userName,
            userId: jsonRes.response.id
          });
        } else {
          this.setState({ signUpError: true });
          this.passwordNode.value = "";
          this.usernameNode.value = "";
          this.fullNameNode.value = "";
        }
      });
  };
  renderRedirect = () => {
    if (this.state.signedUp)
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
  };
  render() {
    return (
      <div className="logInContainer">
        {this.renderRedirect()}
        <input
          className="userInput"
          ref={node => (this.fullNameNode = node)}
          placeholder="Enter Name"
        />
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
        <button className="logInButton" onClick={this.signUp}>
          Sign Up
        </button>
        {this.state.signUpError ? <h3>Try Again</h3> : null}
      </div>
    );
  }
}

export default SignUp;
