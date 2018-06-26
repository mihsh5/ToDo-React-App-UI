import React, { Component } from "react";
import { BACKEND_URL, ADD_TO_DO_ENDPOINT } from "./constants";

import "../styles/addToDoStyle.css";
class AddToDo extends Component {
  handleKeyDown = e => {
    if (e.key !== "Enter") {
      return;
    }
    const toDoItem = this.addToDoNode.value;
    if (toDoItem === "") {
      return;
    }
    const newToDoItem = {
      userId: this.props.userId,
      itemName: toDoItem,
      done: false
    };
    this.addToDoNode.value = "";
    this.props.addToDo(newToDoItem);
  };
  render() {
    return (
      <input
        className="toDoInput"
        placeholder={"New To-Do"}
        onKeyDown={this.handleKeyDown}
        ref={node => (this.addToDoNode = node)}
      />
    );
  }
}
export default AddToDo;
