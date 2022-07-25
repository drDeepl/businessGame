import validator from 'validator';
export function codeErrorResponse(error) {
  console.warn('HELPER.ERROR: codeErrorResponse');
  const errorJSON = error.toJSON();
  const erMessage = errorJSON.message;
  const arrayWords = erMessage.split(' ');
  for (let _ in arrayWords) {
    const isInt = validator.isInt(arrayWords[_]);
    if (isInt) {
      const errorCode = Number.parseInt(arrayWords[_]);
      return errorCode;
    }
  }
  return false;
}
