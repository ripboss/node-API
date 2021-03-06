const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is null'
    },
    author: {
        type: String,
        required: 'Author is null'
    },
    genres: {
        type: [String],
        //default: []
    },
    img: {
        contentType: String,
        data: Buffer,
        //default: {}
    }
});//.index({title:1, author:1}, {unique: true}); // deprecated
const book = mongoose.model('Book', BookSchema);
book.collection.createIndex({"title":1, "author":1}, {unique: true});

module.exports = book;