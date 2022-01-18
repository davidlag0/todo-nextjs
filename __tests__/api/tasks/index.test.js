import { createMocks } from "node-mocks-http";
import handle from "../../../pages/api/tasks/index";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { prismaMock } from "../../../lib/prismaMockSingleton";

jest.mock("next-auth/react");
jest.mock("next-auth/jwt");

const testSession = {
  user: {
    name: "Test Author",
    email: "testauthor@test.com",
    image: "testimage",
  },
  expires: "1",
};

const testToken = {
  authorID: 1,
};

const testTask = {
  name: "Test Task",
  checked: false,
};

const testTask2 = {
  name: "Test Task 2",
  checked: false,
};

describe("/api/tasks/", () => {
  test("returns error message when logged out", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    getSession.mockReturnValue(null);

    await handle(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getData()).toEqual(
      expect.objectContaining({
        error: "Valid Credentials Required",
      })
    );
  });

  test("returns error message when logged in and using an unsupported HTTP method", async () => {
    const { req, res } = createMocks({
      method: "UNSUPPORTED",
    });

    getSession.mockReturnValue({});

    await handle(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toEqual(
      expect.objectContaining({
        error: "Method Not Allowed",
      })
    );
  });

  test("returns task details when logged in and POST'ing a new task name", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { name: "Test Task" },
    });

    getSession.mockReturnValue(testSession);
    getToken.mockReturnValue(testToken);

    prismaMock.task.create.mockResolvedValue(testTask);

    await handle(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(testTask)
    );
  });

  test("returns error message when logged in and GET'ing tasks when there is no task in the list", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    getSession.mockReturnValue(testSession);
    getToken.mockReturnValue(testToken);

    prismaMock.task.findMany.mockResolvedValue([]);

    await handle(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getData()).toEqual(
      expect.objectContaining({
        error: "No Task Found",
      })
    );
  });

  test("returns task details when logged in and GET'ing tasks", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    getSession.mockReturnValue(testSession);
    getToken.mockReturnValue(testToken);

    prismaMock.task.findMany.mockResolvedValue([testTask]);

    await handle(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())[0]).toEqual(
      expect.objectContaining(testTask)
    );
  });

  test("returns task details when logged in and GET'ing tasks when there is more than one task in the list", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    getSession.mockReturnValue(testSession);
    getToken.mockReturnValue(testToken);

    prismaMock.task.findMany.mockResolvedValue([testTask, testTask2]);

    await handle(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())[0]).toEqual(
      expect.objectContaining(testTask)
    );
    expect(JSON.parse(res._getData())[1]).toEqual(
      expect.objectContaining(testTask2)
    );
  });
});
