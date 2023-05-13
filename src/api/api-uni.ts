const getAllData = () => {
  return fetch(`http://universities.hipolabs.com/search`, {
    method: "GET",
  })
    .then((response) => {
      const data = response.json();
      return data;
    })
    .catch((err) => console.log(err));
};

export { getAllData };
