const server = require("../index");
const request = require("supertest");

describe("Scenarios", () => {
  let id;

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

    test("GET-request receive created entity by it id (created entity expected)", async () => {
      const response = await request(server).get(`/person/${id}`);

      expect(response.status).toBe(200);
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

    test("PUT-request update created entity (updated entity expected)", async () => {
      const response = await request(server)
        .put(`/person/${id}`)
        .send({
          hobbies: ["guitar", "sport"],
        });

      expect(response.status).toBe(200);
      expect({
        id: response.body.id,
        name: response.body.name,
        age: response.body.age,
        hobbies: response.body.hobbies,
      }).toEqual({
        id,
        name: "Mark",
        age: 23,
        hobbies: ["guitar", "sport"],
      });
    });

    test("DELETE-request delete created entity by id(success code expected)", async () => {
      const response = await request(server).del(`/person/${id}`);

      expect(response.status).toBe(204);
    });

    test("GET-request try to get deleted entity by id (no-such-entity-exist message expected)", async () => {
      const response = await request(server).get(`/person/${id}`);

      expect(response.status).toBe(404);
      expect(response.text).toEqual(`Sorry but no user with ${id} exist \n`);
    });
  });
});
