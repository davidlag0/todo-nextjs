import { render } from "@testing-library/react";
import Home from "../../pages/index";
import { SessionProvider } from "next-auth/react";

it("renders homepage unchanged", () => {
  const { container } = render(
    <SessionProvider session={null}>
      <Home />
    </SessionProvider>
  );
  expect(container).toMatchSnapshot();
});
