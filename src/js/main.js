window.THREE = require('three');
var Stats = require('./libs/stats.js');
var dat　= require('dat-gui');


require('./object/Plane.js');

var Cube = require('./object/Cube.js');

'use strict';

(function() {

  var sample = window.sample || {};
  window.sample = sample;

  //初期化実行
  $(function() {
    new sample.MainDisplay();
  });

})();



//Planeをインスタンス化
var PlaneObject = new Plane();

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

  var renderScene;

  /**
   * イニシャライズ
   */
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

    // 高解像度対応
    var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(pixelRatio);

    //scene
    this.scene = new THREE.Scene();

    //camera
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt(this.scene.position);

    // window resize
    this.$window.on('resize', function(e) {
      self.onResize();
    });

    // resizeイベントを発火してキャンバスサイズをリサイズ
    this.$window.trigger('resize');

    //axes
    // var axes = new THREE.AxisHelper(20);
    // this.scene.add(axes);

    //Planeをシーンに追加
    this.scene.add(PlaneObject.init());

    //Cubeをインスタンス化
    var CubeObject = new Cube();

    // //Cubeをシーンに追加
    this.scene.add(CubeObject.setup());

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

    document.getElementById("WebGL-output").appendChild(this.renderer.domElement);

    var stats = initStats();
    renderScene = function () {
      stats.update();
      // rotate the cube around its axes
      // CubeObject.animate();
      // CubeObject.init().rotation.x += 0.02;
      // Cube.rotation.y += 0.02;
      // Cube.rotation.z += 0.02;

      // bounce the sphere up and down
      // step += 0.04;
      // sphere.position.x = 20 + ( 10 * (Math.cos(step)));
      // sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

      // render using requestAnimationFrame
      this.updateAnimation();
    }.bind(this);

    // call the render function
    var step = 0;
    renderScene();


    /**
     * dat.gui
     * dat.guiのコントローラーを定義
     */
    var controls = new function () {
      this.rotationSpeed = 0.001;
      this.bouncingSpeed = 0.001;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.1);
    gui.add(controls, 'bouncingSpeed', 0, 0.1);

    var render =  function() {
      stats.update();
      // window.console.log('CubeX',CubeObject.init().rotation.x);
      // rotate the cube around its axes
      // CubeObject.init().rotation.x += controls.rotationSpeed;
      // CubeObject.init().rotation.y += controls.rotationSpeed;
      // CubeObject.init().rotation.z += controls.rotationSpeed;

      // bounce the sphere up and down
      // step += controls.bouncingSpeed;
      // sphere.position.x = 20 + ( 10 * (Math.cos(step)));
      // sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

      requestAnimationFrame(render);
      this.renderer.render(this.scene, this.camera);
    }.bind(this);
    render();

  };

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

  /**
   * アニメーション開始
   */
  // p.start = function() {
  //   var self = this;
  //
  //   var enterFrameHandler = function() {
  //     requestAnimationFrame(enterFrameHandler);
  //     self.update();
  //   };
  //
  //   enterFrameHandler();
  // }

  /**
   * アニメーションループ内で実行される
   */
  p.updateAnimation = function() {
    requestAnimationFrame(renderScene);
    this.renderer.render(this.scene, this.camera);
  };


  /**
   * リサイズ処理
   */
  p.onResize = function () {

    this.width = this.$window.width();
    this.height = this.$window.height();

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  };



  // p.createDatGUIBox = function () {

  // };

})();