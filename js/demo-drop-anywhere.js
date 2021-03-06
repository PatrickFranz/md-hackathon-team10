// a counter to keep track of when the puzzle is completed
let counter = 0;
let theTiles = document.getElementsByClassName("draggableImg");

// takes 2 params: event and source for the draggable image
function dragTile(event, imgsrc) {

  // set data type (required) and data is the ID of the image being dragged
  event.dataTransfer.setData("text/plain", event.target.id);

  // create the image that will appear to be dragged
  var dragImg = new Image();
  dragImg.src = imgsrc;
  // when dragging the image will appear centered under the pointer
  event.dataTransfer.setDragImage(dragImg, 55, 42);
}

function dragOver(event) {
  // preventing the default action allows an element to drop on top of another one
  event.preventDefault();
}

function dropTile(event) {
  event.preventDefault();

  // get the ID set in dragTile(), format must be specified
  var idOfTile = event.dataTransfer.getData("text");
  // get the data-tile value (the ID of the image that should go here) from the receiving div
  var tileThatFitsHere = event.target.dataset.tile;
  //get the instance of the image that belongs here
  var droppedTile = document.getElementById(idOfTile);
  // remove the inline style for top/left
  droppedTile.removeAttribute("style");

  // if the receiver div is empty
  if (event.target.firstElementChild === null) {
    // append the image to the receiver element
    event.target.appendChild(droppedTile);
    //event.target.dataset.empty = "false";


    // clean up the DOM because sometimes img gets appended to img
    var cleanUp = document.getElementsByClassName("draggableImg");
    for (var k = 0; k < cleanUp.length; k++) {
      if (cleanUp[k].firstElementChild) {
        var tobemoved = cleanUp[k].firstElementChild;
        var container = document.getElementById("puzzleContainer");
        container.append(tobemoved);
        //cleanUp[k].remove();
      }
    }
  }

  // if the image ID matches that of data-tile value
  if (idOfTile === tileThatFitsHere){
    droppedTile.classList += " glowit"
    //once it's in place lock it down
    droppedTile.setAttribute("draggable", "false");
    // increment count of correctly placed tiles
    counter++;
    if(counter >= 41){
      makeThemDance();
    }
  }
}

function win() {
  
}

// setup event listeners
var puzzleContainer = document.getElementById('puzzleContainer');

puzzleContainer.addEventListener('dragstart', function (event) {
  var imgsrc = event.target.src;
  dragTile(event, imgsrc);
});

puzzleContainer.addEventListener('drop', function (event) {
  dropTile(event);
});

puzzleContainer.addEventListener('dragover', function (event) {
  dragOver(event);
});