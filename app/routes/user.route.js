 module.exports = (app) => {
    const user = require("../controllers/user.controller");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/register", user.register);
  
    // Get all books
    router.post("/login", user.login);
  
  
    app.use("/api/", router);
  };