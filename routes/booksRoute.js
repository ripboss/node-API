const booksController = require('../controllers/booksController');
const express = require('express');
const multer  = require('multer');

//Middleware
const router = express.Router();
var upload = multer();

router.get('/books', booksController.getBooks);
router.post('/books', upload.single('myfile') , booksController.createBook);
//router.get('/books/book/:id', booksController.getBooksById);
router.get('/books/book', booksController.getBookById);
//router.put('/books/book', upload.single('myfile'), booksController.editBook);
router.options('/books/book', booksController.optionsRequest);
router.put('/books/book', upload.single('myfile'), booksController.editBook);

module.exports = router;