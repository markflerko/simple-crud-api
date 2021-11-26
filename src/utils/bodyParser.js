const bodyParser = (req) =>
  new Promise((res, rej) => {
    let chunks = "";

    req.on("error", (err) => {
      console.error("error happened while body parsing", err);
      rej();
    });

    req.on("data", (chunk) => {
      chunks += chunk;
    });

    req.on("end", () => {
      req.body = JSON.parse(chunks);
      res();
    });
  });


module.exports = bodyParser;