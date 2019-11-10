import { COMPARTMENT_1 } from './data/compartment1';
import { COMPARTMENT_2 } from './data/compartment2';
import { displayMap } from './mapbox';
import { Geo3 } from './vespucci/geo3';
import { map } from './mapbox';
import { Polygon } from './threeBuilder';

import { Threebox } from './threebox/Threebox';

// console.log(Threebox);

displayMap();

const shape = new Polygon(COMPARTMENT_1.geometry);
console.log(shape);
