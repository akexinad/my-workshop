import { GUI } from "dat.gui";

export const addGUIControls = (
    effectController: {},
    handleChange: () => void
) => {
    const gui = new GUI();

    gui.domElement.id = "gui";

    gui.add(effectController, "turbidity", 1.0, 20.0, 0.1).onChange(
        handleChange
    );
    gui.add(effectController, "rayleigh", 0.0, 4, 0.001).onChange(handleChange);
    gui.add(effectController, "mieCoefficient", 0.0, 0.1, 0.001).onChange(
        handleChange
    );
    gui.add(effectController, "mieDirectionalG", 0.0, 1, 0.001).onChange(
        handleChange
    );
    gui.add(effectController, "luminance", 0.0, 2).onChange(handleChange);
    gui.add(effectController, "inclination", 0, 1, 0.0001).onChange(
        handleChange
    );
    gui.add(effectController, "azimuth", 0, 1, 0.0001).onChange(handleChange);
    // gui.add(effectController, "sun").onChange(handleChange);

    handleChange();
};
