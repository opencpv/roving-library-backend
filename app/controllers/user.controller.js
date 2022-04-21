const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
dotenv.config();
const db = require("../models");
const User = db.user;

const Op = db.Sequelize.Op;

// Create and save a new book
exports.register = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "content cannot be empty",
    });
  } else {
    const emailExists = await User.findOne({
      where: { Email: req.body.Email },
    });
    const userNameExists = await User.findOne({
      where: { Username: req.body.Username },
    });

    if (emailExists) {
      res.status(200).send({
        message: "Email already registered. Please Login",
      });
    } else if (userNameExists) {
      res.status(200).send({
        message: "User Already Exist. Please Login",
      });
    } else {
      var salt = await bcrypt.genSaltSync(10);
      var myPlaintextPassword = req.body.Password;
      var hash = await bcrypt.hashSync(myPlaintextPassword, salt);
      const user = {
        Username: req.body.Username,
        Email: req.body.Email.toLowerCase(),
        Password: hash,
        DateOfBirth: req.body.DateOfBirth,
      };
      // Save a book in the database
      const newUser = await User.create(user).catch((err) => {
        console.log(err.message);
      });
      // Create token
      const token = jwt.sign(
        { user_id: newUser.id, email: newUser.Email },
        "ww[R/o[w;&1IAAP",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      newUser.token = token;
      // console.log(newUser)
      res.status(200).send({ message: "account registered", body: newUser });
    }
  }
};

// Retreive all users from database
exports.login = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "content cannot be empty",
    });
  } else {
    const myPlaintextPassword = req.body.Password;
    const user = await User.findOne({
      where: { Email: req.body.Email.toLowerCase() },
    });

    if (!user) {
      res.status(400).send({
        message: "Email not registered. Please register",
      });
    } else {
      var Password = user.Password;
      console.log(Password);
      console.log(myPlaintextPassword);

      bcrypt.compare(myPlaintextPassword, Password).then((check) => {
        console.log(check);
        console.log(user)
        if (user && check) {
          // Create token
          const token = jwt.sign(
            { user_id: user.id, email: user.Email },
            "ww[R/o[w;&1IAAP",
            {
              expiresIn: "2h",
            }
          );

          // save user token
          user.token = token;

          // user
          res.status(200).json(user);
        } else {
          res.status(200).send({ message: "Invalid Credentials" });
        }
      });
    }

   
  }
};
