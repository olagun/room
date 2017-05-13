/**
 * Sling
 * 
 * @author Sam Olaogun
 * @description A image viewer thing. I'm not really sure what it is.
 */
'use strict';

function Sling(node) {
    this.el = node;

    this.mouseControl = this.mouseControl.bind(this);
    this.dragBehavior = this.dragBehavior.bind(this);

    document.addEventListener('mousedown', this.mouseControl);
}

Sling.prototype.mouseControl = function(e) {
    this.initMousePos = {
        x: e.clientX,
        y: e.clientY
    }

    document.addEventListener('mousemove', this.dragBehavior);
}

Sling.prototype.dragBehavior = function(e) {
    this.currentMousePos = {
        x: e.clientX,
        y: e.clientY
    }

    document.addEventListener('mouseup', this.endBehavior);

    const offsetX = this.initMousePos.x - this.currentMousePos.x;
    const offsetY = this.initMousePos.y - this.currentMousePos.y;

    // Update styles once
    this.el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

Sling.prototype.endBehavior = function() {
    document.removeEventListener('mousemove', this.dragBehavior);
    this.el.style.transform = 'none';
}

new Sling(document.querySelector('img'));