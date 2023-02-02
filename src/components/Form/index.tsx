import React, { useState } from "react";
import classNames from "classnames";
import "./form.css";

type PropsForm = {
  addTask: (name: string) => void;
  className?: string;
};

export default function Form({ addTask, className }: PropsForm) {
  const classNameMaped = classNames("form", className);
  const [name, setName] = useState("");

  return (
    <form
      className={classNameMaped}
      onSubmit={(event) => {
        event.preventDefault();
        if (name !== "") {
          addTask(name);
          setName("");
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
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}
