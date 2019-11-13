export const add = (x, y) => x + y;

export const total = (subTotal, total) => {
    return "$" + add(subTotal, total);
};
