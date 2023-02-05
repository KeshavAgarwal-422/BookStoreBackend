const express = require("express");

const router = express.Router();

const booksController = require("../controllers/books-controller");

router.get("/", booksController.getAllBooks);
router.post("/", booksController.addBook);
router.get("/:bookId", booksController.getById);
router.get("/user/:userId", booksController.getByUserId);
router.put("/:id", booksController.updateBooks);
router.delete("/:id", booksController.deleteBook);

module.exports = router;
