import SunCalc from "suncalc";
import { Vector3 } from "three";

const trueNorth = (distance: number, lat: number, lng: number): Vector3 => {
    const northVector = new Vector3(0, 0, 0);
    const date = new Date();
    date.setHours(12, 0, 0, 0);

    const northPosition = SunCalc.getPosition(date, lat, lng);

    northVector.set(
        //X
        distance * Math.cos(Math.PI / 2 + northPosition.azimuth),
        //Y
        distance *
            Math.cos(northPosition.altitude) *
            Math.sin(Math.PI / 2 + northPosition.azimuth),
        //Z
        0
    );

    // const { x, y } = northVector;

    // const euler = new Euler(x, y);

    // console.log("euler", euler);

    return northVector;
};

export default trueNorth;