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
  const [newName, setNewName] = useState(name);

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
      <div className="todo__form-group">
        <label className="todo__label" htmlFor={id}>
          Novo nome para <del>{name}</del>
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
          Cancelar
          <span className="visually-hidden">renomeando {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo__edit">
          Salvar
          <span className="visually-hidden">novo nome para {name}</span>
        </button>
      </div>
    </form>
  );

  //template de visualização
  const viewTemplate = (
    <div className="todo__view">
      <div className="todo__wrapper-check">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
          className="todo__input todo__checkbox"
        />
        <label className="todo__label" htmlFor={id}>
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
          Editar <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Excluir <span className="visually-hidden">{name}</span>
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
