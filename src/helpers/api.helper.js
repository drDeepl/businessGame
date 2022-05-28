import ValidationError from '@/errors/error.validate';

export default function validateUndefined(model) {
  for (let propertyName in model) {
    if (model[propertyName] === null || model[propertyName] === undefined) {
      throw new ValidationError('Property null or undefined');
    }
  }
}
