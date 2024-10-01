import { render, screen } from "@testing-library/react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { describe, expect } from "vitest";
import { TodosContext, TodosProvider, initialState, reducer } from "./todos";

// Helper test component
const TestingComponent = () => {
  const [todosState, , { addTodo }] = useContext(TodosContext);

  useEffect(() => {
    addTodo({ text: "test", isCompleted: false });
  }, [addTodo]);

  return (
    <>
      <div data-testid="content">{todosState.todos.length}</div>
    </>
  );
};
/////////////////////////////////////////////////////////////
describe("TodosProvider", () => {
  //////////////////////
  it("testing addTodo", async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          text: "test",
          isCompleted: false,
        },
      ],
    };
    vi.spyOn(axios, "post").mockResolvedValue(mockResponse);
    render(
      <TodosProvider>
        <TestingComponent />
      </TodosProvider>
    );

    const content = await screen.findByTestId("content");
    expect(content).toHaveTextContent(1);
  });
});
