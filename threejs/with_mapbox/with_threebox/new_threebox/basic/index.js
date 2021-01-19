mapboxgl.accessToken = MAPBOX_TOKEN;

const BARANGAROO = [151.200129, -33.864758];
const [lat, lng] = BARANGAROO;

var map = (window.map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    zoom: 18,
    center: [lat, lng],
    pitch: 60,
    antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
}));

map.on("load", () => {
    map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
            "fill-extrusion-color": "#ccc",
            "fill-extrusion-height": ["get", "height"],
        },
    });

    map.addLayer({
        id: "custom_layer",
        type: "custom",
        renderingMode: "3d",
        onAdd: function (map, mbxContext) {
            // instantiate threebox
            tb = new Threebox(map, mbxContext, { defaultLights: true });

            const geo = new THREE.BoxGeometry(10, 10, 178);
            const mat = new THREE.MeshLambertMaterial({ color: "blue" });
            const mesh = new THREE.Mesh(geo, mat);

            const tbObject = tb
                .Object3D({
                    obj: mesh,
                    units: "meters",
                })
                .setCoords([lat, lng])
                .set({
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 10,
                    },
                });

            //instantiate a red sphere and position it at the origin lnglat
            var sphere = tb
                .sphere({ color: "red", material: "MeshBasicMaterial" })
                .setCoords([lat, lng]);
            // add sphere to the scene
            tb.add(sphere);

            tb.add(tbObject);
        },

        render: function () {
            tb.update();
        },
    });
});
