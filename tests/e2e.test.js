const server = require("../index");
const request = require("supertest");

describe("Scenarios", () => {
  describe("1.", () => {
    test("GET-request receive all entities (empty object expected)", async () => {
      const response = await request(server).get("/person");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });

    test("POST-request create new entity (expect response with new entity)", async () => {
      const response = await request(server)
        .post("/person")
        .send({
          name: "Mark",
          age: 23,
          hobbies: ["guitar"],
        });

      expect(response.status).toBe(201);
      expect({
        name: response.body.name,
        age: response.body.age,
        hobbies: response.body.hobbies,
      }).toEqual({
        name: "Mark",
        age: 23,
        hobbies: ["guitar"],
      });
    });
  });
});
