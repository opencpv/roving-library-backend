const db = require("../models/");
Category = db.category;

function initialCategories() {
  Category.create({
    CategoryTitle: "Action",
    CategoryImg: "http://localhost:5000/category_img/action.jpg",
  });
  Category.create({
    CategoryTitle: "Biography",
    CategoryImg: "http://localhost:5000/category_img/biography.jpg",
  });
  Category.create({
    CategoryTitle: "Classics",
    CategoryImg: "http://localhost:5000/category_img/classics.jpg",
  });
  Category.create({
    CategoryTitle: "Computers",
    CategoryImg: "http://localhost:5000/category_img/computers.jpg",
  });
  Category.create({
    CategoryTitle: "Criticism",
    CategoryImg: "http://localhost:5000/category_img/criticism.jpg",
  });
  Category.create({
    CategoryTitle: "Drama",
    CategoryImg: "http://localhost:5000/category_img/drama.jpg",
  });
  Category.create({
    CategoryTitle: "Educational",
    CategoryImg: "http://localhost:5000/category_img/educational.jpg",
  });
  Category.create({
    CategoryTitle: "Espionage",
    CategoryImg: "http://localhost:5000/category_img/espionage.jpg",
  });
  Category.create({
    CategoryTitle: "Etiquette",
    CategoryImg: "http://localhost:5000/category_img/etiquette.jpg",
  });
  Category.create({
    CategoryTitle: "Fantasy",
    CategoryImg: "http://localhost:5000/category_img/fantasy.jpg",
  });
  Category.create({
    CategoryTitle: "Fiction",
    CategoryImg: "http://localhost:5000/category_img/fiction.jpg",
  });
  Category.create({
    CategoryTitle: "History",
    CategoryImg: "http://localhost:5000/category_img/history.jpg",
  });
  Category.create({
    CategoryTitle: "Humour",
    CategoryImg: "http://localhost:5000/category_img/humour.jpg",
  });
  Category.create({
    CategoryTitle: "Mystery",
    CategoryImg: "http://localhost:5000/category_img/mystery.jpg",
  });
  Category.create({
    CategoryTitle: "Myth",
    CategoryImg: "http://localhost:5000/category_img/myth.jpg",
  });
  Category.create({
    CategoryTitle: "Nature",
    CategoryImg: "http://localhost:5000/category_img/nature.jpg",
  });
  Category.create({
    CategoryTitle: "Poetry",
    CategoryImg: "http://localhost:5000/category_img/poetry.jpg",
  });
  Category.create({
    CategoryTitle: "Politics",
    CategoryImg: "http://localhost:5000/category_img/politics.jpg",
  });
  Category.create({
    CategoryTitle: "Psycology",
    CategoryImg: "http://localhost:5000/category_img/psycology.jpg",
  });
  Category.create({
    CategoryTitle: "Religion",
    CategoryImg: "http://localhost:5000/category_img/religion.jpg",
  });
  Category.create({
    CategoryTitle: "Sicence Fiction",
    CategoryImg: "http://localhost:5000/category_img/science-fiction.jpg",
  });
  Category.create({
    CategoryTitle: "Short Story",
    CategoryImg: "http://localhost:5000/category_img/short-story.jpg",
  });
  Category.create({
    CategoryTitle: "STEM",
    CategoryImg: "http://localhost:5000/category_img/stem.jpg",
  });
  Category.create({
    CategoryTitle: "Thriller",
    CategoryImg: "http://localhost:5000/category_img/thriller.jpg",
  });
}

module.exports = initialCategories;
