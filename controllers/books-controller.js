const { default: mongoose } = require("mongoose");
const Book = require("../model/Book");
const User = require("../model/User");

const getAllBooks = async (req, res, next) => {
  let books;

  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }
  if (!books) {
    return res.status(404).json({ message: "No Books found" });
  }

  return res.status(201).json({ books });
};

const addBook = async (req, res, next) => {
  const { name, author, description, price, available, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
    console.log(existingUser.email);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "No user found" });
  }

  const book = new Book({
    name: name,
    author: author,
    description: description,
    price: price,
    available: available,
    image: image,
    user: user,
  });
  try {
    book.save();
    existingUser.books.push(book);
    await existingUser.save();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  return res.status(201).json({ book });
};

const getById = async (req, res, next) => {
  let book;
  const id = req.params.bookId;

  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Cannot find the specified book" });
  }

  return res.status(201).json({ book });
};

const getByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  let books;

  try {
    user = await User.findById(userId);
    books = user.books;
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(400).json({ message: "No books found" });
  }
  console.log(books);
  return res.status(201).json({ books });
};

const updateBooks = async (req, res, next) => {
  let book;
  const id = req.params.id;
  const { name, author, description, price, available, image } = req.body;

  try {
    book = await Book.findByIdAndUpdate(id, {
      name: name,
      author: author,
      description: description,
      price: price,
      available: available,
      image: image,
    });

    book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res
      .status(404)
      .json({ message: "Could not update book by this ID" });
  }

  return res.status(200).json({ book });
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id).populate("user");
    await book.user.books.pull(book);
    await book.user.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(404).json({ message: "Unable to delete by this Id" });
  }
  return res.status(200).json({ message: "Book sucessfully deleted" });
};

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.getByUserId = getByUserId;
exports.updateBooks = updateBooks;
exports.deleteBook = deleteBook;
