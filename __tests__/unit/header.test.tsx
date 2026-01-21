import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/header";
import { SessionProvider, signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Header (unauthenticated)", () => {
  beforeEach(() => {
    fetch.doMock();
  });

  test("renders a login button in nav", async () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );

    const loginButton = screen.getByRole("button", {
      name: "Sign in with GitHub",
    });

    expect(loginButton).toBeInTheDocument();
  });

  test("clicks login button and it triggers login process", () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );

    fireEvent.click(screen.getByText(/Sign in with GitHub/i));
    expect(signIn).toHaveBeenCalledTimes(1);
  });
});

describe("Header (authenticated)", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("renders a logout button in nav", async () => {
    const mockSession = {
      expires: "1",
      user: { email: "test@test.com", name: "Test Name", image: "test_image" },
    };

    render(
      <SessionProvider session={mockSession}>
        <Header />
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
        <Header />
      </SessionProvider>
    );

    fireEvent.click(screen.getByText(/Sign out/i));
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
