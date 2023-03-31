//Here, the routes used by REST API are going to be defined
//First, need to connect to the database
//Routes allow to use the URL which contains peices of information (kind of act as params passed into Controller methods of MVC Apps) to query the db
//The schema Book that was created under model folder gives us functions like 'create' and 'find' that we can use in this file
const express = require('express');
const { set } = require('mongoose');
const app = express();
const bookRoute = express.Router();
let Book  = require('../model/Book'); //what is the use of express

//req represents the request, res represents the response
//in Node, there is a request-response cycle- it starts with making a http request for a particular resource
//and ends when you send a response back to the user 
//next passes control to the next function (in the middleware stack)
//e.g.
// app.get('/hello', function (req, res, next) {
//     // Your piece of logic
//     next();
//   });

//   app.get('/hello', function (req, res, next) {
//     res.send("Hello !!!!");
//   });

//Here, the first function executes some logic, and next() causes the control to be passed to the next function, which in this case would send 'Hello!!!' back to the user

//next is being used below for error handling, it is Express's way of throwing an error 

bookRoute.route('/add-book').post((req, res, next) => { //How come different params are being passed for each function

    Book.create(req.body).then((res) => {
        res.send(req.body)
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
    
});

//Get all the books stored in the db
bookRoute.route('/').get((req,res) => {
    Book.find().then((data) => {
        res.send(data);
    })
    .catch((err) => { //just added 
        console.log(err);
        res.send(err);
    })
});

//Get book by ID
bookRoute.route('/read-book/:id').get((req, res) => {
    Book.findById(req.params.id).then((data) => {
        res.send(data);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
})

//Update bookstore
bookRoute.route('/update-book/:id').put((req,res) => {
    Book.findByIdAndUpdate(req.params.id, req.body).then((data) => {
        res.send(data);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
})

bookRoute.route('/delete-book/:id').delete((req,res,next) => {
    Book.findByIdAndDelete(req.params.id).then((data) => {
        res.status(200).send({msg:data});
    })
    .catch((err) => {
        res.send(data);
    })
})


module.exports = bookRoute;