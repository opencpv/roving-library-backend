module.exports = (app) => {
    const author = require("../controllers/author.controller");
  
    var router = require("express").Router();
  
    // get all authors in database
    router.get("/", author.findAll);
  
  
    app.use("/api/authors", router);
  };