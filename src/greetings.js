import React from "react";
import { Link } from "react-router-dom";
const GreetWithoutLogIn = props => {
  return (
    <div>
      <h1> Click the link below to login </h1>
      <Link to="/">LogIn</Link>
    </div>
  );
};

const Greet = props => {
  console.log(props);
  return (
    <div className="greetingsContainer">
      <span className="username"> Hello, {props.userName} </span>
      <span className="greetings"> {`Let's start adding your To-Dos!`} </span>
    </div>
  );
};

module.exports = {
  GreetWithoutLogIn,
  Greet
};
