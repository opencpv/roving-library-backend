 module.exports = (app) => {
    const book = require("../controllers/book.controller");
  
    var router = require("express").Router();
  
    // Create a new book
    router.post("/", book.create);
  
    // Get all books
    router.get("/", book.findAll);
  
    // Get a single Book with id
    router.get("/:id", book.findOne);
    
    // Update a Book with id
    router.put("/:id", book.update);
  
    // Delete a Book with id
    router.delete("/:id", book.delete);
  
    // Delete all Books
    router.delete("/", book.deleteAll);
  
    app.use("/api/books", router);
  };