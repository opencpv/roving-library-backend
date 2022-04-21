const { compareSync } = require("bcryptjs");
const dotenv = require("dotenv");
const generateSlug = require("../../helper/sluggenerate");
dotenv.config();
const db = require("../models");
const Book = db.book;
const Category = db.category;
const Author = db.author;

const Op = db.Sequelize.Op;

// Create and save a new book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "content cannot be empty",
    });
  } else {
    let Title = req.body.Title;

    let filename = `${generateSlug(Title)}.jpg`;
    let file_url = `http://localhost:${process.env.PORT}/book_covers/${filename}`;
    // Create a book object from req.body
    const book = {
      Title: req.body.Title,
      Author: req.body.Author,
      Difficulty: req.body.Difficulty,
      Synopsis: req.body.Synopsis,
      PublishedYear: req.body.PublishedYear,
      ImgUrl: file_url,
      BookXp: req.body.BookXp,
    };

    const categories = req.body.Categories.replace("'", "").split(",");
    console.log(categories);
    // Save a book in the database
    const newBook = await Book.create(book);
    if (newBook) {
      let file = req.files.file;
      if (file) {
        file.mv("public/book_covers/" + filename);
      }

      categories.forEach(async (element) => {
        const category = await Category.findOne({
          where: { CategoryTitle: element },
        });

        await newBook.setCategories(category);
      });

      // await newBook.setAuthors(book.Author)

      res.status(200).send(newBook);
    } else {
      console.log({ message: "error" });
    }
    //   .then((data) => {
    //     res.status(200).send(data);
    //   })
    //   .then(() => {
    //
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }
};

// Retreive all books from database
exports.findAll = (req, res) => {
  const title = req.query.Title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Book.findAll({
    where: condition,
    include: [
      {
        model: Category,
        as: "categories",
        attributes: ["id", "CategoryTitle"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured when retreiving data",
      });
    });
};

// Retreive one book from the database
exports.findOne = (req, res) => {
  const id = req.params.id;

  Book.findByPk(id, {
    include: [
      {
        model: Category,
        as: "categories",
        attributes: ["id", "CategoryTitle"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.set("Access-Control-Allow-Origin", "*");
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Book with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Book with id=" + id,
      });
    });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Book.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Book was updated successfully.",
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

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.destroy({
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

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
  Book.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Book were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all books.",
      });
    });
};


