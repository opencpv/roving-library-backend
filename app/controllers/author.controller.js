const db = require("../models");
const Book = db.book;

exports.findAll = (req,res)=>{
    Book.findAll({attributes:['Author']}).then((data)=>{
      res.status(200).send(data)
    })
    .catch((err)=>{
        res.status(500).send({
            message: err.message || "Some error occurred while fetching all authors.",
          });
    })
  }