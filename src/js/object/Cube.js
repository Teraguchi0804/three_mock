window.THREE = require('three');

(function(){
  /**
   * Cubeクラス
   */
  var Cube = window.Cube || {};

  window.Cube = function () {
    //Cubeクラスをイニシャライズ
    p.init();

    // p.animate();
  };

  var p, s;

  s = window.Cube;
  p = s.prototype;

  /**
   * Cubeクラスイニシャライズ
   **/
  p.init = function () {
    var self = this;

    //cubeGeometry
    self.cubeGeometry = new THREE.BoxGeometry(4,4,4);

    //cubeMaterial
    self.cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000, wireframe: false
    });

    //cube
    var CubeObject = new THREE.Mesh(self.cubeGeometry,self.cubeMaterial);
    CubeObject.castShadow = true;
    //CubeObjectを回転
    CubeObject.position.x = -4;
    CubeObject.position.y = 3;
    CubeObject.position.z = 0;

    //オブジェクトとしてCubeObject返す
    return CubeObject;
  };

  p.animate = function () {
    var self = this;

    // self.CubeObject.rotation.x += 0.02;
    // self.CubeObject.rotation.y += 0.02;
    // self.CubeObject.rotation.z += 0.02;

  };

})();