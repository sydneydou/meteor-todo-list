import React, { Component } from "react";
import {withTracker} from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import ToDoInput from "../../components/ToDoInput";
import ToDoItem from "../../components/ToDoItem";
import ToDoCount from "../../components/ToDoCount";
import ClearButton from "../../components/ClearButton";
import "./styles.css";

import { ToDos } from "../../../api/todos";
const TODOS = [{ id: 0, title: "Learn React", complete: false }];

class App extends Component {
  constructor() {
    super();
    // PR: do not need this anymore because meteor will handle the todos
    this.state = {
      todos: TODOS,
      lastId: 0,
    };
  }

  // PR: need to use meteor to toggle complete
  toggleComplete = id => {
    let todos = this.state.todos.map(todo => {
      if (id === todo.id) todo.complete = !todo.complete;
      return todo;
    });

    this.setState({ todos });
  };

  // PR: need to use meteor to add todo 
  addToDo = title => {
    const id = this.state.lastId + 1;
    const newTodo = {
      id,
      complete: false,
      title,
    };

    this.setState({
      todos: [...this.state.todos, newTodo],
      lastId: id,
    });
  };

  // PR: need to use meteor to remove todo
  removeToDo = id => {
    let todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos });
  };

  // PR: need to use meteor to remove all completed
  removeCompleted = () => {
    let todos = this.state.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  };


  render() {
    return (
      <ToDoForm 
        todos={this.state.todos}
        addToDo={title => this.addToDo(title)}
        toggleComplete={id => this.toggleComplete(id)}
        removeToDo={id => this.removeToDo(id)}
        removeCompleted={() => this.removeCompleted()}
      />
    );
  }
}

class ToDoForm extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: "",
    };

    this.toDoInput = React.createRef();
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  addToDo = event => {
    event.preventDefault();

    let toDoInput = this.toDoInput.current;

    if (this.state.inputValue) {
      const title = this.state.inputValue;
      this.props.addToDo(title);

      this.setState({
        inputValue: "",
      });

      toDoInput.value = "";
    }
  };

  hasCompleted() {
    const {todos} = this.props;
    let completed = todos.filter(todo => todo.complete);
    return completed.length > 0 ? true : false;
  }

  componentDidMount() {
    this.toDoInput.current.focus();
  }

  render() {
    const {todos, toggleComplete, addToDo, removeCompleted, removeToDo} = this.props;
    let number = todos.length;

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
            todos.map((todo, index) => (
            <ToDoItem
              key={index}
              item={todo}
              toggleComplete={() => toggleComplete(todo.id)}
              removeToDo={() => removeToDo(todo.id)}
            />
          ))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={number} />
          {this.hasCompleted() && (
            <ClearButton removeCompleted={removeCompleted} />
          )}
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
	return {
		todos: ToDos.find({}).fetch()
	};
})(App);


