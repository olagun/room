  /**
   * Quaternion
   * 
   * @author Sam Olaogun
   * @description An exploration of 3D Web Animations.
   */
  'use strict';

  let quaternion = document.querySelector('.quaternion');

  document.addEventListener('mousemove', e => {
      let maxX = window.innerWidth;
      let maxY = window.innerHeight;

      let x = e.clientX;
      let y = e.clientY;

      const threshold = 10;

      let xRotation = (x / maxX) * (threshold * 2) - threshold;
      let yRotation = (y / maxY) * (threshold * 2) - threshold;

      quaternion.style.transform = `rotateX(${-yRotation}deg) rotateY(${xRotation}deg)`;
  });