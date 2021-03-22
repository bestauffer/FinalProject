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

//beerArray.push(new BeerObject("Bud Light", "Albertsons", 10, "Bud Light is very refreshing on a hot day.", 3));
//beerArray.push(new BeerObject("Rainier", "Safeway", 8, "Rainier is a classic beer that tastes amazing any day.", 4));
//beerArray.push(new BeerObject("Irish Death", "Norm's", 12, "Irish Death has a chocolate flavor that is to die for!", 5));


document.addEventListener("DOMContentLoaded", function () { //Put button/event handlers in here
// page before show code *************************************************************************

    $(document).on("pagebeforeshow", "#BeerList", function (event) {   // have to use jQuery 
        FillArrayFromServer();
        createBeerList("");
    });

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#PricesLocations", function (event) {   // have to use jQuery 
        FillArrayFromServer();
        createPricesLocationsList();   
        
    });

    $(document).on("pagebeforeshow", "#DescriptionsRatings", function (event) {   // have to use jQuery 
        FillArrayFromServer();
        createDescriptionsRatingsList();    
    });
 
// end of page before show code *************************************************************************

//button events start *******************************************************************************

//Button for adding a new beer
document.getElementById("buttonAddBeer").addEventListener("click", function () {
    let newBeerName = document.getElementById("newBeerName").value;
    let newBeerLocation = document.getElementById("newBeerLocation").value;
    let newBeerPrice = document.getElementById("newBeerPrice").value;
    let newBeerDescription = document.getElementById("newBeerDescription").value;
    let newBeerRating = document.getElementById("newBeerRating").value;

    //Checks to make sure the text boxes were filled in correctly before adding a new beer object
    if((newBeerName != null) 
     && (newBeerLocation != null)
     && (!isNaN(newBeerPrice) && newBeerPrice !=null)
     && (newBeerDescription != null)
     && (!isNaN(newBeerRating) && (newBeerRating > 0) && (newBeerRating < 6))){

        let newBeer = new BeerObject(newBeerName,
            newBeerLocation,
            newBeerPrice,
            newBeerDescription,
            newBeerRating); //Adds new beer object

        addNewBeer(newBeer); //Recreates the beer list so the new addition is immediately visible

        newBeerName = "";
        newBeerLocation = "";
        newBeerPrice = "";
        newBeerDescription = "";
        newBeerRating = ""; //Wipes the input fields
    }
    else{
        alert("Please fill in all fields properly.");
    }
});

//Button for adding another location and price to the currently selected beer
document.getElementById("buttonAddLocationsPrices").addEventListener("click", function () {
    let newLocation = document.getElementById("addLocation").value;
    let newPrice = document.getElementById("addPrice").value;
    let localID = document.getElementById("IDparmHere").innerHTML;

    //Checks to make sure the text boxes were filled in correctly before adding a new location/price
    if((newLocation != "")
     && (!isNaN(newPrice) && (newPrice != ""))){

        beerArray[localID].Location.push(newLocation);
        beerArray[localID].Price.push(newPrice); //Adds the new location/price values
        modifyBeer(beerArray[localID]);
        createPricesLocationsList();  
    

        document.getElementById("addLocation").value = "";
        document.getElementById("addPrice").value = ""; //Wipes the input fields
    }
    else{
        alert("Please fill in all fields properly.");
    }
});

//Button for adding another description and rating to the currently selected beer
document.getElementById("buttonAddDescriptionsRatings").addEventListener("click", function () {
    let newDescription = document.getElementById("addDescription").value;
    let newRating = document.getElementById("addRating").value;
    let localID = document.getElementById("IDparmHere").innerHTML;

    if((newDescription != "")
     && (!isNaN(newRating) && (newRating > 0) && (newRating < 6))){

        beerArray[localID].Description.push(newDescription);
        beerArray[localID].Rating.push(newRating); //Adds the new description/rating values
        modifyBeer(beerArray[localID]);
        createDescriptionsRatingsList();

        document.getElementById("addDescription").value = "";
        document.getElementById("addRating").value = ""; //Wipes the input fields
    }
    else{
        alert("Please fill in all fields properly.");
    }
});

document.getElementById("buttonDeleteBeer").addEventListener("click", function () {
    let button = document.getElementById("buttonDeleteBeer");

    if (button.getAttribute("data-status")=="delFalse"){
        button.setAttribute("data-status", "delTrue"); //Flips the existing data status
        button.innerHTML = "Go Back to Selecting a Beer";
        createBeerList("delete");
    }
    else if(button.getAttribute("data-status")=="delTrue"){
        button.setAttribute("data-status", "delFalse"); //Flips the existing data status
        button.innerHTML = "Delete a Beer";
        createBeerList("");
    }
});

document.getElementById("buttonDeleteLocationsPrices").addEventListener("click", function () {
    let button = document.getElementById("buttonDeleteLocationsPrices");

    console.log("Beginning of function. data-status: " + button.getAttribute("data-status"));

    if (button.getAttribute("data-status")=="delFalse"){
        createPricesLocationsList();
        deleteModePricesLocations();
        button.setAttribute("data-status", "delTrue"); //Flips the existing data status
        button.innerHTML = "Go Back to Viewing Listings";
    }
    else if(button.getAttribute("data-status")=="delTrue"){
        button.setAttribute("data-status", "delFalse"); //Flips the existing data status
        button.innerHTML = "Delete a Listing";
        createPricesLocationsList();
    }

    console.log("End of function. data-status: " + button.getAttribute("data-status"));
});

document.getElementById("buttonDeleteDescriptionsRatings").addEventListener("click", function () {
    let button = document.getElementById("buttonDeleteDescriptionsRatings");

    if (button.getAttribute("data-status")=="delFalse"){
        createDescriptionsRatingsList();
        deleteModeDescriptionsRatings();
        button.setAttribute("data-status", "delTrue"); //Flips the existing data status
        button.innerHTML = "Go Back to Viewing Reviews";
    }
    else if(button.getAttribute("data-status")=="delTrue"){
        button.setAttribute("data-status", "delFalse"); //Flips the existing data status
        button.innerHTML = "Delete a Review";
        createDescriptionsRatingsList();
    }
});

//button events end *********************************************************************************

}); //DOMContentLoaded event end ********************************************************************



function createBeerList(pDelString) {
    // clear prior data
    let divBeerList = document.getElementById("divBeerList");
    while (divBeerList.firstChild) {    // remove any old data so don't get duplicates
        divBeerList.removeChild(divBeerList.firstChild);
    };

    let ul = document.createElement('ul');

    beerArray.forEach(function (element) {   // use handy array forEach method
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
    if(pDelString === "delete"){ 
        Array.from(liArray).forEach(function (element) {
            element.setAttribute("style", "color:red;");
            element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            let parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;

            console.log("Delete portion of createBeerList. About to call deleteBeer");
            // now call the method that deletes the beer
            deleteBeer(parm);
            createBeerList("");
            });
        });
    }
    else{
        Array.from(liArray).forEach(function (element) {
            element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            let parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            // now jump to our page that will use that one item
            document.location.href = "#PricesLocations";
            });
            document.getElementById("buttonDeleteBeer").setAttribute("data-status", "delFalse");
        });
    }

}

function createPricesLocationsList(){
    let localID = document.getElementById("IDparmHere").innerHTML;
    
    let currentBeer = beerArray[localID];

    // clear prior data
    let divLocationList = document.getElementById("divLocationList");
    while (divLocationList.firstChild) {    // remove any old data so don't get duplicates
        divLocationList.removeChild(divLocationList.firstChild);
    };
    document.getElementById("buttonDeleteLocationsPrices").setAttribute("data-status", "delFalse");
    document.getElementById("buttonDeleteLocationsPrices").innerHTML = "Delete a Listing";

    let ul = document.createElement('ul');

    for(let i=0; i<currentBeer.Location.length; i++){
        let li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('locationList'); 
        li.setAttribute("data-parm", i); //Stores the index to make deleting easier later on.
        li.innerHTML = currentBeer.Name + " can be found at " + currentBeer.Location[i] + " for $" + currentBeer.Price[i] + ".";
        ul.appendChild(li);
    }
    divLocationList.appendChild(ul);
}

function createDescriptionsRatingsList(){
    let localID = document.getElementById("IDparmHere").innerHTML;
    
    let currentBeer = beerArray[localID];

    // clear prior data
    let divReviewList = document.getElementById("divReviewList");
    while (divReviewList.firstChild) {    // remove any old data so don't get duplicates
        divReviewList.removeChild(divReviewList.firstChild);
    };
    document.getElementById("buttonDeleteDescriptionsRatings").setAttribute("data-status", "delFalse");
    document.getElementById("buttonDeleteDescriptionsRatings").innerHTML = "Delete a Review";

    let ul = document.createElement('ul');

    for(let i=0; i<currentBeer.Rating.length; i++){
        let li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('reviewList'); 
        li.setAttribute("data-parm", i); //Stores the index to make deleting easier later on.
        li.innerHTML = "\"" + currentBeer.Description[i] + "\" - " + currentBeer.Rating[i] + "/5";
        ul.appendChild(li);
    }
    divReviewList.appendChild(ul)
}

function deleteModePricesLocations(){
    let liArray = document.getElementsByClassName("locationList");
    let localID = document.getElementById("IDparmHere").innerHTML;
    

    Array.from(liArray).forEach(function (element) {
        element.setAttribute("style", "color:red;");
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop through them
            let parm = this.getAttribute("data-parm");  // passes in the index number
            beerArray[localID].Location.splice(parm, 1);
            beerArray[localID].Price.splice(parm, 1);
            modifyBeer(beerArray[localID]);
            
            createPricesLocationsList();
            
        });
    });
    
}

function deleteModeDescriptionsRatings(){
    let liArray = document.getElementsByClassName("reviewList");
    let localID = document.getElementById("IDparmHere").innerHTML;
    

    Array.from(liArray).forEach(function (element) {
        element.setAttribute("style", "color:red;");
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            let parm = this.getAttribute("data-parm");  // passes in the index number
            beerArray[localID].Description.splice(parm, 1);
            beerArray[localID].Rating.splice(parm, 1);
            modifyBeer(beerArray[localID]);
          
            createDescriptionsRatingsList();
           
        });
    });
}




function FillArrayFromServer(){
    // using fetch call to communicate with node server to get all data
    fetch('/beerList')
    .then(function (theResonsePromise) {  // wait for reply.  Note this one uses a normal function, not an => function
        return theResonsePromise.json();
    })
    .then(function (serverData) { // now wait for the 2nd promise, which is when data has finished being returned to client
    console.log(serverData);
    beerArray.length = 0;  // clear array
    beerArray = serverData;   // use our server json data which matches our objects in the array perfectly
    createBeerList("");
     
    
        
    })
    .catch(function (err) {
     console.log(err);
    });
};

// using fetch to push an object up to server
function addNewBeer(newBeer){
    // the required post body data is our beer object passed into this function
    
        // create request object
        const request = new Request('/addBeer', {
            method: 'POST',
            body: JSON.stringify(newBeer),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        
      // use that request object we just created for our fetch() call
      fetch(request)
      // wait for first server promise response of "200" success 
      // (can name these returned promise objects anything you like)
         .then(function (theResonsePromise) {    // the .json sets up 2nd promise
          return theResonsePromise.json()  })
       // now wait for the 2nd promise, which is when data has finished being returned to client
          .then(function (theResonsePromiseJson) { 
            console.log(theResonsePromiseJson.toString()), 
            document.location.href = "#BeerList" 
            })
      // the client console log will write out the message I added to the Response on the server
      .catch(function (err) {
          console.log(err);
      });
    FillArrayFromServer();
    }; // end of addNewBeer



    // using fetch to push an object up to server
function modifyBeer(newBeer){
    // beer constructor function gave this a new ID, set it back to what it was
    newBeer.ID= document.getElementById("IDparmHere").innerHTML;
    // create fetch request object
 
    // a put requires both a URL passed value and an object in the body
    // that way you could tell the server, find the object with this ID  passed in the URL
    // and replace it with an object that is in the body that MIGHT have an updated and different ID.
    const request = new Request('/modifyBeer/' + newBeer.ID, {
        method: 'PUT',
        body: JSON.stringify(newBeer),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
        
    // use that request object we just created for our fetch() call
    fetch(request)
    // wait for first server promise response of "200" success 
        .then(function (theResponsePromise) {    // the .json sets up 2nd promise
            return theResponsePromise.json()  })
        // now wait for the 2nd promise, which is when data has finished being returned to client
        .then(function (theResonsePromiseJson) { 
            console.log(theResonsePromiseJson.toString()), 
            document.location.href = "#" 
        })
        // the client console log will write out the message I added to the Repsonse on the server
        .catch(function (err) {
            console.log(err);
    });
    FillArrayFromServer();
}; // end of modifyBeer

function deleteBeer(deletedBeerID){

    console.log("in the beginning of deleteBeer. Beer ID: " + deletedBeerID);

    fetch('/deleteBeer/' + deletedBeerID, {
        method: 'DELETE'
    })
    .then(function (theResponsePromise) {    // the .json sets up 2nd promise
        
        alert("beer ID " + deletedBeerID + "has been deleted"), 
        
    })
    // the client console log will write out the message I added to the Repsonse on the server
    .catch(function (err) {
        alert("oops! something went wrong. " + err);
        console.log(err);
    });
    console.log("in the end of deleteBeer. Beer ID: " + deletedBeerID);
    FillArrayFromServer();
}; // end of deleteBeer
