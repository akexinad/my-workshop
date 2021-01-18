
/******** MOCK DATA *******/

// console.log(EUSTON);

const singlePoint = {
  x: 12,
  y: 34,
  z: 56,
  srid: 7890
}

const siteGeometry = JSON.parse(EUSTON.data.nodeItemById.nodeItemsByParentNodeId.nodes[0].nodeItemsByParentNodeId.nodes[0].regionByRegionId.oliveGeometry)


/************************************************************* */

function Vector2P(point) {

  THREE.Vector2.call(this);

  this.x = point.x;
  this.y = point.y;
  this.z = point.z;
  this.srid = point.srid;
  
}

Vector2P.prototype = Object.create( THREE.Vector2.prototype );
Vector2P.prototype.constructor = THREE.Vector2;

// const vector = new Vector2P(singlePoint);
// console.log(vector);

function Vector3P(point) {

  THREE.Vector3.call(this);

  this.x = point.x;
  this.y = point.y;
  this.z = point.z;
  this.srid = point.srid;

}

Vector3P.prototype = Object.create( THREE.Vector3.prototype );
Vector3P.prototype.constructor = THREE.Vector3;

// const vector3 = new Vector3P(singlePoint);
// console.log(vector3);

function GeometryP(geometry) {

  THREE.ExtrudeBufferGeometry.call(this);

  this.vector2Array = [];
  this.vector3Array = [];

  this.vector2Array = geometry.points.forEach( point => {
    this.vector2Array.push( new THREE.Vector2(point) );
    this.vector3Array.push( new Vector3P(point) );
  });

  console.log(this.vector2Array);
  
  
  this.shapes = new THREE.Shape(this.vector2Array);
  this.options = {
    depth: geometry.height ? geometry.height : 0,
    steps: 1,
    bevelEnabled: false
  }
  
  this.paramters = {
    shapes: this.shapes,
    options: this.options
  }
}

GeometryP.prototype = Object.create( THREE.ExtrudeBufferGeometry.prototype );
GeometryP.prototype.constructor = THREE.ExtrudeBufferGeometry;

// const geo = new GeometryP(siteGeometry);
// console.log(geo);
