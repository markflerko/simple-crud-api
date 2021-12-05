const server = require("../index");
const request = require("supertest");

let id;

describe("3. Delete same entity second time occur an error (human friendly message)", () => {
  test("POST-request create new entity (expect response with new entity)", async () => {
    const response = await request(server)
      .post("/person")
      .send({
        name: "Mark",
        age: 23,
        hobbies: ["guitar"],
      });

    id = response.body.id;

    expect(response.status).toBe(201);
    expect({
      id: response.body.id,
      name: response.body.name,
      age: response.body.age,
      hobbies: response.body.hobbies,
    }).toEqual({
      id,
      name: "Mark",
      age: 23,
      hobbies: ["guitar"],
    });
  });

  test("DELETE-request delete created entity by id(success code expected)", async () => {
    const response = await request(server).del(`/person/${id}`);

    expect(response.status).toBe(204);
  });

  test("DELETE-request second time (human friendly message expected)", async () => {
    const response = await request(server).del(`/person/${id}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`Sorry but no user with ${id} exist \n`);
  });
});
