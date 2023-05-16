import { API_URL } from "../config";

const getAllData = async () => {
  try {
    const data = await (await fetch(API_URL)).json();
    for (let i = 0; i < data.length; i++) {
      data[i].id = i;
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};

export { getAllData };
