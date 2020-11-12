import { capitalize } from "lodash";

export default (item: string | number) => {
  if (!item) return;

  const string = item.toString();

  return string
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};
