/**
 * Spring
 * 
 * @description A spring experiment
 * @author Sam Olaogun
 */
'use strict';

/**
 * @param {userDefinedCallback} callback Handles the response
 * @param {Object} options Handles the response
 * @param {number} [options.dampingCoefficient] Damping coefficient [0, 1] of the spring motion (zeta)
 * @param {number} [options.mass] Mass of the vehicle
 * @param {number} [options.period] Period [0, 2π]
 */
function Spring(callback, { dampingCoefficient = .2, mass = 10, period = 10 }) {
    this.continueAnimating = true;
    this.time = 0;

    this.dampingCoefficient = dampingCoefficient;
    this.period = period;

    /* Derived units */
    this.acceleration = this.period * this.dampingCoefficient;
    this.gamma = this.period * Math.sqrt(1 - this.dampingCoefficient * this.dampingCoefficient);

    requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame;

    requestAnimationFrame(this.step(callback));
}

Object.defineProperty(Spring.prototype, 'position', {
    get: function() {
        return Math.pow(Math.E, this.acceleration * this.time) *
            (this.acceleration / this.gamma * Math.sin(this.gamma * this.time) +
                Math.cos(this.gamma * this.time));
    },
    set: function() {
        throw new Error('"Spring\'s" internal position cannot be manually set.')
    }
})

Spring.prototype.step = function(callback) {
    return function(timestamp) {
        this.time++;
        callback(this.position);

        this.continueAnimating = !!this.position;
        if (this.continueAnimating)
            this.requestAnimationFrame(step);
    }
}