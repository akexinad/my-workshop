import { capitalize } from "lodash";

const capitalizeEach = (item: string | number) => {
  if (!item) return "";

  const string = item.toString();

  return string
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

export default capitalizeEach;
