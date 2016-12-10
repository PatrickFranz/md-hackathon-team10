// Show preview button function // 

var preview = document.getElementById("preview");
preview.addEventListener("mousedown", showPreview);
preview.addEventListener("mouseout", hidePreview);

function showPreview(){
	document.getElementById("preview-img").style.opacity = "1";
}

function hidePreview(){
	document.getElementById("preview-img").style.opacity = "0";
}

// Scramble button function // 

var scramble = document.getElementById("scramble");
scramble.addEventListener("mousedown", startPuzzle);

function startPuzzle(){
	scramble.style.display = "none";
	document.getElementById("puzzle-pieces").style.visibility = "visible";
	document.getElementById("puzzle-pieces").style.height = "300px";
	document.getElementById("preview").style.display = "inline-block";
	document.getElementById("reset").style.display = "inline-block";
	document.getElementById("unsolved-puzzle").style.opacity = "1";
	hexImagesAnimation();
}

// Scramble button function // 

function hexImagesAnimation() {
	var hexImagesContainer = document.getElementById("hex-images");
	var hexImages = hexImagesContainer.getElementsByTagName("IMG");
	for(var i = 0; i < hexImages.length; i++){
		if(i === 0 || i === 2 || i === 4 || i === 6 ||i === 8) {
			hexImages[i].style.transform = "translate(30px, 550px) rotate(180deg)"
		} else if (i === 1 || i === 3 || i === 5 || i === 7 || i === 9) {
			hexImages[i].style.transform = "translate(150px, 570px) rotate(180deg)"
		} else if (i === 11 || i === 13 || i === 15 || i === 17) {
			hexImages[i].style.transform = "translate(-150px, 550px) rotate(-180deg)"
		} else {
			hexImages[i].style.transform = "translate(-30px, 560px) rotate(-180deg)"
		}
		
	}
}


