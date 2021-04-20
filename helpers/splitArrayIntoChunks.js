function splitArryIntoChunks(arr, chunkSize) {
  if (!Array.isArray(arr) || chunkSize < 1) {
    console.error("Wrong arguments for splitArryIntoChunks", arguments);
    return [];
  }

  let result = [];
  let i;
  const length = arr.length;

  for (i = 0; i < length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  return result;
}

export default splitArryIntoChunks;
