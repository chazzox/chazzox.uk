dispButton = document.getElementById('proj');
dispButton.onclick = function() {
	document.getElementById('noShow').style.display = 'block';
	document.getElementById('closeButton').style.display = 'block';
	document.getElementById('main').style.filter = 'blur(7px)';
	for (var i = 0; i < document.getElementsByClassName('boxforlink').length; i++) {
		document.getElementsByClassName('boxforlink')[i].style.padding = '20px';
	}
};

closeButt = document.getElementById('closeButton');
function close() {
	document.getElementById('noShow').style.display = 'none';
	document.getElementById('closeButton').style.display = 'none';
	document.getElementById('main').style.filter = 'blur(0px)';
	for (var i = 0; i < document.getElementsByClassName('boxforlink').length; i++) {
		document.getElementsByClassName('boxforlink')[i].style.padding = '';
	}
}

closeButt.onclick = () => close();
document.onkeydown = function(evt) {
	evt = evt || window.event;
	var isEscape = false;
	if ('key' in evt) {
		isEscape = evt.key === 'Escape' || evt.key === 'Esc';
	} else {
		isEscape = evt.keyCode === 27;
	}
	if (isEscape) {
		console.log('bruh');
		close();
	}
};
