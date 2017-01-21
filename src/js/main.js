window.THREE = require('three');
var Stats = require('./libs/stats.js');
var dat　= require('dat-gui');

// (function(){
//   var sample = window.sample || {};
//   window.sample = sample;
//
// })();


(function(){
  var sample = window.sample || {};
  window.sample = sample;

  /**
   * メインクラス
   */
  sample.MainDisplay = function () {
    //イニシャライズ
    p.init();
  };

  var p, s;

  s = sample.MainDisplay;
  p = s.prototype;

  p.init = function () {
    var self = this;

    this.$window = $(window);
    this.$MainDisplay = $('#WebGL-output');

    //WebGL renderer
    this.renderer = new THREE.WebGLRenderer();
    if (!this.renderer) {
      alert('Three.jsの初期化に失敗しました。');
    }
    this.renderer.setClearColor(new THREE.Color(0xEEEEEE));
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.shadowMap.enabled = true;

    //scene
    this.scene = new THREE.Scene();

    //camera
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt(this.scene.position);

    //axes
    // var axes = new THREE.AxisHelper(20);
    // this.scene.add(axes);

    //planeGeometry
    var planeGeometry = new THREE.PlaneGeometry(60,20);

    //planeMaterial
    var planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff
    });

    //plane
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    //planeを回転
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    this.scene.add(plane);


    //cubeGeometry
    var cubeGeometry = new THREE.BoxGeometry(4,4,4);

    //cubeMaterial
    var cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000, wireframe: false
    });

    //cube
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.castShadow = true;
    //cubeを回転
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    this.scene.add(cube);

    //sphereGeometry
    var sphereGeometry = new THREE.SphereGeometry(4, 20,20);

    //sphereMaterial
    var sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0x7777ff, wireframe: false
    });

    //sphere
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphere.castShadow = true;
    //sphereを回転
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    this.scene.add(sphere);


    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 30, -5);
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    // this.$MainDisplay.appendChild(this.renderer.domElement);
    document.getElementById("WebGL-output").appendChild(this.renderer.domElement);

    this.renderer.render(this.scene, this.camera);


    var stats = initStats();

    var renderScene = function () {
      stats.update();
      // rotate the cube around its axes
      cube.rotation.x += 0.02;
      cube.rotation.y += 0.02;
      cube.rotation.z += 0.02;

      // bounce the sphere up and down
      step += 0.04;
      sphere.position.x = 20 + ( 10 * (Math.cos(step)));
      sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

      // render using requestAnimationFrame
      requestAnimationFrame(renderScene);
      this.renderer.render(this.scene, this.camera);
    }.bind(this);

    // call the render function
    var step = 0;
    renderScene();


    /**
     * dat.gui
     * dat.guiのコントローラーを定義
     */

    var controls = new function () {
      this.rotationSpeed = 0.02;
      this.bouncingSpeed = 0.03;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    var render =  function() {
      stats.update();
      // rotate the cube around its axes
      cube.rotation.x += controls.rotationSpeed;
      cube.rotation.y += controls.rotationSpeed;
      cube.rotation.z += controls.rotationSpeed;

      // bounce the sphere up and down
      step += controls.bouncingSpeed;
      sphere.position.x = 20 + ( 10 * (Math.cos(step)));
      sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

      // render using requestAnimationFrame
      requestAnimationFrame(render);
      this.renderer.render(this.scene, this.camera);
    }.bind(this);

    render();





    // resizeイベントを発火してキャンバスサイズをリサイズ：今は使用していない
    // this.$window.trigger('resize');

    //Stats表示設定
    function initStats() {

      var stats = new Stats();

      stats.setMode(0); // 0: fps, 1: ms

      // Align top-left
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0px';
      stats.domElement.style.top = '0px';

      document.getElementById("Stats-output").appendChild(stats.domElement);

      return stats;
    }

    var onResize = function () {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }.bind(this);

    // listen to the resize events
    window.addEventListener('resize', onResize, false);


    // ウィンドウリサイズイベント
    // this.$window.on('resize', function(e) {
    //   // resizeメソッドを実行
    //   p.resize();
    // });
  };



  // p.createDatGUIBox = function () {
  //
  //   var controls = new function () {
  //     this.rotationSpeed = 0.02;
  //     this.bouncingSpeed = 0.03;
  //   };
  //
  //   var gui = new dat.GUI();
  //   gui.add(controls, 'rotationSpeed', 0, 0.5);
  //   gui.add(controls, 'bouncingSpeed', 0, 0.5);
  //
  //   var render =  function() {
  //     stats.update();
  //     // rotate the cube around its axes
  //     cube.rotation.x += controls.rotationSpeed;
  //     cube.rotation.y += controls.rotationSpeed;
  //     cube.rotation.z += controls.rotationSpeed;
  //
  //     // bounce the sphere up and down
  //     step += controls.bouncingSpeed;
  //     sphere.position.x = 20 + ( 10 * (Math.cos(step)));
  //     sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));
  //
  //     // render using requestAnimationFrame
  //     requestAnimationFrame(render);
  //     this.renderer.render(this.scene, this.camera);
  //   }.bind(this);
  //
  //   render();
  // };

})();

//初期化実行
window.onload = sample.MainDisplay();