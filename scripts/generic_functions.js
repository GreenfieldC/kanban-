//generic function of document.getElementById(id).innerHTML
function setInnerHtmlById(id, html) {
	document.getElementById(id).innerHTML = html;
}

function showElementById(id) {
	document.getElementById(id).classList.remove('d-none');
}

function hideElementById(id) {
	document.getElementById(id).classList.add('d-none');
}

function docGetElementById(id) {
	return document.getElementById(id);
}
