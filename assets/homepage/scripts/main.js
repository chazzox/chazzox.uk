dispButton = document.getElementById('proj');
dispButton.onclick = function() {
	document.getElementById('noShow').style.display = 'block';
	document.getElementById('closeButton').style.display = 'block';
	document.getElementById('main').style.filter = 'blur(7px)';
};

closeButt = document.getElementById('closeButton');
closeButt.onclick = () => close();

noShow = document.getElementById('noShow');
noShow.onclick = () => close();

function close() {
	document.getElementById('noShow').style.display = 'none';
	document.getElementById('closeButton').style.display = 'none';
	document.getElementById('main').style.filter = 'blur(0px)';
}

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
