export function prepareTypes(model, modelTypes, passed = []) {
  // NOTE: Функция принимает на вход заполненую модель с данными из формы
  // NOTE: и модель с типами данных
  // NOTE: Где каждому свойству из model соответствует тип данных из modelTypes
  // NOTE: toDispatcherType является словарём
  // NOTE: который приводит значения из model к типу в modelType
  console.warn('HELPER.FORM: validateForm');
  console.log(modelTypes);
  const result = {};
  const toDispatcherType = {
    number: Number.parseInt,
  };
  for (let key in model) {
    const type = typeof model[key];
    if (passed.indexOf(key) < 0) {
      if (type != modelTypes[key]) {
        const newValueType = toDispatcherType[modelTypes[key]](model[key]);
        result[key] = newValueType;
      } else {
        result[key] = model[key];
      }
    } else {
      result[key] = model[key];
    }
  }
  console.warn('PREAPRED COMPLETE', model);
  return result;
}
