import { useEffect } from "react";
import { useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraController = () => {
    const {
        camera,
        gl: { domElement },
    } = useThree();

    useEffect(() => {
        const controls = new OrbitControls(camera, domElement);

        controls.minDistance = 0.001;
        controls.maxDistance = 200;

        return () => controls.dispose();
    }, [camera, domElement]);

    return null;
};

export default CameraController;
