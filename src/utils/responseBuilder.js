const responseBuilder = ({ res, code, body = "", message = "" }) => {
  try {
    if (Boolean(body)) {
      res.writeHead(code, { "Content-Type": "application/json" });
      res.write(JSON.stringify(body));
    } else {
      res.statusCode = code;
    }

    if (Boolean(message)) {
      res.write(message);
    }

    res.end();
  } catch (error) {
    throw error;
  }
};

module.exports = responseBuilder;
