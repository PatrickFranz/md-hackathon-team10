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

