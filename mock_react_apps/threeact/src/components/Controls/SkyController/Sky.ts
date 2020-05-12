import {
    ShaderMaterial,
    UniformsUtils,
    BackSide,
    Mesh,
    SphereBufferGeometry
  } from "three";
  import shader from "./shader";
  
  export default class Sky extends Mesh {
    geometry: SphereBufferGeometry;
    material: ShaderMaterial;
    
    constructor() {
      super();

      this.geometry = new SphereBufferGeometry(1, 32, 32);
      this.material = new ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: UniformsUtils.clone(shader.uniforms),
        side: BackSide,
        depthWrite: false
      });

      this.rotateX(Math.PI / 2);
      this.rotateY(Math.PI / 2);
      this.rotateZ(Math.PI / 2);
    }
  }
  