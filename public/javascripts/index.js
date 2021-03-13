let beerArray = [];
let counter = 0;
// define a constructor to create movie objects
let BeerObject = function (pName) {
    
    this.Name = pName;
    this.Location;
    this.Price;
    this.Description;  
    this.Rating;    
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

beerArray.push(new BeerObject("Bud Light"));
beerArray.push(new BeerObject("Rainier"));
beerArray.push(new BeerObject("Irish Death"));

beerArray[0].Location = "Albertsons";
beerArray[0].Price = 10;
beerArray[0].Description = "Bud light is very refreshing on a hot day";
beerArray[0].Rating = 3;

beerArray[1].Location = "Safeway";
beerArray[1].Price = 8;
beerArray[1].Description = "Rainier is a classic beer that tastes amazing any day";
beerArray[1].Rating = 4;

beerArray[2].Location = "Norm's";
beerArray[2].Price = 12;
beerArray[2].Description = "Irish Death has a chocolate flavor that is to die for!";
beerArray[2].Rating = 5;