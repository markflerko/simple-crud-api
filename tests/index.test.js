const { createServer } = require("http");
const request = require("supertest");

const server = createServer((_, response) => {
  response.end("yolo");
});

test("yolo", async () => {
  const response = await request(server).get("/");

  expect(response.status).toBe(200);
  expect(response.text).toBe("yolo");
});
