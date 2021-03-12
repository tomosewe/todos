import * as faker from "faker";
import { createTodo, toggleTodoStatus, removeTodo } from "../../helpers";

describe("todo.helper", () => {
  describe("toggleTodoStatus", () => {
    it("should toggle the status of the correct item", () => {
      const todo1 = createTodo(faker.random.words());
      const todo2 = createTodo(faker.random.words());

      const mockTodos = [todo1, todo2];

      const result = toggleTodoStatus(todo1.id, mockTodos);

      expect(result.find((todo) => todo.id === todo1.id).checked).toBe(true);
      expect(result.find((todo) => todo.id === todo2.id).checked).toBe(false);
    });
  });
  describe("removeTodo", () => {
    it("should remove the correct item", () => {
      const todo1 = createTodo(faker.random.words());
      const todo2 = createTodo(faker.random.words());

      const mockTodos = [todo1, todo2];

      const result = removeTodo(todo1.id, mockTodos);

      expect(result.length).toBe(1);
      expect(result.find((todo) => todo.id === todo1.id)).toBeUndefined();
    });
  });
});
