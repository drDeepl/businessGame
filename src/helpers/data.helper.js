export const checkObjNullUndef = function(object) {
  let result = String();
  for (let property in object) {
    if (object[property] === undefined || object[property] === null) {
      result += property + ':' + object[property] + '\n';
    }
  }
  if (result.length == 0) {
    return 'Not null or undefined';
  } else {
    throw new Error('Data have UNDEFINE or NULL');
  }
};
