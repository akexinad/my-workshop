// @ts-ignore
import { Threebox } from "threebox-map";

export const threeboxLayer: mapboxgl.CustomLayerInterface = {
    id: 'threebox_layer',
    type: 'custom',
    onAdd: (map: mapboxgl.Map, context: WebGLRenderingContext) => {
        
        const threebox = new Threebox(
            map,
            context,
            {
                defaultLights: true
            }
        )
        
    },

    render: () => {

    }
};
