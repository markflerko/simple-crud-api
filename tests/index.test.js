const server = require("../index");
const request = require("supertest");

test("yolo", async () => {
  const response = await request(server).get("/person");

  expect(response.status).toBe(200);
});
