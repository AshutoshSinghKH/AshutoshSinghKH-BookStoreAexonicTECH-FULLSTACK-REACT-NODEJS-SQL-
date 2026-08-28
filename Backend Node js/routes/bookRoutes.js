const express = require("express");

const {
  getBooks,
  getBookById,
} = require("../controllers/bookController");

const router = express.Router();


// GET all books
router.get("/", getBooks);


// GET single book
router.get("/:id", getBookById);


module.exports = router;