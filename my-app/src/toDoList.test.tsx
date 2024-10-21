import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

describe("ToDoList Tests", () => {
    test ("read", () => {
        render(<ToDoList />);
        const todoItems = screen.getAllByTestId((content, element) => {
            return element?.getAttribute('data-testid')?.startsWith('todo-checkbox-')?? false;
        });
        expect(todoItems.length).toBe(dummyGroceryList.length);
    });
    test("checked", () => {
        render(<ToDoList />);
        const checkbox = screen.getByTestId("todo-checkbox-Apples");
        fireEvent.click(checkbox);
        const itemsBought = screen.getByText(/Items bought:/i);
        expect(itemsBought.textContent).toContain("1");
    });
    test("check and unchecked", () => {
        render(<ToDoList />);
        const checkbox = screen.getByTestId("todo-checkbox-Apples");
        const checkbox2 = screen.getByTestId("todo-checkbox-Bananas");
        fireEvent.click(checkbox);
        fireEvent.click(checkbox2);
        fireEvent.click(checkbox);
        fireEvent.click(checkbox2);

        const itemsBought = screen.getByText(/Items bought:/i);
        expect(itemsBought.textContent).toContain("0");
    })
});