export function validateForm(validateModel) {
  // NOTE: Функция принимает на вход модель vuevalidate
  // NOTE: Проходит по всем значениям $param
  // NOTE: Проверяет их на валидность
  // NOTE: Названия невалидных свойств отправляет в массив errors
  // NOTE: =========================================================
  console.warn('HELPER.FORM: validateForm');
  let errors = [];
  for (let key in validateModel.$params) {
    if (validateModel[key].$invalid) {
      errors.push(key);
    }
  }
  return errors;
}
