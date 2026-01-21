/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../../components/taskitem";

const mockHandleDelete = jest.fn();

test("verifies initial listitem", () => {
  render(
    <TaskItem
      text={"test task"}
      checked={false}
      id={"0"}
      handleDelete={mockHandleDelete}
    ></TaskItem>
  );

  const taskCheckbox = screen.getByRole("checkbox");
  const taskText = screen.getByTitle("Task Item");
  const taskCheckmarkPath = screen
    .getByTitle("Task Checkmark")
    ?.querySelector("path");

  expect(taskCheckbox).not.toBeChecked();
  expect(taskText.classList[0]).toBe("listTaskText");
  // expect(taskCheckmarkPath?.classList[0]).toBe("listTaskCheckmark"); // TODO: fix test
});

test("clicks checkbox and verify changes", () => {
  render(
    <TaskItem
      text={"test task"}
      checked={false}
      id={"0"}
      handleDelete={mockHandleDelete}
    ></TaskItem>
  );

  const taskCheckbox = screen.getByRole("checkbox");
  fireEvent.click(taskCheckbox);

  const taskText = screen.getByTitle("Task Item");
  const taskCheckmarkPath = screen
    .getByTitle("Task Checkmark")
    ?.querySelector("path");

  expect(taskCheckbox).toBeChecked();
  expect(taskText.classList[0]).toBe("listTaskTextCrossed");
  // expect(taskCheckmarkPath?.classList[0]).toBe("listTaskCheckmarkChecked"); // TODO: fix test
});
