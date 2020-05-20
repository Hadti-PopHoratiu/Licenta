const express = require("express");
const path = require("path");

global.app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

require("./config/cors.config");
require("./config/db.config");
require("./routes/routes");

app.listen(4201, "0.0.0.0", () => {
  console.log("connecting to port 4201");
});
