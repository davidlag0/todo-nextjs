import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";
import { SessionProvider } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    fetch.doMock();
  });

  test("renders a nav and a main section with an empty task list", () => {
    render(
      <SessionProvider session={null}>
        <Home />
      </SessionProvider>
    );

    const navigation = screen.getByRole("navigation", {
      name: "",
    });

    const main = screen.getByRole("main", {
      name: "",
    });

    const newTaskTextbox = screen.getByRole("textbox", {
      name: "Enter a new task",
    });

    const newTaskHeading = screen.getByRole("heading", {
      name: "Add your first task",
    });

    const emptyTaskListImg = screen.getByRole("img", {
      name: "Task List",
    });

    expect(navigation).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(newTaskTextbox).toBeInTheDocument();
    expect(newTaskHeading).toBeInTheDocument();
    expect(emptyTaskListImg).toBeInTheDocument();
  });
});
