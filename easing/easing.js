	/**
	 * Easing
	 * 
	 * @description A simple easing example.
	 * @author Sam Olaogun
	 */
	'use strict';

	/* Bounds */
	const min = {
	    x: -200,
	    y: 0
	};

	const max = {
	    x: 200,
	    y: 0
	};

	/* Settings */
	const dur = 800;

	const requestAnimationFrame =
	    window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame;

	const box = document.createElement('div');
	document.body.appendChild(box);

	/**
	 * (Math.cos((prog) * Math.PI + Math.PI) + 1) * max
	 * 
	 * 1) Cosine of the progress [0, Math.PI / 2]
	 * 2) Phase shift to the left by pi
	 * 3) Phase shift up by 1
	 * 4) Multiply by the scale (max)
	 * 5) Result: Should ease and oscillate between the 0 and max
	 */
	const easeInOut = max => prog => (Math.cos(Math.PI + prog * Math.PI) + 1) * (max / 2);
	// const easeQuartic = max => prog => prog * prog * prog * prog * max; // Math.pow isn't as performant
	// const easeQuintic = max => prog => prog * prog * prog * prog * prog * max;

	const fx = easeInOut(max.x - min.x);
	const fy = easeInOut(max.y - min.y);

	requestAnimationFrame(function ease(time) {
	    let dxdy = time / dur

	    const dx = fx(dxdy) + min.x;
	    const dy = fy(dxdy) + min.y;

	    // if (dx >= maxX || dy >= maxY) return;
	    box.style.transform = `translate(${dx}px, ${dy}px)`;
	    requestAnimationFrame(ease);
	});