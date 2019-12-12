console.log(EUSTON);

const singlePoint = {
  x: 12,
  y: 34,
  z: 56,
  srid: 7890
}

const Vector2P = function(point) {
  this.point = {
    x: point.x,
    y: point.y,
    z: point.z,
    srid: point.srid
  }

  this.prototype = Object.create(THREE.Vector2.prototype)
}

// Vector2P.prototype = Object.create(THREE.Vector2.prototype);

const vector = new Vector2P(singlePoint);

console.log(vector);
