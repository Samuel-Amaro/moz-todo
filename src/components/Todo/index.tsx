import React, { useRef, useEffect, useState } from "react";
import usePrevious from "../../hooks/usePrevious";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faFloppyDisk,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./todo.css";
import { ITasks } from "../../interface/ITasks";

interface PropsTodo extends ITasks {
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newName: string) => void;
}

export default function Todo({
  id,
  name,
  completed,
  toggleTaskCompleted,
  deleteTask,
  editTask,
  dateIsTimeCreation,
  dateIsTimeModification
}: PropsTodo) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [formError, setFormError] = useState("");

  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const wasEditing = usePrevious(isEditing);

  //template de edição
  const editingTemplate = (
    <form
      className="todo__form-edit"
      onSubmit={(event) => {
        event.preventDefault();
        if (newName.trim() !== "") {
          editTask(id, newName);
          setNewName("");
          setEditing(false);
          setFormError("");
        } else {
          setFormError("E necessário informar o novo nome");
        }
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
      {formError && (
        <p className="error todo__error" aria-live="polite">
          {formError}
        </p>
      )}
      <div className="btn-group">
        <button
          type="button"
          className="btn todo__cancel"
          onClick={() => setEditing(false)}
        >
          Cancelar <FontAwesomeIcon icon={faBan} />
          <span className="visually-hidden">renomeando {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo__edit">
          Salvar <FontAwesomeIcon icon={faFloppyDisk} />
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
        <div className="todo__datas">
          <label className="todo__label" htmlFor={id}>
            {name}
          </label>
          <div className="todo__wrapper-dates">
            <p className="todo__wrapper-date">
              <span className="todo__data">Criado em:</span>
              <time
                className="todo__date-created"
                dateTime={`${dateIsTimeCreation.getFullYear()}-${
                  dateIsTimeCreation.getMonth() + 1
                }-${dateIsTimeCreation.getDate()} ${dateIsTimeCreation.getHours()}:${dateIsTimeCreation.getMinutes()}:${dateIsTimeCreation.getSeconds()}.${dateIsTimeCreation.getMilliseconds()}`}
              >
                {dateIsTimeCreation.toLocaleString()}
              </time>
            </p>
            <p className="todo__wrapper-date">
              <span className="todo__data">Ultima modificação:</span>
              <time
                className="todo__date-modifier"
                dateTime={`${dateIsTimeModification.getFullYear()}-${
                  dateIsTimeModification.getMonth() + 1
                }-${dateIsTimeModification.getDate()} ${dateIsTimeModification.getHours()}:${dateIsTimeModification.getMinutes()}:${dateIsTimeModification.getSeconds()}.${dateIsTimeModification.getMilliseconds()}`}
              >
                {dateIsTimeModification.toLocaleString()}
              </time>
            </p>
          </div>
        </div>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Editar <FontAwesomeIcon icon={faPenToSquare} />{" "}
          <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Excluir <FontAwesomeIcon icon={faTrash} />{" "}
          <span className="visually-hidden">{name}</span>
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
