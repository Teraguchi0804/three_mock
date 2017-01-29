window.THREE = require('three');

/**
 * Camera
 */

'use strict';

var Camera = (function () {

  function Camera() {
    this.init.apply(this, arguments);
  }

  var p, s;

  s = Camera;
  p = s.prototype;

  p.init = function() {
    this.camera;

    this.setup();
    this.create();
  };

  p.setup = function() {

    // console.log('this',this);
    // console.log('Camera_setup!!!!!');

  };

  //
  p.create = function () {
    // this.scene = new THREE.Camera();

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt( gb.in.scene.scene.position );
  };

  //
  p.update = function () {

  };

  //
  p.setEvents = function () {

  };

  return Camera;

}());

module.exports = Camera;
