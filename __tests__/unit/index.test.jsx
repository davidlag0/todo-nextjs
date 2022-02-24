import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../../pages/index";
import { SessionProvider, signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("renders a nav and a main section", () => {
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

    const loginButton = screen.getByRole("button", {
      name: "Sign in with GitHub",
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
    expect(loginButton).toBeInTheDocument();
    expect(newTaskTextbox).toBeInTheDocument();
    expect(newTaskHeading).toBeInTheDocument();
    expect(emptyTaskListImg).toBeInTheDocument();
  });

  test("clicks login button and it triggers login process", () => {
    render(
      <SessionProvider session={null}>
        <Home />
      </SessionProvider>
    );

    fireEvent.click(screen.getByText(/Sign in with GitHub/i));
    expect(signIn).toHaveBeenCalledTimes(1);
  });
});

describe("Home (authenticated)", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("renders a logout button in nav", async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: "No Task Found" }));

    const mockSession = {
      expires: "1",
      user: { email: "test@test.com", name: "Test Name", image: "test_image" },
    };

    render(
      <SessionProvider session={mockSession}>
        <Home />
      </SessionProvider>
    );

    const logoutButton = screen.getByRole("button", {
      name: "Sign out",
    });

    const loggedInText = screen.getByText("Signed in as test@test.com");

    expect(logoutButton).toBeInTheDocument();
    expect(loggedInText).toBeInTheDocument();
  });

  test("clicks logout button and it triggers logout process", () => {
    const mockSession = {
      expires: "1",
      user: { email: "test@test.com", name: "Test Name", image: "test_image" },
    };

    render(
      <SessionProvider session={mockSession}>
        <Home />
      </SessionProvider>
    );

    fireEvent.click(screen.getByText(/Sign out/i));
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
