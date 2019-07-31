import React, { Component } from "react";
import PropTypes from "prop-types";
import ToDoInput from "../../components/ToDoInput";
import ToDoItem from "../../components/ToDoItem";
import ToDoCount from "../../components/ToDoCount";
import ClearButton from "../../components/ClearButton";
import "./styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      // PR: todos come from props, and we don't need 
      //     lastId as meteor collection handles that
      todos: [{ id: 0, title: "Learn React", complete: false }],
      lastId: 0,
      inputValue: "",
    };

    this.toDoInput = React.createRef();
  }

  toggleComplete = item => {
    // PR: need to rework toggleComplete to use meteor collection
    let todos = this.state.todos.map(todo => {
      if (item.id === todo.id) todo.complete = !todo.complete;
      return todo;
    });

    this.setState({ todos });
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  addToDo = event => {
    event.preventDefault();

    let toDoInput = this.toDoInput.current;

    if (this.state.inputValue) {
      // PR: need rework
      //     - no longer need to calculate id as we can rely on _id from meteor
      //     - need a new way of adding the new ToDo to meteor
      //     - but we should still reset this.state.inputValue
      const id = this.state.lastId + 1; // update id

      const newTodos = [
        ...this.state.todos,
        {
          id,
          title: this.state.inputValue,
          complete: false
        }
      ];

      this.setState({
        todos: newTodos,
        lastId: id,
        inputValue: "",
      });

      toDoInput.value = "";
    }
  };

  removeToDo = item => {
    // PR: need to rework removeToDo to use meteor collection
    let todos = this.state.todos.filter(todo => todo.id !== item.id);
    this.setState({ todos });
  };

  removeCompleted = () => {
    // PR: need to rework toggleComplete to use meteor collection
    let todos = this.state.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  };

  hasCompleted() {
    // PR: changing this.state to this.props
    let completed = this.state.todos.filter(todo => todo.complete);
    return completed.length > 0 ? true : false;
  }

  componentDidMount() {
    this.toDoInput.current.focus();
  }

  render() {
    // PR: changing this.state to this.props
    let number = this.state.todos.length;

    return (
      <div className="todo-list">
        <h1>So Much To Do</h1>
        <ToDoInput
          ref={this.toDoInput}
          addToDo={this.addToDo}
          onChange={this.handleInputChange}
          value={this.state.inputValue}
        />
        <ul>
          {
            // PR: changing this.state to this.props
            this.state.todos.map((todo, index) => (
            <ToDoItem
              key={index}
              item={todo}
              toggleComplete={() => this.toggleComplete(todo)}
              removeToDo={() => this.removeToDo(todo)}
            />
          ))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={number} />
          {this.hasCompleted() && (
            <ClearButton removeCompleted={this.removeCompleted} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
