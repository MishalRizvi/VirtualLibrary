//Contains the connection code

//imports:
let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
mongoDb = require('./database/db');

mongoose.Promise = global.Promise;

mongoose.connect(mongoDb.db, { //default created database is called 'db' with mongoDb 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected.")
   },
   error => {
    console.log("Database error: " + error)
}
)

//Create port and server:
const bookRoute = require('./node-backend/routes/books.routes');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());
//Create static path
app.use(express.static(path.join(__dirname, 'dist/Bookstore')));
//API Root
app.use('/api', bookRoute);
//Create PORT
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log("listening on port: " + port)
});

app.use((req,res,next) => {
    next(createError(404))
});

app.get('/', (req,res) => {
    res.send("Invalid endpoint")
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'))
});

app.use(function(err,req,res,next) {
    console.log(err.message)
    if (!err.statusCode) {
        err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    }
})