import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import { SessionProvider } from "next-auth/react";

describe("Home", () => {
  it("renders a nav and a main section", () => {
    // Could be useful for authenticated tests
    /*
    const mockSession = {
      expires: "1",
      user: { email: "a", name: "Delta", image: "c" },
    };
    */

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

    expect(navigation).toBeDefined();
    expect(main).toBeDefined();
  });
});
