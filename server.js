const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, (_, res) => res.sendFile(__dirname + "/dist/index.html"));

app.listen(PORT, () =>
  console.log(`Client is running at http://localhost:${PORT}/`)
);
