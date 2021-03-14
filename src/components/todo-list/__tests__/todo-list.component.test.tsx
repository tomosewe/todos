import { render, fireEvent, screen } from "@testing-library/react";
import * as faker from "faker";
import { TodoList } from "../todo-list.component";

describe("todo-list.component", () => {
  const setup = () => {
    const utils = render(<TodoList />);
    const input = utils.getByLabelText("Enter todo") as HTMLInputElement;
    const form = utils.getByTestId("todo-form") as HTMLFormElement;

    return {
      form,
      input,
      ...utils,
    };
  };

  const enterTodo = () => {
    const todoText = faker.lorem.sentence();

    const { input, form, getByText } = setup();
    fireEvent.change(input, { target: { value: todoText } });
    fireEvent.submit(form);

    const deleteTodoButton = getByText(/delete/i);

    return { todoText, deleteTodoButton };
  };

  it("should display a newly added todo", () => {
    const { todoText } = enterTodo();

    expect(screen.getByLabelText(todoText)).toBeInTheDocument();
  });

  it("should remove a todo when it is deleted", () => {
    const { todoText, deleteTodoButton } = enterTodo();

    fireEvent.click(deleteTodoButton);

    expect(screen.queryByLabelText(todoText)).not.toBeInTheDocument();
  });
});
