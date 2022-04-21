const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const db = require("./app/models");
const dotenv = require("dotenv");
const auth = require("./middleware/auth");
const initialCategories = require("./app/migrations/category.migrations");
dotenv.config();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(fileUpload()); // middleware for aiding file upload
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add Access Control Allow Origin headers to allow cross origin API access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/dictionary/:param", (req, res) => {
  let value = req.params.param;
  let rawDicitionary = fs.readFileSync(`./dictionary/${value[0]}.json`);
  let dictionaryJson = JSON.parse(rawDicitionary);
  res.send(dictionaryJson[value]);
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome 🙌 Welcome 🙌 ");
});
app.get("/dashboard", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 Welcome 🙌 ");
});

// db.sequelize.sync();
//drop table if it already extist
db.sequelize.sync({ force: true }).then(() => {
  initialCategories();
});

require("./app/routes/user.route")(app);
require("./app/routes/category.route")(app);
require("./app/routes/book.route")(app);
require("./app/routes/chapter.route")(app);
require("./app/routes/author.route")(app);

// require("./app/routes/book_category.route")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
