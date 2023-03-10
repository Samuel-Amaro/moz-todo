import React from "react";

type PropsFilterButton = {
    name: string,
    isPressed: boolean,
    setFilter: React.Dispatch<React.SetStateAction<string>>
};

export default function FilterButton({name, isPressed, setFilter}: PropsFilterButton) {
    return (
      <button
        type="button"
        className="btn btn--toggle"
        aria-pressed={isPressed}
        onClick={() => setFilter(name)}
      >
        <span className="visually-hidden">Mostrar </span>
        <span>{name}</span>
        <span className="visually-hidden"> tarefas</span>
      </button>
    );
}