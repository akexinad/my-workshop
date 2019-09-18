// //////////////////////////////////////////////////////////////////

// // randomly generate some line arcs (not essential for understanding this demo)

// const lines = new Array();
// const arcSegments = 25;
// const lineQuantity = 50;
// for (let i = 0; i < lineQuantity; i++){
//     const line = new Array();
//     const destination = [300*(Math.random()-0.5), 140*(Math.random()-0.5)];
//     const maxElevation = Math.pow(Math.abs(destination[0]*destination[1]), 0.5) * 80000;
//     const increment = destination.map(function(direction){
//         return direction/arcSegments;
//     })
//     for (let l = 0; l<=arcSegments; l++){
//         const waypoint = increment.map(function(direction){
//             return direction * l
//         })
//         const waypointElevation = Math.sin(Math.PI*l/arcSegments) * maxElevation;
//         waypoint.push(waypointElevation);
//         line.push(waypoint);
//     }
//     lines.push(line)
// }
// console.log('lineGeometries of the lines: ', lines);


// //////////////////////////////////////////////////////////////////////////////////


// // RENDERING LINES

// for (line of lines) {
//     const lineOptions = {
//         geometry: line,
//         color: (line[1][1]/180) * 0xffffff, // color based on latitude of endpoint
//         width: Math.random() + 1 // random width between 1 and 2
//     }
//     lineMesh = tb.line(lineOptions);
//     tb.add(lineMesh)
// }