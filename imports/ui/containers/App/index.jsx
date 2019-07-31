import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";

/**
 * Commented out code below === refactoring input to be a controlled component
 */

const ToDoItem = ({ item, toggleComplete, removeToDo }) => (
  <li>
    {item.title}
    <input
      type="checkbox"
      id={item.id}
      checked={item.complete}
      onChange={toggleComplete}
    />
    <label htmlFor={item.id} />
    <button onClick={removeToDo}>
      <i className="fa fa-trash" />
    </button>
  </li>
);

const ToDoCount = ({ number }) => (
  <div>
    {number} {number > 1 || number === 0 ? "todos" : "todo"}
  </div>
);

const ClearButton = ({ removeCompleted }) => (
  <button onClick={removeCompleted}>Clear completed</button>
);

// const ToDoInput = ({ addToDo, value, onChange }) => (
//   <div className="add-todo">
//     <form name="addTodo" onSubmit={addToDo}>
//       <input type="text" value={value} onChange={onChange} />
//       <span>(press enter to add) </span>
//     </form>
//   </div>
// );

class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: [{ id: 0, title: "Learn React", complete: false }],
      lastId: 0
      // inputValue: ""
    };

    this.toDoInput = React.createRef();
  }

  toggleComplete = item => {
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

    // if (this.state.inputValue) {
    if (toDoInput.value) {
      const id = this.state.lastId + 1; // update id
      // const id = this.state.lastId + 1; // update id

      const newTodos = [
        ...this.state.todos,
        {
          id,
          title: toDoInput.value,
          // title: this.state.inputValue,
          complete: false
        }
      ];

      this.setState({
        todos: newTodos,
        lastId: id
        // inputValue: ""
      });

      toDoInput.value = "";
    }
  };

  removeToDo = item => {
    let todos = this.state.todos.filter(todo => todo.id !== item.id);
    this.setState({ todos });
  };

  removeCompleted = () => {
    let todos = this.state.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  };

  hasCompleted() {
    let completed = this.state.todos.filter(todo => todo.complete);
    return completed.length > 0 ? true : false;
  }

  componentDidMount() {
    // Can't do this with a controlled component!
    this.toDoInput.current.focus();
  }

  render() {
    let number = this.state.todos.length;

    return (
      <div className="todo-list">
        <h1>So Much To Do</h1>
        {/* <ToDoInput
          addToDo={this.addToDo}
          onChange={this.handleInputChange}
          value={this.state.inputValue}
        /> */}
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
            <input type="text" ref={this.toDoInput} />
            <span>(press enter to add) </span>
          </form>
        </div>
        <ul>
          {this.state.todos.map((todo, index) => (
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

ToDoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  }),
  toggleComplete: PropTypes.func.isRequired,
  removeToDo: PropTypes.func.isRequired
};

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

// ToDoInput.propTypes = {
//   addToDo: PropTypes.func.isRequired,
//   value: PropTypes.string
// };

export default App;
