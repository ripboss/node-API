const fs = require('fs');
const Book = require('../models/bookModel');


const getBooks = (req, res) => 
{
    const books = Book.find( (err, result) =>
    {
        res.set('Access-Control-Allow-Origin', '*');
        if (err)
            return res.status(400).send(err.message);
        
        console.log(`Found ${result.length} entrie(s)`);
        res.status(200).json(result);
    });
};

const createBook = (req, res) =>
{
    const book = new Book(req.body);
    if (req.file){
        book.img.contentType = req.file.mimetype;
        book.img.data = Buffer.from(req.file.buffer).toString('base64'); // e 7bit?
    }

    book.save( (err, result) =>
    {
        res.set('Access-Control-Allow-Origin', '*');
        if (err) //result undefined
            return res.status(400).send(err.message);
        
        //console.log(result);
        res.status(200).json(result);
    });
}

const getBooksById = (req, res) =>
{
    const book = Book.find({_id: req.params.id} , (err, result) =>
    {
        if (err)
            return res.status(err.status);
        
        if (result[0].img)
            buffer = result[0].img.data;
        if (buffer)
            fs.writeFileSync(`files/${result[0]._id}`, buffer.toString(), 'base64'); //sync request
            //console.log(buffer.toString('base64'));
        res.status(200).json(result);
    });
}

//search...
const getBooksByQuery = (req, res) =>
{
    Book.find({title: req.query.title, author: req.query.author}, (err, result) =>
    {
        
        if (err)
            return res.status(err.status);
        
            
        console.log(`Found ${result.length} entrie(s)`);
        res.status(200).json(result);
    });
}

const getBookById = (req, res) =>
{
    const book = Book.find({_id: req.query.id} , (err, result) =>
    {
        if (err) //result undefined
            return res.set('Access-Control-Allow-Origin', '*').status(400).json(err.message);
        
        if (result.length == 0)
            return res.set('Access-Control-Allow-Origin', '*').status(404).json(result);
        
        if (result[0].img.data) {
            buffer = result[0].img.data;
            //async request:
            fs.writeFile(`files/${result[0]._id}`, buffer.toString(), 'base64',
            () => console.log('(image downloaded)'));
        }
        res.set('Access-Control-Allow-Origin', '*').status(200).json(result);
    });
};

const editBook = (req, res) =>
{
    const query = {_id: req.body.id}; //console.log(req.file);
    var update;
    if (req.file)
        update = {title: req.body.title, author: req.body.author, img: { contentType: req.file.mimetype, data: Buffer.from(req.file.buffer).toString('base64')}};
    else
        update = {title: req.body.title, author: req.body.author};
    res.set('Access-Control-Allow-Origin', '*');
    Book.updateOne( query, update, (err, result) =>
    {
        if (err)
            return res.status(400).json(err.message);

        res.status(200).json(result);
    });
};

const optionsRequest = (req, res) =>
{
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, HEAD, PUT');
    res.status(200).send('HEAD ok');
};

module.exports = { getBooks, createBook, getBooksById, getBookByQuery: getBooksByQuery, getBookById, editBook, optionsRequest }