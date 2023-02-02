import React, { useEffect, useRef, useState } from "react";
import { ITasks } from "../../interface/ITasks";
import { nanoid } from "nanoid";
import Todo from "../Todo";
import Form from "../Form";
import usePrevious from "../../hooks/usePrevious";
import FilterButton from "../FilterButton";
import "./App.css";


interface Filter {
  [filter: string]: (task: ITasks) => boolean;
  Todos: () => boolean;
  Ativas: (task: ITasks) => boolean;
  Completo: (task: ITasks) => boolean;
}

const FILTER_MAP: Filter = {
  Todos: () => true,
  Ativas: (task: ITasks) => !task.completed,
  Completo: (task: ITasks) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {

  useEffect(() => {
    const itens = localStorage.getItem("tasks");
    if (itens) {
      setTasks(JSON.parse(itens));
    }
  }, []);

  const [tasks, setTasks] = useState<ITasks[]>([]);

  const [filter, setFilter] = useState("Todos");

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

  const taskNoun = taskList.length !== 1 ? "tarefas" : "tarefa";
  const headingText = `${taskList.length} ${taskNoun} restante`;

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
      if (listHeadingRef.current) {
        listHeadingRef.current.focus();
      }
    }
  }, [tasks.length, prevTaskLength]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">TodoMatic</h1>
      {tasks.length === 0 ? (
        <>
          <p>Ola, você não possui tarefas.</p>
          <Form addTask={addTask} className="todoapp__form" />
        </>
      ) : (
        <>
          <Form addTask={addTask} className="todoapp__form" />
          <div className="todoapp__filters btn-group">{filterList}</div>
          <h2
            id="list-heading"
            tabIndex={-1}
            ref={listHeadingRef}
            className="todoapp__subtitle"
          >
            {headingText}
          </h2>
          <ul className="todo-list" aria-labelledby="list-heading">
            {taskList}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
