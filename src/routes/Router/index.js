const emitter = require("../../utils/eventEmitter");
const postPerson = require("../../controllers/postPerson");
const getPerson = require("../../controllers/getPerson");
const delPerson = require("../../controllers/delPerson");
const putPerson = require("../../controllers/putPerson");

class Router {
  constructor() {
    this.endpoints = {};
  }

  request(method = "GET", path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error(`method ${method} on route ${path} is already exist`);
    }
    endpoint[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (req, res) => {
      handler(req, res);
    });
  }

  get(path, handler) {
    this.request("GET", path, handler);
  }

  post(path, handler) {
    this.request("POST", path, handler);
  }

  put(path, handler) {
    this.request("PUT", path, handler);
  }

  delete(path, handler) {
    this.request("DELETE", path, handler);
  }
}

const router = new Router();

router.post("person", async (req, res) => {
  await postPerson(req, res);
});

router.get("person", async (req, res) => {
  await getPerson(req, res);
});

router.put("person", async (req, res) => {
  await putPerson(req, res);
});

router.delete("person", async (req, res) => {
  await delPerson(req, res);
});

module.exports = router;
