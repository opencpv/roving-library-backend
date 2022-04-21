 module.exports = (app) => {
    const category = require("../controllers/category.controller");
  
    var router = require("express").Router();
  
    // Create a new book
    router.post("/", category.create);
  
    // Get all books
    router.get("/", category.findAll);
  
    // Get a single Book with id
    router.get("/:id", category.findById);
  
  
    // Delete a Book with id
    router.delete("/:id", category.delete);
  
    // Delete all Books
    router.delete("/", category.deleteAll);
  
    app.use("/api/categories", router);
  };
  