import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const ToDoInput = React.forwardRef(
  ({ addToDo, value, onChange }, ref) => (
    <div className="add-todo">
      <form name="addTodo" onSubmit={addToDo}>
        <input type="text" value={value} onChange={onChange} ref={ref}/>
        <span>(press enter to add) </span>
      </form>
    </div>
  )
);

ToDoInput.propTypes = {
  addToDo: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default ToDoInput;
