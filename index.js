const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan'); //middleware
//const bodyParser = require('body-parser'); //middleware
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const myMiddleware = (req, res, next) => 
{
   console.log('In the middle');
   next();
}
//app.get("/about", myMiddleware, postRoutes.getPosts);

//My Middleware
const homeRouter = require('./routes/libraryRoute');
const booksRouter = require('./routes/booksRoute');


app.use(morgan('tiny')); //morgan(':method :url :status :res[content-length] - :response-time ms');
//app.use(bodyParser.json()); //mongoose.set();
//app.use(express.json());
app.use("/", homeRouter, booksRouter);


app.listen(port, () => console.log(`NodeJS API listening on port ${port}`));

//database
mongoose
   .connect(process.env.MONGO_URI, { autoIndex: true, useNewUrlParser: true, useUnifiedTopology: true, })
   .then(() => console.log('DB connected'), (error) => console.error(`Connection error: ${error.message}`));
