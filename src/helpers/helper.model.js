<<<<<<< HEAD
import ValidateError from '@/errors/error.validate';

export function createModelFromResponseData(Class, data) {
  const lengthDataProps = Object.keys(data).length;
  if (Class.properties.length === lengthDataProps) {
    for (let i in Class.properties) {
      const property = Class.properties[i];
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
=======
export function validateResponse(property, response){
    // property is Object and response is Object
    const responseProps = Object.getOwnPropertyNames(response)
    for(let i in responseProps){
        const responseProp = responseProps[i]
        
    }
}
>>>>>>> 4ae8519 (exit)
