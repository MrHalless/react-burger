import { url } from "./constant";

export const getData = async () => {
  const response = await fetch(url);
  return await response.json();
};
