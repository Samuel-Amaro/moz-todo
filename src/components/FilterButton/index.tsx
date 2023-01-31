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
        className="btn toggle-btn"
        aria-pressed={isPressed}
        onClick={() => setFilter(name)}
      >
        <span className="visually-hidden">Show </span>
        <span>{name}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    );
}