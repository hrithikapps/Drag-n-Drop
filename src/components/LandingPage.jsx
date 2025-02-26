import React, { useState } from "react";

const LandingPage = () => {
  const STATUS = {
    TODO: "TODO",
    DOING: "DOING",
    DONE: "DONE",
  };
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updating, setUpdating] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.keyCode == 13) {
      if (updating) {
        const newTask = tasks.map((item) => {
          if (item.id === updating.id) {
            item.title = inputValue;
          }
          return item;
        });
        setTasks((prevTask) => [...prevTask, newTask]);
        setInputValue("");
      } else {
        const newTask = {
          title: inputValue,
          status: STATUS.TODO,
          id: Date.now(),
        };
        setTasks((prevTask) => [...prevTask, newTask]);
        setInputValue("");
      }
    }
  };

  const handleDrag = (e, task) => {
    setDragTask(task);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragNDrop = (status) => {
    let copyTask = [...tasks];
    const newTasks = copyTask.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTasks(newTasks);
    setDragTask(null);
  };

  const handleOnDrop = (e) => {
    const status = e.target.getAttribute("data_status");
    if (status === STATUS.TODO) {
      handleDragNDrop(STATUS.TODO);
    } else if (status === STATUS.DONE) {
      handleDragNDrop(STATUS.DONE);
    } else if (status === STATUS.DOING) {
      handleDragNDrop(STATUS.DOING);
    }
  };

  const handleDeleteTask = (deletedTask) => {
    const copyTask = [...tasks];
    const updatedTasks = copyTask.filter((item) => item.id !== deletedTask.id);
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (task) => {
    setInputValue(task.title);
    setUpdating(task);
  };

  return (
    <div>
      <div className="landing-page">
        <h1>Task Manager</h1>
        <input
          value={inputValue}
          onKeyDown={handleInputKeyDown}
          onChange={handleInputChange}
          type="text"
        />
      </div>
      <div className="board">
        <div
          className="todo"
          data_status={STATUS.TODO}
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
        >
          <h2 className="todo-col">To-do</h2>
          {tasks.length > 0 &&
            tasks.map((task) => {
              {
                return (
                  task.status === STATUS.TODO && (
                    <div
                      draggable
                      onDrag={(e) => handleDrag(e, task)}
                      key={task.id}
                      className="task-items"
                    >
                      {task.title}
                      <div className="btns">
                        <span
                          onClick={() => handleUpdateTask(task)}
                          className="btn"
                        >
                          ✏️
                        </span>
                        <span
                          onClick={() => handleDeleteTask(task)}
                          className="btn"
                        >
                          ❌
                        </span>
                      </div>
                    </div>
                  )
                );
              }
            })}
        </div>
        <div
          className="doing"
          data_status={STATUS.DOING}
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
        >
          <h2 className="doing-col">Doing</h2>
          {tasks.length > 0 &&
            tasks.map((task) => {
              {
                return (
                  task.status === STATUS.DOING && (
                    <div
                      draggable
                      onDrag={(e) => handleDrag(e, task)}
                      key={task.id}
                      className="task-items"
                    >
                      {task.title}
                      <div className="btns">
                        <span className="btn">✏️</span>
                        <span
                          onClick={() => handleDeleteTask(task)}
                          className="btn"
                        >
                          ❌
                        </span>
                      </div>
                    </div>
                  )
                );
              }
            })}
        </div>
        <div
          className="done"
          data_status={STATUS.DONE}
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
        >
          <h2 className="done-col">Done</h2>
          {tasks.length > 0 &&
            tasks.map((task) => {
              {
                return (
                  task.status === STATUS.DONE && (
                    <div
                      draggable
                      onDrag={(e) => handleDrag(e, task)}
                      key={task.id}
                      className="task-items"
                    >
                      {task.title}
                      <div className="btns">
                        <span className="btn">✏️</span>
                        <span
                          onClick={() => handleDeleteTask(task)}
                          className="btn"
                        >
                          ❌
                        </span>
                      </div>
                    </div>
                  )
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
