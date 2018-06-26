import React, { Component } from "react";
import { GreetWithoutLogIn, Greet } from "./greetings";
import AddToDo from "./addToDo";
import {
  BACKEND_URL,
  ADD_TO_DO_ENDPOINT,
  GET_TO_DOS_ENDPOINT,
  CHANGE_STATUS_OF_TODOS_ENDPOINT,
  DELETE_TODO_ENDPOINT
} from "./constants";
import ToDoItem from "./toDoItem";
import "../styles/greetingStyle.css";

class ToDos extends Component {
  constructor() {
    super();
    let userDetails;
  }
  state = {
    toDos: new Map()
  };
  componentWillMount() {
    this.userDetails = this.props.location
      ? this.props.location.userDetails
      : undefined;
  }
  componentDidMount() {
    if (this.userDetails === undefined) {
      return;
    }
    fetch(BACKEND_URL + GET_TO_DOS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        userId: this.userDetails.userId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(({ response }) => {
        let tempMap = new Map();
        response.forEach(toDoItem => {
          tempMap.set(toDoItem._id, toDoItem);
        });
        this.setState({ toDos: tempMap });
      });
  }
  addToDo = toDoItem => {
    this.setState(({ toDos }) => {
      toDos.set(toDoItem._id, toDoItem);
      return {
        toDos: toDos
      };
    });
    fetch(BACKEND_URL + ADD_TO_DO_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        userId: toDoItem.userId,
        itemName: toDoItem.itemName,
        done: toDoItem.false
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonRes => {
        console.log(jsonRes);
      });
  };
  changeStatusOfToDo = (toDoItemId, previousStatus) => {
    this.setState(({ toDos }) => {
      const toDoToUpdate = toDos.get(toDoItemId);
      previousStatus = toDoToUpdate.done;
      toDoToUpdate.done = !toDoToUpdate.done;
      return {
        toDos: toDos
      };
    });
    fetch(BACKEND_URL + CHANGE_STATUS_OF_TODOS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        _id: toDoItemId,
        done: !previousStatus
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(jsonRes => console.log(jsonRes));
  };
  deleteToDo = toDoItemId => {
    this.setState(({ toDos }) => {
      toDos.delete(toDoItemId);
      return {
        toDos: toDos
      };
    });
    fetch(BACKEND_URL + DELETE_TODO_ENDPOINT, {
      method: "DELETE",
      body: JSON.stringify({
        _id: toDoItemId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(jsonRes => console.log(jsonRes));
  };
  render() {
    if (this.userDetails === undefined) {
      return <GreetWithoutLogIn />;
    } else {
      console.log(this.state.toDos);
      return (
        <div className="container">
          <Greet userName={this.userDetails.userName} />
          <AddToDo addToDo={this.addToDo} userId={this.userDetails.userId} />
          <div className="toDoContainer">
            {[...this.state.toDos.values()].map(toDoItem => {
              return (
                <ToDoItem
                  key={toDoItem._id}
                  className="toDoItemContainer"
                  toDoItem={toDoItem}
                  changeStatus={this.changeStatusOfToDo}
                  deleteToDo={this.deleteToDo}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}
export default ToDos;
