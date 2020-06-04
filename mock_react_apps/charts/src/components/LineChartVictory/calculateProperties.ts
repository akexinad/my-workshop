interface IBackgroundProperties {
    height: number;
    initialYPosition: number;
    yOffset: number;
}

export const calculateProperties = (
    tickLength: number
): IBackgroundProperties => {
    switch (tickLength) {
        case 4:
            return {
                height: 50,
                initialYPosition: 0,
                yOffset: 50
            };
        case 5:
            return {
                height: 40,
                initialYPosition: 10,
                yOffset: 40
            };
        case 6:
            return {
                height: 33.5,
                initialYPosition: 16,
                yOffset: 33.5
            };
        case 7:
            return {
                height: 28.5,
                initialYPosition: 21,
                yOffset: 28.5
            };
        default:
            return {
                height: 0,
                initialYPosition: 0,
                yOffset: 0
            };
    }
};
