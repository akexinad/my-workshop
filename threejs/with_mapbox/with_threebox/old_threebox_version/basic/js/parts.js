const GEO_CONSTANTS = {
    DEG2RAD: 0.017453292519943295,
    EARTH_CIRCUMFERENCE: 40075000,
    MERCATOR_A: 6378137,
    PROJECTION_WORLD_SIZE: 0.025552079192733054,
    RAD2DEG: 57.29577951308232,
    WORLD_SIZE: 1024000
};

const projectedUnitsPerMeter = (latitude) => {
    return Math.abs( GEO_CONSTANTS.WORLD_SIZE / Math.cos( GEO_CONSTANTS.DEG2RAD * latitude ) / GEO_CONSTANTS.EARTH_CIRCUMFERENCE );
};

if (obj.userData.units === 'meters'){
    var s = projectedUnitsPerMeter(lnglat[1]);
    obj.scale.set(s,s,s);
}

// SETTING COORDINATES AND ROTATION

const addMethods = function(obj, static){
    
    var root = this;

    if (static) {

    }

    else {

        if (!obj.coordinates) obj.coordinates = [0,0,0];

        // Bestow this mesh with animation superpowers and keeps track of its movements in the global animation queue			
        root.animationManager.enroll(obj); 
        obj.setCoords = function(lnglat){

            /** Place the given object on the map, centered around the provided longitude and latitude
                The object's internal coordinates are assumed to be in meter-offset format, meaning
                1 unit represents 1 meter distance away from the provided coordinate.
            */

            // If object already added, scale the model so that its units are interpreted as meters at the given latitude
            if (obj.userData.units === 'meters'){
                var s = projectedUnitsPerMeter(lnglat[1]);
                obj.scale.set(s,s,s);
            }

            obj.coordinates = lnglat;
            obj.set({position:lnglat})
            

            return obj;

        }

        obj.setRotation = function(xyz) {

            if (typeof xyz === 'number') xyz = {z: xyz}

            var r = {
                x: utils.radify(xyz.x) || obj.rotation.x,
                y: utils.radify(xyz.y) || obj.rotation.y,
                z: utils.radify(xyz.z) || obj.rotation.z
            }

            obj._setObject({rotation: [r.x, r.y, r.z]})
        }

    }

    obj.add = function(){
        root.world.add(obj);
        if (!static) obj.set({position:obj.coordinates});
        return obj;
    }


    obj.remove = function(){
        root.world.remove(obj);
        root.map.repaint = true;
    }

    obj.duplicate = function(a) {
        var dupe = obj.clone(); 
        dupe.userData = obj.userData;
        root._addMethods(dupe);
        return dupe
    }

    return obj
},

radify = function(deg) {
    
    function convert(degrees){
        degrees = degrees || 0;
        return Math.PI*2*degrees/360
    }

    if (typeof deg === 'object'){

        //if [x,y,z] array of rotations
        if (deg.length > 0){
            return deg.map(function(degree){
                return convert(degree)
            })
        }

        // if {x: y: z:} rotation object
        else {
            return [convert(deg.x), convert(deg.y), convert(deg.z)]
        }
    }

    //if just a number
    else return convert(deg)
},