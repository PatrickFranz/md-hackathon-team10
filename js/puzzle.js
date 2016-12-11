let btnScramble = document.getElementById("scramble")
let btnHint = document.getElementById("hint")
let btnReset = document.getElementById("reset")
let divPieces = document.getElementById("tiles-area");
let modal = document.getElementById("modal");
let isStarted = false;
let countDownTime = 120;
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

function countDownTimer(){
	var counter = document.getElementById("timer");
	counter.style.visibility = "visible";
	counter.style.height = "47px";

	var buzzer = new Audio();
	buzzer.src = "img/buzzer-1.mp3";

  var minutes = parseInt( countDownTime / 60 ) % 60;
	var seconds = countDownTime % 60;
	var timer = setTimeout(function(){ countDownTimer() }, 1000);
	countDownTime--;
	if(countDownTime < 0 ){ 
		clearTimeout(timer);
		buzzer.play();
		buzzer.addEventListener('ended', function(e){
			//alert("Times up");
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