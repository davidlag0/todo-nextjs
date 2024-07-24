/**
 * @jest-environment node
 */

import OpenAPIBackend from "openapi-backend";
import addFormats from "ajv-formats";
import { encodeJwt } from "../../lib/session";
import { createMocks } from "node-mocks-http";
import handle from "../../pages/api/tasks/index";
import { getServerSession } from "next-auth/next";
import { prismaMock } from "../../lib/prismaMockSingleton";

jest.mock("next-auth/next", () => {
  const originalModule = jest.requireActual("next-auth/next");

  return {
    __esModule: true,
    ...originalModule,
    getServerSession: jest.fn(),
  };
});

const api = new OpenAPIBackend({
  definition: "public/openapi.json",
  customizeAjv: (ajv) => {
    addFormats(ajv, {
      mode: "fast",
      formats: ["date-time"],
    });

    return ajv;
  },
});

const jwtClaims = {
  name: "Test User",
  email: "testuser@email.com",
};

describe("Tests to satisfy OpenAPI spec with OpenAPIBackend", () => {
  beforeAll(async () => {
    api.register({
      getTasks: (_c, req, res) => handle(req, res),
      addTask: (_c, req, res) => handle(req, res),
      validationFail: (c, _req, res) =>
        res.status(400).json({ err: c.validation.errors }),
      postResponseHandler: (c, _req, res) => {
        const valid = c.api.validateResponse(c.response, c.operation);
        if (valid.errors) {
          return res.status(502).json({ status: 502, err: valid.errors });
        }
      },
    });

    await api.init();
  });

  test("GET /api/tasks with empty task list", async () => {
    const { req, res } = createMocks({
      method: "GET",
      url: "/tasks",
      headers: {
        Cookie:
          "next-auth.session-token=" +
          (await encodeJwt(jwtClaims, process.env.NEXTAUTH_SECRET)),
      },
    });

    getServerSession.mockReturnValue(true);
    prismaMock.task.findMany.mockResolvedValue([]);

    await api.handleRequest(
      {
        method: req.method,
        path: req.url,
        headers: req.headers,
      },
      req,
      res
    );

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        error: "No Task Found",
      })
    );
  });
});
