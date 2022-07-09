import validator from 'validator';

export function formIsValid(fields, modelWithData, types) {
  // INFO: fields {key: 'value label in form'}
  // INFO: modelWithData {key: valie input form}
  // NOTE: Функция принимает на вход объект поля поля ввода из формы fields
  // NOTE: И модель с данными формы
  // NOTE: В fields -> key - ключ объекта из БД, а значение название поля в форме
  // NOTE: функция проходит по всем ключам из fields
  // NOTE: Затем проверяет по ключу key значеие из modelWithData
  // NOTE: Если данные не соответствую, то происходит запись в массив errors
  // NOTE: Значения label из fields
  let errors = [];
  console.warn('HELPER.FORM: formIsValid');
  console.warn(fields);
  console.log(modelWithData);
  console.error(types);
  for (let key in fields) {
    const value = modelWithData[key];
    if (value == null || value == 'indefined') {
      errors.push(fields[key]);
    } else if (validator.isEmpty(value)) {
      errors.push(fields[key]);
    } else if (key.toLowerCase() == 'email') {
      if (!validator.isEmail(value)) {
        errors.push(fields[key]);
      }
    }
    if (types[value] == 'integer') {
      if (!validator.isInt(value)) {
        errors.push(value + ' не является числом');
      }
    }
  }
  return errors;
}
