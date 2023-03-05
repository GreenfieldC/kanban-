'use strict';

let playedAnimationOnce = false;

const initLogin = () => {
	startAnimation();
};

const startAnimation = () => {
	if (playedAnimationOnce) return;
	setTimeout(() => {
		document.getElementById('login-animation').classList.add('transform-animation-overlay');
		document.getElementById('join-logo-animation').classList.add('transfer-join-logo');
	}, 500);
	setTimeout(() => {
		document.getElementById('login-animation').style.zIndex = -1;
	}, 500);
};
