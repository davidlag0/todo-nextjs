import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { prismaMock } from "../../lib/prismaMockSingleton";

const allowedUser = {
  user: {
    email: "allowed_user@domain.com",
  },
};

const deniedUser = {
  user: {
    email: "denied_user@domain.com",
  },
};

describe("NextAuth", () => {
  test("returns true for a user that is allowed to log in", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      email: "allowed_user@domain.com",
    });

    expect(await authOptions.callbacks.signIn(allowedUser)).toBeTruthy();
  });

  test("returns false for a user that is not allowed to log in", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    expect(await authOptions.callbacks.signIn(deniedUser)).toBeFalsy();
  });
});
