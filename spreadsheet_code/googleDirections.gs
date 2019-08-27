function init() { 
  GETDISTANCE();
  GETDURATION();
}

function getDirections(origin, destination) {
  const directions = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(Maps.DirectionFinder.Mode.DRIVING)
    .getDirections();
 
  return directions;
}

function GETDISTANCE(origin, destination) {
  const directions = getDirections(origin, destination);
  const distance = directions.routes[0].legs[0].distance.text;
  
  return distance;
}

function GETDURATION(origin, destination) {
  const directions = getDirections(origin, destination);
  const duration = directions.routes[0].legs[0].duration.text;
  
  return duration; 
}