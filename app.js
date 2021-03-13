var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// start by creating data so we don't have to type it in each time
let serverMovieArray = [];

// define a constructor to create movie objects
let MovieObject = function (pTitle, pYear, pGenre, pMan, pWoman, pURL) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.Title = pTitle;
    this.Year = pYear;
    this.Genre = pGenre;  // action  comedy  drama  horrow scifi  musical  western
    this.Man = pMan;
    this.Woman = pWoman;
    this.URL = pURL;
}


serverMovieArray.push(new MovieObject("MoonstruckXXXX", 1981, "Drama", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
serverMovieArray.push(new MovieObject("Wild At Heart", 1982, "Drama", "Nicholas Cage", "Laura VanDern", "https://www.youtube.com/watch?v=7uRJartX79Q"));
serverMovieArray.push(new MovieObject("Raising Arizona", 1983, "Comedy", "Nicholas Cage", "Holly Hunter", "https://www.youtube.com/watch?v=NoXJKArYi1g"));
serverMovieArray.push(new MovieObject("USS Indianapolis: Men of Courage", 2016, "Drama", "Nicholas Cage", "Emily Tennant", "https://youtu.be/ZDPE-NronKk"));
serverMovieArray.push(new MovieObject("Venusstruck", 1983, "Drama", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
serverMovieArray.push(new MovieObject("Marsstruck", 1984, "Comedy", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
serverMovieArray.push(new MovieObject("Jupiterstruck", 1985, "Drama", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
serverMovieArray.push(new MovieObject("Saturnstruck", 1986, "Comedy", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));



// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page 

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


/* GET movieList. */
app.get('/movieList', function(req, res) {
    res.json(serverMovieArray);
});



/* POST to addMovie */
app.post('/addMovie', function(req, res) {
    console.log(req.body);
    serverMovieArray.push(req.body);
    // set the res(ponse) object's status propery to a 200 code, which means success
    res.status(200).send(JSON.stringify('success'));
  });


app.delete('/deleteMovie/:id', (req, res) => {
    let id = req.params.id;
    for (var i = 0; i < serverMovieArray.length; i++) {
        if (serverMovieArray[i].ID === id) {
            serverMovieArray.splice(i, 1);  // remove 1 element at loc i
            res.send('success');
        }
    }
    res.status(404);  // if not found
});

app.put('/modifyMovie/:id', (req, res) => {
    let id = req.params.id;
    let movieObject = req.body;
    console.log(id);
    console.log(movieObject);
    for (var i = 0; i < serverMovieArray.length; i++) {
        if (serverMovieArray[i].ID == id) {
            serverMovieArray[i] = movieObject;  // remove 1 element at loc i
            res.send('success');
        }
    }
    res.status(404);  // if not found
});



// error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let errorObject ={
        status: "this is real bad",
        stack: "somebody called #$% somebody who called somebody <awful>"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: errorObject
    });
});



app.listen(3000);  // not setting port number in www.bin, simple to do here
console.log('3000 is the magic port');

module.exports = app;
