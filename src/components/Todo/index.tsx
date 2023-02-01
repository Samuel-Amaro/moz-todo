import React, { useRef, useEffect, useState } from "react";
import usePrevious from "../../hooks/usePrevious";
import "./todo.css";

type PropsTodo = {
  id: string;
  name: string;
  completed: boolean;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newName: string) => void;
};

export default function Todo({
  id,
  name,
  completed,
  toggleTaskCompleted,
  deleteTask,
  editTask,
}: PropsTodo) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const wasEditing = usePrevious(isEditing);

  //template de edição
  const editingTemplate = (
    <form
      className="todo__form-edit"
      onSubmit={(event) => {
        event.preventDefault();
        editTask(id, newName);
        setNewName("");
        setEditing(false);
      }}
    >
      {/*stack-small*/}
      <div className="todo__form-group">
        <label className="todo__label" htmlFor={id}>
          New name for {name}
        </label>
        <input
          id={id}
          className="todo__input todo__text"
          type="text"
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo__cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo__edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );

  //template de visualização
  const viewTemplate = (
    <div className="todo__view">
      {/*stack-small*/}
      <div className="todo__wrapper-check">
        {/*c-cb*/}
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
          className="todo__input todo__checkbox"
        />
        <label className="todo__label" htmlFor={id}>
          {/*todo-label*/}
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      if (!editFieldRef.current) {
        throw Error("inputRef is not assigned");
      }
      editFieldRef.current.focus();
    }

    if (wasEditing && !isEditing) {
      if (!editButtonRef.current) {
        throw Error("buttonRef is not assigned");
      }
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
