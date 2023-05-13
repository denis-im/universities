import { API_URL } from "../config";

const getAllData = async (cb: any) => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    cb(data);
  } catch (err) {
    console.log(err);
  }
};

export { getAllData };
