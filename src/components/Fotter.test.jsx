import { render, screen } from "@testing-library/react";

import Footer from "./Footer";
import { TodosContext } from "../contexts/todos";
import { expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { act } from "react";

describe("Footer", () => {
  const renderComponent = (state, reducerFunction = {}) => {
    const mockDispatch = vi.fn();
    const user = userEvent.setup();
    render(
      <TodosContext.Provider value={[state, mockDispatch, reducerFunction]}>
        <Footer />
      </TodosContext.Provider>
    );
    return {
      footer: screen.getByTestId("footer"),
      todoCount: screen.getByTestId("todoCount"),
      filterLinks: screen.getAllByTestId("filterLink"),
      user,
    };
  };

  it("should render hidden class on initial with no todos", () => {
    const { footer } = renderComponent({ todos: [], filter: "all" });
    expect(footer).toHaveClass("hidden");
  });

  it("should render counter with 1 todos", async () => {
    const { footer, todoCount } = renderComponent({
      todos: [{ id: 1, text: "test", isCompleted: false }],
      filter: "all",
    });
    expect(footer).not.toHaveClass("hidden");
    expect(todoCount).toHaveTextContent("1 item left");
  });

  it("should render counter with 2 todos", async () => {
    const { footer, todoCount } = renderComponent({
      todos: [
        { id: 1, text: "test", isCompleted: false },
        { id: 2, text: "test2", isCompleted: false },
      ],
      filter: "all",
    });

    expect(footer).not.toHaveClass("hidden");
    expect(todoCount).toHaveTextContent("2 items left");
  });

  it("should render filter buttons with default filter all", () => {
    const { filterLinks } = renderComponent({
      todos: [{ id: 1, text: "test", isCompleted: false }],
      filter: "all",
    });
    expect(filterLinks[0]).toHaveClass("selected");
  });

  it("should render selected filter button on active", () => {
    const { filterLinks } = renderComponent({
      todos: [{ id: 1, text: "test", isCompleted: false }],
      filter: "active",
    });
    expect(filterLinks[1]).toHaveClass("selected");
  });

  it("should render selected filter button on completed", () => {
    const { filterLinks } = renderComponent({
      todos: [{ id: 1, text: "test", isCompleted: false }],
      filter: "completed",
    });
    expect(filterLinks[2]).toHaveClass("selected");
  });

  it("should change filter", async () => {
    const changeFilterMock = vi.fn();
    const { user, filterLinks } = renderComponent(
      { todos: [], filter: "all" },
      { changeFilter: changeFilterMock }
    );
    await user.click(filterLinks[1]);
    expect(changeFilterMock).toHaveBeenCalledWith("active");
  });
});
