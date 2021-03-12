import { uuidv4 } from "./guid.helper";
import { Todo } from "../models";

export const createTodo = (text: string): Todo => {
  return {
    id: uuidv4(),
    checked: false,
    text,
  };
};

export const toggleTodoStatus = (id: string, todos: Todo[]): Todo[] => {
  return todos.map((todo) => {
    return todo.id === id ? { ...todo, checked: !todo.checked } : todo;
  });
};

export const removeTodo = (id: string, todos: Todo[]): Todo[] => {
  return todos.filter((todo) => todo.id !== id);
};
