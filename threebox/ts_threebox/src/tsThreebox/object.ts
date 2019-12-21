import { ICreateObjectOptions } from "./interfaces";
import { CONSTANTS } from "./utils/constants";
import * as THREE from "three";
import { utils } from "./utils/utils";

export class TBObject extends THREE.Group {
    private object: THREE.Mesh;
    private options: ICreateObjectOptions;

    constructor(object: THREE.Mesh, options: ICreateObjectOptions) {
        super();

        // NOTA BENE: left out animation manager to see what exactly happens

        const scale = Math.abs(
            CONSTANTS.WORLD_SIZE /
                Math.cos(CONSTANTS.DEG2RAD * options.coordinates.lat) /
                CONSTANTS.EARTH_CIRCUMFERENCE
        );
        object.scale.set(scale, scale, scale);

        const radians = utils.radified(options.rotation);

        object.rotation.x = radians.x;
        object.rotation.y = radians.y;
        object.rotation.z = radians.z;

        

        this.object = object;
        this.options = options;
        this.add(object);
    }
}
