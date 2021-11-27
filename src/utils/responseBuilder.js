const responseBuilder = ({ res, code, body = "", message = "" }) => {
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
};

module.exports = responseBuilder;
