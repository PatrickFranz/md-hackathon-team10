let btnScramble = document.getElementById("scramble")
let btnHint = document.getElementById("hint")
let btnReset = document.getElementById("reset")
let isStarted = false;
// Show preview button function // 

var preview = document.getElementById("hint");
preview.addEventListener("mousedown", showSolution);
preview.addEventListener("mouseup", hideSolution);

btnScramble.addEventListener("click", function(e){
	isStarted = true;
	btnScramble.classList = "hide";
	btnHint.classList = "";
	btnReset.classList = "";
});

btnReset.addEventListener("click", function(e){
	window.location.reload();
})

function showSolution(){
	document.getElementById("preview-img").style.opacity = "1";
}

function hideSolution(){
	document.getElementById("preview-img").style.opacity = "0";
}