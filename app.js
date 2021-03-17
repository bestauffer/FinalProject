var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

// start by creating data so we don't have to type it in each time
let serverBeerArray = [];

// define a constructor to create movie objects
let BeerObject = function (pName, pLocation, pPrice, pDescription, pRating) {
    this.ID = serverBeerArray.length;
    this.Name = pName;
    this.Location = [pLocation];
    this.Price = [pPrice];
    this.Description = [pDescription];  
    this.Rating = [pRating];    
}

serverBeerArray.push(new BeerObject("Bud Light", "Albertsons", 10, "Bud Light is very refreshing on a hot day.", 3));
serverBeerArray.push(new BeerObject("Rainier", "Safeway", 8, "Rainier is a classic beer that tastes amazing any day.", 4));
serverBeerArray.push(new BeerObject("Irish Death", "Norm's", 12, "Irish Death has a chocolate flavor that is to die for!", 5));



// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page 

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


/* GET movieList. */
app.get('/beerList', function(req, res) {
    res.json(serverBeerArray);
});



/* POST to addMovie */
app.post('/addBeer', function(req, res) {
    console.log(req.body);
    serverBeerArray.push(req.body);
    // set the res(ponse) object's status propery to a 200 code, which means success
    res.status(200).send(JSON.stringify('success'));
  });


app.delete('/deleteBeer/:id', (req, res) => {
    let id = req.params.id;
    for (var i = 0; i < serverBeerArray.length; i++) {
        if (serverBeerArray[i].ID === id) {
            serverBeerArray.splice(i, 1);  // remove 1 element at loc i
            res.send('success');
        }
    }
    res.status(404);  // if not found
});

app.put('/modifyBeer/:id', (req, res) => {
    let id = req.params.id;
    let beerObject = req.body;
    console.log(id);
    console.log(beerObject);
    for (var i = 0; i < serverBeerArray.length; i++) {
        if (serverBeerArray[i].ID == id) {
            serverBeerArray[i] = beerObject;  // remove 1 element at loc i
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



let port= process.env.PORT || 3000;
app.listen(port);  // not setting port number in www.bin, simple to do here
console.log('3000 is the magic port');

module.exports = app;
