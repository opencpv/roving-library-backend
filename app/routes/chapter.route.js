module.exports = (app) => {
    const chapter = require("../controllers/chapter.controller");
  
    var router = require("express").Router();
  
    // Create a new chapter data
    router.post("/", chapter.create);
  
    // Get all chapters
    router.get("/", chapter.findAll);
  
    // Get all chapters of one book with id
    router.get("/:id", chapter.findOne);
  
  
    // Delete a chapter with id
    router.delete("/:id", chapter.delete);
  
    // Delete all chapters
    // router.delete("/", chapter.deleteAll);
  
    app.use("/api/chapters", router);
  };
  