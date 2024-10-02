import { render, screen } from "@testing-library/react";

import Footer from "./Footer";
import { TodosContext } from "../contexts/todos";
import { expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { act } from "react";

describe("Footer", () => {
  it("should render hidden class on initial with no todos", () => {
    const mockDispatch = vi.fn();
    render(
      <TodosContext.Provider
        value={[{ todos: [], filter: "all" }, mockDispatch, {}]}
      >
        <Footer />
      </TodosContext.Provider>
    );
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveClass("hidden");
  });

  it("should render counter with 1 todos", async () => {
    const mockDispatch = vi.fn();

    render(
      <TodosContext.Provider
        value={[
          {
            todos: [{ id: 1, text: "test", isCompleted: false }],
            filter: "all",
          },
          mockDispatch,
          {},
        ]}
      >
        <Footer />
      </TodosContext.Provider>
    );

    const footer = screen.getByTestId("footer");
    expect(footer).not.toHaveClass("hidden");

    const todoCount = screen.getByTestId("todoCount");
    expect(todoCount).toHaveTextContent("1 item left");
  });

  it("should render counter with 2 todos", async () => {
    const mockDispatch = vi.fn();

    render(
      <TodosContext.Provider
        value={[
          {
            todos: [
              { id: 1, text: "test", isCompleted: false },
              { id: 2, text: "test2", isCompleted: false },
            ],
            filter: "all",
          },
          mockDispatch,
          {},
        ]}
      >
        <Footer />
      </TodosContext.Provider>
    );

    const footer = screen.getByTestId("footer");
    expect(footer).not.toHaveClass("hidden");

    const todoCount = screen.getByTestId("todoCount");
    expect(todoCount).toHaveTextContent("2 items left");
  });

  it("should render filter buttons with default filter all", () => {
    const mockDispatch = vi.fn();

    render(
      <TodosContext.Provider
        value={[
          {
            todos: [{ id: 1, text: "test", isCompleted: false }],
            filter: "all",
          },
          mockDispatch,
          {},
        ]}
      >
        <Footer />
      </TodosContext.Provider>
    );

    //
    const filterLinks = screen.getAllByTestId("filterLink"); //
    expect(filterLinks[0]).toHaveClass("selected");
  });

  it("should render selected filter button on active", () => {
    const mockDispatch = vi.fn();

    render(
      <TodosContext.Provider
        value={[
          {
            todos: [{ id: 1, text: "test", isCompleted: false }],
            filter: "active",
          },
          mockDispatch,
          {},
        ]}
      >
        <Footer />
      </TodosContext.Provider>
    );

    //
    const filterLinks = screen.getAllByTestId("filterLink"); //
    expect(filterLinks[1]).toHaveClass("selected");
  });

  it("should render selected filter button on completed", () => {
    const mockDispatch = vi.fn();

    render(
      <TodosContext.Provider
        value={[
          {
            todos: [{ id: 1, text: "test", isCompleted: false }],
            filter: "completed",
          },
          mockDispatch,
          {},
        ]}
      >
        <Footer />
      </TodosContext.Provider>
    );

    //
    const filterLinks = screen.getAllByTestId("filterLink"); //
    expect(filterLinks[2]).toHaveClass("selected");
  });

  it("should change filter", async () => {
    const changeFilterMock = vi.fn();
    const mockDispatch = vi.fn();

    render(
      <TodosContext.Provider
        value={[
          { todos: [], filter: "all" },
          mockDispatch,
          { changeFilter: changeFilterMock },
        ]}
      >
        <Footer />
      </TodosContext.Provider>
    );

    const user = userEvent.setup();
    const filterLinks = screen.getAllByTestId("filterLink");
    await user.click(filterLinks[1]);
    expect(changeFilterMock).toHaveBeenCalledWith("active");
  });
});
