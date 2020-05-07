import { GUI } from "dat.gui";
import { IEffectController } from "../interfaces";

export const addGUIControls = (
    effectController: IEffectController,
    handleChange: () => void
) => {
    const gui = new GUI();

    gui.domElement.id = "gui";

    console.log((gui.domElement.parentNode));

    gui.add(effectController, "inclination", 0, 1, 0.0001).onChange(
        handleChange
    );
    gui.add(effectController, "azimuth", 0, 1, 0.0001).onChange(handleChange);

    handleChange();
};

