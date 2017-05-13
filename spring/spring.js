/**
 * Spring
 * 
 * @description The way that a spring animation works no different than physical oscillation.
 * In both real life and in the digital world, springs can be represented by a function 
 * called a "damped oscillation". For a function to be damped simply means that as the
 * function progresses, or as the x value of the function increases, the y value, or the 
 * function output approches a single value, which in this case is 0. I chose to 
 * create this animation using javascript because CSS animations are clamped to a specific range, 
 * which means that they do not support elastic behaviors such as this.
 * Keep in mind that this is a true spring animation (a spring is never truly stable), but 
 * more just a visual illusion (the limit can never be reached). Additionally, I'm not actually 
 * specifiying conditions for SHM (spring constant, dx, etc.).
 * @author Sam Olaogun
 */

'use strict';
/**
 * Pseudo conditions:
 * Essentially,  phase shifts and scales make the conditions mutable
 * 
 * Tension - Ranges from 0 to Infinity. 0-5 is reasonable domain, mind that as you increase
 * the domain (the tension value), the tension increase. Because the domain is scaled 
 * so the function traverses more x values in the function, which approaches a limit, quickly.
 * 
 * Initial Velocity - Phase shift to change (left, down)
 * shift function down and to the right to fix init velocity and
 * change crest height (1.6142) to fit by plugging the new x offset
 * value into the function (intercept, x+= val).
 */
const TENSION = 5;
const INITIAL_VELOCITY = 2;

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame;

/**
 * @description An easing function according to Penner's format
 * 
 * @param x (I've omitted this parameter because it has no purpose in this context)
 * @param t current time (relative)
 * @param b base value
 * @param c change in value
 * @param d duration
 */
const easeOutElastic = (t, b, c, d) =>
    /*
    	The function is shifted .05 to the right. This translates to x = (x - .05) algebraically
    	The higher the value of the domain end, which in this case is 5, the more precise the simulation
    	is because as the value of x increases, the function nears the limit (0).
    */
    c / 1.6142 * -Math.pow(Math.E, -(t = t / d * TENSION + .05)) * Math.cos(2 * Math.PI * t) + c + 1;

const box = document.createElement('div');
document.body.appendChild(box);

let start, dur;
requestAnimationFrame(function spring(time) {
    !start ?
        start = time :
        box.style.transform = `translate(${easeOutElastic(dur = time - start, 0, 700, 4000)}px, 0px)`;

    requestAnimationFrame(spring);
});