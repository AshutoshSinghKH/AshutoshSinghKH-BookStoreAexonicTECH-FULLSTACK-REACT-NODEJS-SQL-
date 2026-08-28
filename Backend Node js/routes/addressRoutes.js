const express = require("express");

const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET all addresses
router.get(
  "/",
  authMiddleware,
  getAddresses
);


// ADD address
router.post(
  "/",
  authMiddleware,
  addAddress
);


// UPDATE address
router.put(
  "/:id",
  authMiddleware,
  updateAddress
);


// DELETE address
router.delete(
  "/:id",
  authMiddleware,
  deleteAddress
);


module.exports = router;