import { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "./form.css";

type PropsForm = {
  addTask: (name: string) => void;
  className?: string;
};

export default function Form({ addTask, className }: PropsForm) {
  const classNameMaped = classNames("form", className);
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");

  return (
    <form
      className={classNameMaped}
      onSubmit={(event) => {
        event.preventDefault();
        if (name.trim() !== "") {
          addTask(name);
          setName("");
          setFormError("");
        } else {
          setFormError("Informe um nome para a tarefa");
        }
      }}
    >
      <h2 className="form__title">
        <label htmlFor="new-todo-input" className="label label__lg">
          O que precisa ser feito?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        title="O que precisa ser feito?"
      />
      {formError && (
        <p className="error form__error" aria-live="polite">
          {formError}
        </p>
      )}
      <button type="submit" className="btn btn__primary btn__lg">
        Adicionar <FontAwesomeIcon icon={faCirclePlus} />
      </button>
    </form>
  );
}
