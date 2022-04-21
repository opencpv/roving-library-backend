const dotenv = require("dotenv");
const generateSlug = require("../../helper/sluggenerate");
dotenv.config();
const db = require("../models");
const Category = db.category;
const Book = db.book;
const Op = db.Sequelize.Op;

// Create and save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "content cannot be empty",
    });
  } else {
    // Create a category object from req.body
    const category = {
      category_name: req.body.category_name,
      category_img: file_url,
    };

    // Save a book in the database
    Category.create(category)
      .then((data) => {
        res.status(200).send(data);
      })
      .then(() => {
        let file = req.files.file;
        file.mv("public/category_img/" + filename);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};

// Retreive all categories from category table
exports.findAll = (req, res) => {
  const title = req.query.category_name;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Category.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured when retreiving data",
      });
    });
};

// Retreive one category from the category table
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id, {
    include: [
      {
        model: Book,
        attributes: ["id", "title", "author", "img"],
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

// Update a category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, {
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

// Delete a category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({
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
  Category.destroy({
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

exports.findById = (req, res) => {
  const id = req.params.id;
  Category.findByPk(id, {
    include: Book,
  })
    .then((category) => {
      res.send(category) ;
    })
    .catch((err) => {
      console.log(">> Error while finding Category: ", err);
    });
};

exports.addBook = (categoryId, bookId) => {
  return Category.findByPk(categoryId)
    .then((Category) => {
      if (!Category) {
        console.log("Category not found!");
        return null;
      }
      return Book.findByPk(bookId).then((Book) => {
        if (!Book) {
          console.log("Book not found!");
          return null;
        }
        Category.addBook(Book);
        console.log(
          `>> added Book id=${Book.id} to Category id=${Category.id}`
        );
        return Category;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Book to Category: ", err);
    });
};
