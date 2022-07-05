import ValidationError from '@/errors/error.validate';

export function validateUndefined(model) {
  for (let propertyName in model) {
    if (model[propertyName] === null || model[propertyName] === undefined) {
      throw new ValidationError('Property null or undefined');
    }
  }
}

export function modelToJSON(model) {
  let JSON_Data = {};
  for (let i in model) {
    if (typeof model[i] != 'object') {
      JSON_Data[i] = model[i];
    }
  }
  return JSON_Data;
}
