const server = require("../index");
const request = require("supertest");

let id;
let updatedEntity = {};

describe("2. Create few entities, update last and see it in all entities", () => {
  //Create few entities
  test("Create few entities", async () => {
    let requests = [];
    for (let i = 0; i < 5; i++) {
      requests.push(
        request(server)
          .post("/person")
          .send({
            name: `Mark`,
            age: 23,
            hobbies: ["guitar"],
          })
      );
    }

    const persons = await Promise.all(requests);
    const person = persons[0].body;
    id = person.id;

    expect(person).toEqual({
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

    updatedEntity = response.body;

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

  test("GET-request receive all entities (empty object expected)", async () => {
    const response = await request(server).get("/person");

    expect(response.status).toBe(200);
    expect(response.body[id]).toEqual(updatedEntity);
  });
});
