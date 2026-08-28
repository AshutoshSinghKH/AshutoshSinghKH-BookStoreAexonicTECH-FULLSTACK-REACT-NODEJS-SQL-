const pool = require("../config/db");


// Get all books
const getBooks = async (req, res) => {

  try {

    const [books] = await pool.query(
      "SELECT * FROM books ORDER BY id DESC"
    );

    res.status(200).json(books);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch books",
    });

  }
};


// Get single book
const getBookById = async (req, res) => {

  try {

    const { id } = req.params;

    const [books] = await pool.query(
      "SELECT * FROM books WHERE id = ?",
      [id]
    );

    if (books.length === 0) {

      return res.status(404).json({
        message: "Book not found",
      });

    }

    res.status(200).json(books[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch book",
    });

  }
};


module.exports = {
  getBooks,
  getBookById,
};