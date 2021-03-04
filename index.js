// start by creating data so we don't have to type it in each time
let beerArray = [];

// define a constructor to create movie objects
let beerObject = function (pName) {
    this.ID;
    this.Name = pName;
    this.Location;
    this.Price;
    this.Description;  
    this.rating;    
}

let sessionID = $("#link").data("beerID")