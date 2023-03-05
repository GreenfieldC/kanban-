'use strict';

const initLogin = () => {
	startAnimation();
};

const startAnimation = () => {
	setTimeout(() => {
		document.getElementById('login-animation').classList.add('transform-animation-overlay');
		document.getElementById('join-logo-animation').classList.add('transfer-join-logo');
	}, 500);
	setTimeout(() => {
		document.getElementById('login-animation').style.zIndex = -1;
	}, 500);
};
