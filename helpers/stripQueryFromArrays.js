// if any value in queryObj is an array, it will get only the first element
// otherwise will leave it as is

const stripQueryFromArrays = (queryObj) => {
  let result = {};

  for (let key in queryObj) {
    if (Array.isArray(queryObj[key])) {
      result[key] = queryObj[key][0];
    } else {
      result[key] = queryObj[key];
    }
  }

  return result;
};

export default stripQueryFromArrays;
