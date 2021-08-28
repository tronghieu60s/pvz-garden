export const objectToArray = (object, nameKey = "key") => {
  const objectArr = [];
  for (const key in object) {
    const newObject = { ...object[key], [nameKey]: key };
    if (Object.prototype.hasOwnProperty.call(object, key))
      objectArr.push(newObject);
  }
  return objectArr;
};
