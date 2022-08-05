import {ValidateError} from '@/errors/error.validate';

export function createModelFromResponseData(Class, data) {
  const lengthDataProps = Object.keys(data).length;
  if (Class.props.length === lengthDataProps) {
    for (let i in Class.props) {
      const property = Class.props[i];
      if (data[property] == null || data[property] == 'undefined') {
        throw new ValidateError(
          'MODEL.USER',
          'property value is null or undefined'
        );
      } else {
        Class[property] = data[property];
      }
    }
  } else {
    throw new ValidateError(
      'MODEL.USER',
      'length data props not equal length properties'
    );
  }
  return Class;
}

export function isUniqObj(newModel, oldModel) {
  console.warn(newModel, oldModel);
}
