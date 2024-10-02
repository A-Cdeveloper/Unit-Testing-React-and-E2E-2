import { render, screen } from "@testing-library/react";

import Todo from "./Todo";
import { TodosContext } from "../contexts/todos";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Todo", () => {
  it("should render default state", () => {
    const mochDispatch = vi.fn();
    const updateMockTodo = vi.fn();
    const removeMockTodo = vi.fn();
    const mockEditingId = vi.fn();

    render(
      <TodosContext.Provider
        value={[
          {},
          mochDispatch,
          { updateTodo: updateMockTodo, removeTodo: removeMockTodo },
        ]}
      >
        <Todo
          todo={{ id: 1, text: "First todo", isCompleted: false }}
          isEditing={false}
          setEditingId={mockEditingId}
        />
      </TodosContext.Provider>
    );
    const todo = screen.getByTestId("todo");
    expect(todo).not.toHaveClass("completed");
    expect(todo).not.toHaveClass("editing");

    const label = screen.getByTestId("label");
    expect(label).toHaveTextContent("First todo");

    const checkbox = screen.getByTestId("toggle");
    expect(checkbox).not.toBeChecked();

    const deleteButton = screen.getByTestId("destroy");
    expect(deleteButton).toBeInTheDocument();

    const edit = screen.queryByTestId("edit");
    expect(edit).not.toBeInTheDocument();
  });

  ////////////////////////
  it("should toogle todo state", async () => {
    const mochDispatch = vi.fn();
    const updateMockTodo = vi.fn();
    const removeMockTodo = vi.fn();
    const mockEditingId = vi.fn();

    const mockedTodo = {
      id: 1,
      text: "First todo",
      isCompleted: false,
    };

    render(
      <TodosContext.Provider
        value={[
          {},
          mochDispatch,
          { updateTodo: updateMockTodo, removeTodo: removeMockTodo },
        ]}
      >
        <Todo
          todo={mockedTodo}
          isEditing={false}
          setEditingId={mockEditingId}
        />
      </TodosContext.Provider>
    );

    const user = userEvent.setup();
    const checkbox = screen.getByTestId("toggle");

    await user.click(checkbox);
    expect(updateMockTodo).toHaveBeenCalled(mockedTodo.id, {
      text: mockedTodo.text,
      isCompleted: true,
    });
  });

  it("should  delete todo", async () => {
    const mochDispatch = vi.fn();
    const updateMockTodo = vi.fn();
    const removeMockTodo = vi.fn();
    const mockEditingId = vi.fn();

    const mockedTodo = {
      id: 1,
      text: "First todo",
      isCompleted: false,
    };

    render(
      <TodosContext.Provider
        value={[
          {},
          mochDispatch,
          { updateTodo: updateMockTodo, removeTodo: removeMockTodo },
        ]}
      >
        <Todo
          todo={mockedTodo}
          isEditing={false}
          setEditingId={mockEditingId}
        />
      </TodosContext.Provider>
    );

    const user = userEvent.setup();
    const deleteButton = screen.getByTestId("destroy");

    await user.click(deleteButton);
    expect(removeMockTodo).toHaveBeenCalled(mockedTodo.id);
  });

  it("should  activate editing mode", async () => {
    const mochDispatch = vi.fn();
    const updateMockTodo = vi.fn();
    const removeMockTodo = vi.fn();
    const mockEditingId = vi.fn();

    const mockedTodo = {
      id: 1,
      text: "First todo",
      isCompleted: false,
    };

    render(
      <TodosContext.Provider
        value={[
          {},
          mochDispatch,
          { updateTodo: updateMockTodo, removeTodo: removeMockTodo },
        ]}
      >
        <Todo
          todo={mockedTodo}
          isEditing={false}
          setEditingId={mockEditingId}
        />
      </TodosContext.Provider>
    );
    const user = userEvent.setup();
    const label = screen.getByTestId("label");

    await user.dblClick(label);
    expect(mockEditingId).toHaveBeenCalledWith(mockedTodo.id);
  });

  it("should update todo", async () => {
    const mochDispatch = vi.fn();
    const updateMockTodo = vi.fn();
    const removeMockTodo = vi.fn();
    const mockEditingId = vi.fn();

    const mockedTodo = {
      id: 1,
      text: "First todo",
      isCompleted: false,
    };

    render(
      <TodosContext.Provider
        value={[
          {},
          mochDispatch,
          { updateTodo: updateMockTodo, removeTodo: removeMockTodo },
        ]}
      >
        <Todo todo={mockedTodo} isEditing={true} setEditingId={mockEditingId} />
      </TodosContext.Provider>
    );
    const user = userEvent.setup();
    const edit = screen.getByTestId("edit");
    await user.clear(edit);
    await user.type(edit, "New Text{Enter}");

    expect(updateMockTodo).toHaveBeenCalledWith(mockedTodo.id, {
      text: "New Text",
      isCompleted: false,
    });
  });

  it("should focus input when edit mode is active", async () => {
    const mochDispatch = vi.fn();
    const updateMockTodo = vi.fn();
    const removeMockTodo = vi.fn();
    const mockEditingId = vi.fn();

    const mockedTodo = {
      id: 1,
      text: "First todo",
      isCompleted: false,
    };

    render(
      <TodosContext.Provider
        value={[
          {},
          mochDispatch,
          { updateTodo: updateMockTodo, removeTodo: removeMockTodo },
        ]}
      >
        <Todo todo={mockedTodo} isEditing={true} setEditingId={mockEditingId} />
      </TodosContext.Provider>
    );

    const edit = screen.getByTestId("edit");
    expect(edit).toHaveFocus();
  });
});
