import React, { useState } from "react";

type PropsForm = {
  addTask: (name: string) => void;
};

export default function Form({ addTask }: PropsForm) {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (name !== "") {
          addTask(name);
          setName("");
        }
      }}
    >
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={
          name
        } 
        onChange={
          (event) => {
            setName(event.target.value);
          }
        }
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}
