import React, { useState } from "react";
import Button from "react-bootstrap/Button";
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
      <form onSubmit={handleSubmit} data-testid="todo-form">
        <label className="hidden" htmlFor="todo-input">
          Enter todo
        </label>
        <input
          name="todo"
          className="todo__input"
          autoFocus
          placeholder="E.g. Do something awesome!"
          type="text"
          value={inputValue}
          onChange={handleOnChange}
          id="todo-input"
        />
      </form>
      <div className="todo__list">
        {todos.map(({ id, text, checked }) => (
          <div className="todo__item" key={id}>
            <input
              className="big-checkbox"
              id={`${id}-checkbox`}
              onChange={handleCheckboxChange}
              type="checkbox"
              value={id}
            />
            <label
              htmlFor={`${id}-checkbox`}
              className={`todo__text ${checked ? "strike-through" : ""}`}
            >
              {text}
            </label>{" "}
            <Button onClick={() => handleDelete(id)} variant="danger">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
