import { createMocks } from "node-mocks-http";
import handle from "../../../../pages/api/tasks/[taskId]";
import { getServerSession } from "next-auth/next";
import { prismaMock } from "../../../../lib/prismaMockSingleton";

jest.mock("next-auth/jwt");
jest.mock("next-auth/next", () => {
  const originalModule = jest.requireActual("next-auth/next");

  return {
    __esModule: true,
    ...originalModule,
    getServerSession: jest.fn(),
  };
});

const testSession = {
  user: {
    name: "Test Author",
    email: "testauthor@test.com",
    image: "testimage",
  },
  expires: "1",
};

const testTaskId = 1;
const testTask = {
  id: testTaskId,
  name: "Test Task",
  checked: false,
};
const testTaskUrlId = 1;

describe("/api/tasks/[taskId]", () => {
  test("returns error message when logged out", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: testTaskUrlId,
      },
    });

    getServerSession.mockReturnValue(null);

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
      query: {
        id: testTaskUrlId,
      },
    });

    getServerSession.mockReturnValue({});

    await handle(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toEqual(
      expect.objectContaining({
        error: "Method Not Allowed",
      })
    );
  });

  test("returns error message when logged in and GET'ing task when there is no task returned", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: testTaskUrlId,
      },
    });

    getServerSession.mockReturnValue(testSession);

    prismaMock.task.findUnique.mockResolvedValue(null);

    await handle(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getData()).toEqual(
      expect.objectContaining({
        error: "Task Not Found",
      })
    );
  });

  test("returns task details when logged in and GET'ing a task", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: testTaskUrlId,
      },
    });

    getServerSession.mockReturnValue(testSession);

    prismaMock.task.findUnique.mockResolvedValue(testTask);

    await handle(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(testTask)
    );
    expect(req.query.id).toBe(testTask.id);
  });

  test("returns task details when logged in and DELETE'ing a task", async () => {
    const { req, res } = createMocks({
      method: "DELETE",
      query: {
        id: testTaskUrlId,
      },
    });

    getServerSession.mockReturnValue(testSession);

    prismaMock.task.delete.mockResolvedValue(testTask);

    await handle(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(testTask)
    );
    expect(req.query.id).toBe(testTask.id);
  });
});
