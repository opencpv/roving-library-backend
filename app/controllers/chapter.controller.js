const dotenv = require("dotenv");
dotenv.config();
const db = require("../models");
const generateSlug = require("../../helper/sluggenerate");
const Chapter = db.chapter;
const Op = db.Sequelize.Op;

// Create and save a new chapter
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "content cannot be empty",
    });
  } else {

    let ChapterTitle = req.body.ChapterTitle;
    let filename = `${generateSlug(ChapterTitle)}.jpg`;
    let file_url = `http://localhost:${process.env.PORT}/book_images/${filename}`;

    // Create a chapter object from req.body
    const chapter = {
      ChapterTitle: req.body.ChapterTitle,
      Content: req.body.Content,
      ChapterXp: req.body.ChapterXp,
      ImgUrl: file_url,
      ImgCaption: req.body.ImgCaption,
      bookId: req.body.bookId,
    };

    // Save a chapter in the database
    Chapter.create(chapter)
      .then((data) => {
        res.status(200).send(data);
      })
      .then(() => {
        let file = req.files.file;
        if (file) {
          file.mv("public/book_images/" + filename);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};

// Retreive all chapters from chapter table
exports.findAll = (req, res) => {
  const title = req.query.category_name;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Chapter.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured when retreiving data",
      });
    });
};

// Retreive all chapters of a specific book
exports.findOne = (req, res) => {
  const id = req.params.id;

  Chapter.findAll({ where: { bookId: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured when retreiving data",
      });
    });
};

// Update a chapter by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Chapter.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Book chapter was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating BookDetails with id=" + id,
      });
    });
};

// Delete a chapter with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Chapter.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Book was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete BookDetails with id=" + id,
      });
    });
};
