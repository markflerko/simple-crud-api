const responseBuilder = ({ res, code, body = "" }) => {
  res.writeHead(code, { "Content-Type": "application/json" });
  if (Boolean(body)) {
    res.write(JSON.stringify(body));
  }
  res.end();
};

module.exports = responseBuilder;
