let btnScramble = document.getElementById("scramble")
let btnHint = document.getElementById("hint")
let btnReset = document.getElementById("reset")
let divPieces = document.getElementById("tiles-area");
let modal = document.getElementById("modal");
let isStarted = false;
let countDownTime = 120;
// a counter to keep track of when the puzzle is completed
let counter = 0;
let theTiles = document.getElementsByClassName("draggableImg");

// Show preview button function // 

showSolution();

var preview = document.getElementById("hint");
preview.addEventListener("mousedown", showSolution);
preview.addEventListener("mouseup", hideSolution);

btnScramble.addEventListener("click", function(e){
	isStarted = true;
	hideSolution();
	initialArrangement();
	divPieces.classList = "";
	btnScramble.classList = "hide";
	btnHint.classList = "";
	btnReset.classList = "";
	setTimeout(countDownTimer, 500);
});

btnReset.addEventListener("click", function(e){
	window.location.reload();
});

function showSolution(){
	document.getElementById("preview-img").style.opacity = "1";
}

function hideSolution(){
	document.getElementById("preview-img").style.opacity = "0";
}

var timer;

function countDownTimer(){
	var counter = document.getElementById("timer");
	counter.style.visibility = "visible";
	counter.style.height = "47px";

	var buzzer = new Audio();
	buzzer.src = "img/buzzer-1.mp3";

  var minutes = parseInt( countDownTime / 60 ) % 60;
	var seconds = countDownTime % 60;
	timer = setTimeout(function(){ countDownTimer() }, 1000);
	countDownTime--;
	if(countDownTime < 0 ){
		clearTimeout(timer);
		buzzer.play();
		buzzer.addEventListener('ended', function(e){
      modal.classList = "";
		});
	}

	var result = "Time left " + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
	counter.innerHTML = result;
	
}

// random numbers
function randomInt(lo, hi) {
  var diff = Math.abs(hi - lo);
  var answer = (Math.random() * diff) + lo;
  if (Math.round(answer) === lo) {
    answer = Math.ceil(answer);
  } else if (Math.round(answer) === hi) {
    answer = Math.floor(answer);
  } else {
    answer = Math.round(answer);
  }
  return answer;
}

// random arrangement of tile when first loaded
function initialArrangement() {
  var imgsArr = document.getElementsByClassName("draggableImg");
  for (var i = 0; i < imgsArr.length; i++) {
    imgsArr[i].setAttribute("style", "left:" + randomInt(10, 650) + "px" + ";top:" + randomInt(600, 700) + "px;");
  }
}

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
     win();
    }
  }
}

function win() {
  var winner = new Audio();
  winner.src = "img/winning.mp3";
	clearTimeout(timer);
  winner.play();
  winner.addEventListener('ended', function(e){
      modal.classList = "";
    });
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

