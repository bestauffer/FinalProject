// start by creating data so we don't have to type it in each time
let beerArray = [];

// define a constructor to create beer objects
let BeerObject = function (pName, pLocation, pPrice, pDescription, pRating) {
    this.ID = beerArray.length;
    this.Name = pName;
    this.Location = [pLocation];
    this.Price = [pPrice];
    this.Description = [pDescription];  
    this.Rating = [pRating];    
}

let sessionID;
function Data(ID){
    sessionID = ID;
    document.getElementById("Location").innerHTML = beerArray[ID].Location;
    document.getElementById("Price").innerHTML = beerArray[ID].Price;
    document.getElementById("Description").innerHTML = beerArray[ID].Description;
    document.getElementById("Ratings").innerHTML = beerArray[ID].Rating;
    document.getElementById("Name").innerHTML = beerArray[ID].Name;
    document.getElementById("OtherName").innerHTML = beerArray[ID].Name;
}

beerArray.push(new BeerObject("Bud Light", "Albertsons", 10, "Bud Light is very refreshing on a hot day.", 3));
beerArray.push(new BeerObject("Rainier", "Safeway", 8, "Rainier is a classic beer that tastes amazing any day.", 4));
beerArray.push(new BeerObject("Irish Death", "Norm's", 12, "Irish Death has a chocolate flavor that is to die for!", 5));


document.addEventListener("DOMContentLoaded", function () { //Put button/event handlers in here
// page before show code *************************************************************************

    $(document).on("pagebeforeshow", "#BeerList", function (event) {   // have to use jQuery 
        createBeerList();
    });

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#PricesLocations", function (event) {   // have to use jQuery 
        createPricesLocationsList();
    });

    $(document).on("pagebeforeshow", "#DescriptionsRatings", function (event) {   // have to use jQuery 
        createDescriptionsRatingsList();
    });
 
// end of page before show code *************************************************************************

//button events start *******************************************************************************

//Button for adding a new beer
document.getElementById("buttonAddBeer").addEventListener("click", function () {
    //Note: Add a check that makes sure the text boxes were all filled out (and that the rating is 1-5)

    beerArray.push(new BeerObject(document.getElementById("newBeerName").value,
        document.getElementById("newBeerLocation").value,
        document.getElementById("newBeerPrice").value,
        document.getElementById("newBeerDescription").value,
        document.getElementById("newBeerRating").value)); //Adds new beer object

    createBeerList(); //Recreates the beer list so the new addition is immediately visible

    document.getElementById("newBeerName").value = "";
    document.getElementById("newBeerLocation").value = "";
    document.getElementById("newBeerPrice").value = "";
    document.getElementById("newBeerDescription").value = "";
    document.getElementById("newBeerRating").value = ""; //Wipes the input fields
});

//Button for adding another location and price to the currently selected beer
document.getElementById("buttonAddLocationsPrices").addEventListener("click", function () {
    //Note: Add a check that makes sure the text boxes were both filled out

    let localID = document.getElementById("IDparmHere").innerHTML;
    beerArray[localID].Location.push(document.getElementById("addLocation").value);
    beerArray[localID].Price.push(document.getElementById("addPrice").value); //Adds the new location/price values

    createPricesLocationsList();

    document.getElementById("addLocation").value = "";
    document.getElementById("addPrice").value = ""; //Wipes the input fields
});

//Button for adding another description and rating to the currently selected beer
document.getElementById("buttonAddDescriptionsRatings").addEventListener("click", function () {
    //Note: Add a check that makes sure the text boxes were both filled out

    let localID = document.getElementById("IDparmHere").innerHTML;
    beerArray[localID].Description.push(document.getElementById("addDescription").value);
    beerArray[localID].Rating.push(document.getElementById("addRating").value); //Adds the new description/rating values

    createDescriptionsRatingsList();

    document.getElementById("addDescription").value = "";
    document.getElementById("addRating").value = ""; //Wipes the input fields
});

//button events end *********************************************************************************

}); //DOMContentLoaded event end ********************************************************************



function createBeerList() {
// call the node server and it will return an array of beers


    // clear prior data
    let divBeerList = document.getElementById("divBeerList");
    while (divBeerList.firstChild) {    // remove any old data so don't get duplicates
        divBeerList.removeChild(divBeerList.firstChild);
    };

    let ul = document.createElement('ul');

    beerArray.forEach(function (element,) {   // use handy array forEach method
        let li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('oneBeer'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.ID);
        li.innerHTML = element.ID + ":  " + element.Name;
        ul.appendChild(li);
    });
    divBeerList.appendChild(ul)

    // now we have the HTML done to display our list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    let liArray = document.getElementsByClassName("oneBeer");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        let parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and write THIS ID value there
        document.getElementById("IDparmHere").innerHTML = parm;
        // now jump to our page that will use that one item
        document.location.href = "index.html#PricesLocations";
        });
    });

}

function createPricesLocationsList(){
    let localID = document.getElementById("IDparmHere").innerHTML;
    let currentBeer = beerArray[localID];

    // clear prior data
    let divLocationList = document.getElementById("divLocationList");
    while (divLocationList.firstChild) {    // remove any old data so don't get duplicates
        divLocationList.removeChild(divLocationList.firstChild);
    };

    let ul = document.createElement('ul');

    for(let i=0; i<currentBeer.Location.length; i++){
        let li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('locationList'); 
        li.innerHTML = currentBeer.Name + " can be found at " + currentBeer.Location[i] + " for $" + currentBeer.Price[i] + ".";
        ul.appendChild(li);
    }
    divLocationList.appendChild(ul)
}

function createDescriptionsRatingsList(){
    let localID = document.getElementById("IDparmHere").innerHTML;
    let currentBeer = beerArray[localID];

    // clear prior data
    let divReviewList = document.getElementById("divReviewList");
    while (divReviewList.firstChild) {    // remove any old data so don't get duplicates
        divReviewList.removeChild(divReviewList.firstChild);
    };

    let ul = document.createElement('ul');

    for(let i=0; i<currentBeer.Rating.length; i++){
        let li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('reviewList'); 
        li.innerHTML = "\"" + currentBeer.Description[i] + "\" - " + currentBeer.Rating[i] + "/5";
        ul.appendChild(li);
    }
    divReviewList.appendChild(ul)
}