const bodyParser = (req) => {
  try {
    return new Promise((res, rej) => {
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
  } catch (error) {
    throw error;
  }
};

module.exports = bodyParser;
