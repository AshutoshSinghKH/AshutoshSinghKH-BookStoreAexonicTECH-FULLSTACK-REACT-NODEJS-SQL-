const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    // Check existing user
    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // Insert user
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES (?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
      ]
    );


    res.status(201).json({
      message: "Registration successful",
      userId: result.insertId,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Registration failed",
    });

  }
};



// LOGIN
const login = async (req, res) => {

  try {

    const { email, password } = req.body;


    if (!email || !password) {

      return res.status(400).json({
        message: "Email and password are required",
      });

    }


    // Find user
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );


    if (users.length === 0) {

      return res.status(401).json({
        message: "Invalid email or password",
      });

    }


    const user = users[0];


    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid email or password",
      });

    }


    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );


    res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });

  }
};


module.exports = {
  register,
  login,
};