import jestOpenAPI from "jest-openapi";
import fetch from "node-fetch";

jestOpenAPI(__dirname + "/../../public/openapi.yml");

// Reference: https://github.com/openapi-library/OpenAPIValidators/issues/251
describe("Tests to satisfy OpenAPI spec", () => {
  let task1ID = "blop";

  test("GET /api/tasks with empty task list", async () => {
    const rawResponse = await fetch(process.env.API_BASE_URL + "/api/tasks", {
      headers: { Cookie: process.env.NEXTAUTH_COOKIE || "" },
    });

    const body = await rawResponse.json();
    const response = {
      req: {
        path: rawResponse.url,
        method: "GET",
      },
      status: rawResponse.status,
      body,
    };

    expect(response.status).toEqual(404);
    expect(response).toSatisfyApiSpec();
  });

  it("POST /api/tasks", async () => {
    const rawResponse = await fetch(process.env.API_BASE_URL + "/api/tasks", {
      method: "POST",
      headers: {
        Cookie: process.env.NEXTAUTH_COOKIE || "",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ name: "test task" }),
    });

    const body = await rawResponse.json();
    const response = {
      req: {
        path: rawResponse.url,
        method: "POST",
      },
      status: rawResponse.status,
      body,
    };

    expect(response.status).toEqual(200);
    expect(response).toSatisfyApiSpec();
  });

  it("GET /api/tasks with tasks", async () => {
    const rawResponse = await fetch(process.env.API_BASE_URL + "/api/tasks", {
      headers: { Cookie: process.env.NEXTAUTH_COOKIE || "" },
    });

    const body = await rawResponse.json();
    const response = {
      req: {
        path: rawResponse.url,
        method: "GET",
      },
      status: rawResponse.status,
      body,
    };

    // Save task ID for following tests
    task1ID = response.body[0].id;

    expect(response.status).toEqual(200);
    expect(response).toSatisfyApiSpec();
  });

  it("GET /api/task/[taskId]", async () => {
    const rawResponse = await fetch(
      process.env.API_BASE_URL + "/api/tasks/" + task1ID,
      {
        headers: { Cookie: process.env.NEXTAUTH_COOKIE || "" },
      }
    );

    const body = await rawResponse.json();
    const response = {
      req: {
        path: rawResponse.url,
        method: "GET",
      },
      status: rawResponse.status,
      body,
    };

    expect(response.status).toEqual(200);
    expect(response).toSatisfyApiSpec();
  });

  it("GET /api/task/[taskId] with non-existent task ID", async () => {
    const rawResponse = await fetch(
      process.env.API_BASE_URL + "/api/tasks/4294967295",
      {
        headers: { Cookie: process.env.NEXTAUTH_COOKIE || "" },
      }
    );

    const body = await rawResponse.json();
    const response = {
      req: {
        path: rawResponse.url,
        method: "GET",
      },
      status: rawResponse.status,
      body,
    };

    expect(response.status).toEqual(404);
    expect(response).toSatisfyApiSpec();
  });
});

// TODO: add test for invalid task ID that is not a number.
