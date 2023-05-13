import { API_URL } from "../config";

const getAllData = async () => {
  try {
    const data = await (await fetch(API_URL)).json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { getAllData };
