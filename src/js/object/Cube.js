(function(){
  var sample = window.sample || {};
  window.sample = sample;

  /**
   * Cubeクラス
   */
  sample.Cube = function () {
    //Cubeクラスをイニシャライズ
    p.init();
  };

  var p, s;

  s = sample.Cube;
  p = s.prototype;

  p.init = function () {
    var self = this;

    //cubeGeometry
    self.cubeGeometry = new THREE.BoxGeometry(4,4,4);

    //cubeMaterial
    self.cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000, wireframe: false
    });

    //cube
    self.CubeObject = new THREE.Mesh(self.cubeGeometry,self.cubeMaterial);
    self.CubeObject.castShadow = true;
    //CubeObjectを回転
    self.CubeObject.position.x = -4;
    self.CubeObject.position.y = 3;
    self.CubeObject.position.z = 0;
    // this.scene.add(cube);
  };

})();