const testCoord = polygon[0]; 

// console.log(testCoord);

console.log(polygon);

// const foo = polygon[0];
// const point = new Point(foo.X, foo.Y, foo.Z);
const points = [];

polygon.forEach(point => {
    points.push(new Point(point.X, point.Y, point.Z));
});

console.log("NEW POINTS ====>", points);


const ring = new Ring(points);
console.log("RING ====>", ring);


const shape = new OliveShape(ring);

console.log("OLIVE SHAPE ====>", shape);
