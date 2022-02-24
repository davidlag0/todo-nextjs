import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../../components/taskitem";

test("verifies initial listitem", () => {
  render(<TaskItem text={"test task"} checked={false} id={0}></TaskItem>);

  const taskCheckbox = screen.getByRole("checkbox");
  const taskText = screen.getByTitle("Task Item");
  const taskCheckmarkSvg = screen.getByTitle("Task Checkmark");

  expect(taskCheckbox).not.toBeChecked();
  expect(taskText.classList[0]).toBe("listTaskText");
  expect(taskCheckmarkSvg.classList[0]).toBe("listTaskCheckmark");
});

test("clicks checkbox and verify changes", () => {
  render(<TaskItem text={"test task"} checked={false} id={0}></TaskItem>);

  const taskCheckbox = screen.getByRole("checkbox");
  fireEvent.click(taskCheckbox);

  const taskText = screen.getByTitle("Task Item");
  const taskCheckmarkSvg = screen.getByTitle("Task Checkmark");

  expect(taskCheckbox).toBeChecked();
  expect(taskText.classList[0]).toBe("listTaskTextCrossed");
  expect(taskCheckmarkSvg.classList[0]).toBe("listTaskCheckmarkChecked");
});
