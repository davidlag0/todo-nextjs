import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskList from "../../components/tasklist";
import { SessionProvider } from "next-auth/react";

describe("<TaskList> (unauthenticated)", () => {
  beforeEach(() => {
    fetch.doMock();
  });

  test("verifies initial and empty TaskList", () => {
    render(
      <SessionProvider session={null}>
        <TaskList></TaskList>
      </SessionProvider>
    );

    const addTaskTextbox = screen.getByRole("textbox", {
      name: "Enter a new task",
    });
    const taskList = screen.getByRole("list");
    const emptyTaskListSvg = screen.getByRole("img", { name: "Task List" });
    const addTaskHeading = screen.getByRole("heading", {
      name: "Add your first task",
    });

    expect(addTaskTextbox).toBeInTheDocument();
    expect(taskList).toBeInTheDocument();
    expect(emptyTaskListSvg).toBeInTheDocument();
    expect(addTaskHeading).toBeInTheDocument();
  });

  test("add task", async () => {
    render(
      <SessionProvider session={null}>
        <TaskList></TaskList>
      </SessionProvider>
    );

    const addTaskTextbox = screen.getByRole("textbox", {
      name: "Enter a new task",
    });
    await userEvent.type(addTaskTextbox, "test task!{enter}");

    const newTaskElement = screen.getByText("test task!");

    expect(newTaskElement).toBeInTheDocument();
  });

  test("delete task", async () => {
    render(
      <SessionProvider session={null}>
        <TaskList></TaskList>
      </SessionProvider>
    );

    const addTaskTextbox = screen.getByRole("textbox", {
      name: "Enter a new task",
    });
    await userEvent.type(addTaskTextbox, "task to be deleted!{enter}");

    // Verify new task has been added.
    const newTaskElement = screen.getByText("task to be deleted!");
    expect(newTaskElement).toBeInTheDocument();

    // Then delete the task.
    await userEvent.click(screen.getByRole("button"));

    const emptyTaskListSvg = screen.getByRole("img", { name: "Task List" });
    const addTaskHeading = screen.getByRole("heading", {
      name: "Add your first task",
    });
    expect(emptyTaskListSvg).toBeInTheDocument();
    expect(addTaskHeading).toBeInTheDocument();
  });
});

describe("<TaskList> (authenticated)", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("verifies initial and empty TaskList", async () => {
    const mockSession = {
      expires: "1",
      user: { email: "test@test.com", name: "Test Name", image: "test_image" },
    };

    fetch.mockResponse(JSON.stringify({ error: "No Task Found" }), {
      status: 404,
    });

    render(
      <SessionProvider session={mockSession}>
        <TaskList></TaskList>
      </SessionProvider>
    );

    const addTaskTextbox = screen.getByRole("textbox", {
      name: "Enter a new task",
    });
    const taskList = screen.getByRole("list");
    const emptyTaskListSvg = screen.getByRole("img", { name: "Task List" });
    const addTaskHeading = screen.getByRole("heading", {
      name: "Add your first task",
    });

    expect(addTaskTextbox).toBeInTheDocument();
    expect(taskList).toBeInTheDocument();
    expect(emptyTaskListSvg).toBeInTheDocument();
    expect(addTaskHeading).toBeInTheDocument();
  });

  test("verifies initial TaskList with 1 item", async () => {
    const mockSession = {
      expires: "1",
      user: { email: "test@test.com", name: "Test Name", image: "test_image" },
    };

    fetch.mockResponse(
      JSON.stringify([
        {
          id: 58,
          createdAt: "2022-04-11T01:20:08.370Z",
          updatedAt: "2022-04-11T01:20:08.371Z",
          name: "test task (authenticated)",
          checked: false,
          authorId: 1,
        },
      ]),
      {
        status: 200,
      }
    );

    render(
      <SessionProvider session={mockSession}>
        <TaskList></TaskList>
      </SessionProvider>
    );

    const emptyTaskListSvg = screen.getByRole("img", { name: "Task List" });
    const addTaskHeading = screen.getByRole("heading", {
      name: "Add your first task",
    });

    await waitFor(() => {
      expect(emptyTaskListSvg).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(addTaskHeading).not.toBeInTheDocument();
    });
  });

  test("add task from empty list", async () => {
    const mockSession = {
      expires: "1",
      user: { email: "test@test.com", name: "Test Name", image: "test_image" },
    };

    fetch
      .doMockOnce(JSON.stringify({ error: "No Task Found" }), {
        status: 404,
      })
      .doMockOnce(
        JSON.stringify([
          {
            id: 58,
            createdAt: "2022-04-11T01:20:08.370Z",
            updatedAt: "2022-04-11T01:20:08.371Z",
            name: "test task (authenticated add)",
            checked: false,
            authorId: 1,
          },
        ]),
        {
          status: 200,
        }
      );

    render(
      <SessionProvider session={mockSession}>
        <TaskList></TaskList>
      </SessionProvider>
    );

    const emptyTaskListSvg = screen.getByRole("img", { name: "Task List" });
    const addTaskHeading = screen.getByRole("heading", {
      name: "Add your first task",
    });

    await waitFor(() => {
      expect(emptyTaskListSvg).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(addTaskHeading).toBeInTheDocument();
    });

    const addTaskTextbox = screen.getByRole("textbox", {
      name: "Enter a new task",
    });

    await userEvent.type(
      addTaskTextbox,
      "test task (authenticated add)!{enter}"
    );

    const newTaskElement = screen.getByText("test task (authenticated add)!");

    await waitFor(() => {
      expect(newTaskElement).toBeInTheDocument();
    });
  });

  test("delete task that is already in the list", async () => {
    const mockSession = {
      expires: "1",
      user: { email: "test@test.com", name: "Test Name", image: "test_image" },
    };

    fetch.doMockOnce(
      JSON.stringify([
        {
          id: 58,
          createdAt: "2022-04-11T01:20:08.370Z",
          updatedAt: "2022-04-11T01:20:08.371Z",
          name: "test task (authenticated delete already there)",
          checked: false,
          authorId: 1,
        },
      ]),
      {
        status: 200,
      }
    );

    render(
      <SessionProvider session={mockSession}>
        <TaskList></TaskList>
      </SessionProvider>
    );

    // Wait for fetch to complete to show the task to delete.
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    // Delete the task.
    await userEvent.click(screen.getByRole("button"));

    const emptyTaskListSvg = screen.getByRole("img", { name: "Task List" });
    const addTaskHeading = screen.getByRole("heading", {
      name: "Add your first task",
    });

    // Confirm it was indeed deleted.
    await waitFor(() => {
      expect(emptyTaskListSvg).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(addTaskHeading).toBeInTheDocument();
    });
  });

  test("error when fetching the list of tasks", async () => {
    jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

    const mockSession = {
      expires: "1",
      user: { email: "test@test.com", name: "Test Name", image: "test_image" },
    };

    fetch.mockReject(new Error("fake error message"));

    render(
      <SessionProvider session={mockSession}>
        <TaskList></TaskList>
      </SessionProvider>
    );

    const emptyTaskListSvg = screen.getByRole("img", { name: "Task List" });
    const addTaskHeading = screen.getByRole("heading", {
      name: "Add your first task",
    });

    await waitFor(() => {
      expect(emptyTaskListSvg).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(addTaskHeading).toBeInTheDocument();
    });
  });

  test("error when adding a task from an empty list", async () => {
    jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

    const mockSession = {
      expires: "1",
      user: { email: "test@test.com", name: "Test Name", image: "test_image" },
    };

    fetch
      .doMockOnce(JSON.stringify({ error: "No Task Found" }), {
        status: 404,
      })
      .mockReject(new Error("fake error message"));

    render(
      <SessionProvider session={mockSession}>
        <TaskList></TaskList>
      </SessionProvider>
    );

    const emptyTaskListSvg = screen.getByRole("img", { name: "Task List" });
    const addTaskHeading = screen.getByRole("heading", {
      name: "Add your first task",
    });

    await waitFor(() => {
      expect(emptyTaskListSvg).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(addTaskHeading).toBeInTheDocument();
    });

    const addTaskTextbox = screen.getByRole("textbox", {
      name: "Enter a new task",
    });

    await userEvent.type(
      addTaskTextbox,
      "test task (authenticated add with error)!{enter}"
    );

    const newTaskElement = screen.getByText(
      "test task (authenticated add with error)!"
    );

    // TODO: We should probably not show the task being in the list if there was an error!
    await waitFor(() => {
      expect(newTaskElement).toBeInTheDocument();
    });
  });
});
