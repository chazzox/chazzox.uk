//Touch Display Detection
window.addEventListener(
	'touchstart',
	function onFirstTouch() {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = '/assets/global/scripts/touchscreenOnly.css';
		document.getElementsByTagName('head')[0].appendChild(link);
		window.removeEventListener('touchstart', onFirstTouch, false);
	},
	false
);
