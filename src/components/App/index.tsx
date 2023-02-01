import React, { useEffect, useRef, useState } from "react";
import { ITasks } from "../../interface/ITasks";
import { nanoid } from "nanoid";
import Todo from "../Todo";
import Form from "../Form";
import usePrevious from "../../hooks/usePrevious";
import FilterButton from "../FilterButton";
import "./App.css";

type PropsApp = {
  allTasks: ITasks[];
};

interface Filter {
  [filter: string]: (task: ITasks) => boolean;
  All: () => boolean;
  Active: (task: ITasks) => boolean;
  Completed: (task: ITasks) => boolean;
}

const FILTER_MAP: Filter = {
  All: () => true,
  Active: (task: ITasks) => !task.completed,
  Completed: (task: ITasks) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App({ allTasks }: PropsApp) {
  const [tasks, setTasks] = useState(allTasks);
  const [filter, setFilter] = useState("All");

  function addTask(name: string) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id: string) {
    const updateTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updateTasks);
  }

  function deleteTask(id: string) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id: string, newName: string) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => {
    return (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    );
  });

  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  const filterList = FILTER_NAMES.map((name) => {
    return (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    );
  });

  const listHeadingRef = useRef<HTMLHeadingElement>(null);

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      if (!listHeadingRef.current) {
        throw Error("listHeadingRef is not assigned");
      } 
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp">
      {" "}
      {/*stack-large*/}
      <h1 className="todoapp__title">TodoMatic</h1>
      <Form addTask={addTask} className="todoapp__form" />
      <div className="todoapp__filters btn-group">
        {/*stack-exception*/}
        {filterList}
      </div>
      <h2
        id="list-heading"
        tabIndex={-1}
        ref={listHeadingRef}
        className="todoapp__subtitle"
      >
        {headingText}
      </h2>{" "}
      <ul className="todo-list" aria-labelledby="list-heading">
        {/*stack-large stack-exception*/}
        {taskList}
      </ul>
    </div>
  );
}

export default App;
