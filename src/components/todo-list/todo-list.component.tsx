import React, { useState } from "react";
import { Todo } from "../../models";
import { createTodo, toggleTodoStatus, removeTodo } from "../../helpers";

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = createTodo(inputValue);
    setTodos([...todos, newTodo]);

    setInputValue("");
  };

  const handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newTodos = toggleTodoStatus(event.currentTarget.value, todos);

    setTodos(newTodos);
  };

  const handleDelete = (id: string) => {
    const newTodos = removeTodo(id, todos);

    setTodos(newTodos);
  };

  return (
    <>
      <h1 className="page-title">todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="todo"
          className="todo__input"
          autoFocus
          placeholder="E.g. Do something awesome!"
          type="text"
          value={inputValue}
          onChange={handleOnChange}
        />
      </form>
      <div className="todo__list">
        {todos.map(({ id, text, checked }) => (
          <div key={id}>
            <input
              id={`${id}-checkbox`}
              onChange={handleCheckboxChange}
              type="checkbox"
              value={id}
            />
            <label
              htmlFor={`${id}-checkbox`}
              className={checked ? "strike-through" : ""}
            >
              {text}
            </label>{" "}
            <button onClick={() => handleDelete(id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};
