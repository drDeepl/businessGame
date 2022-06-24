import ValidateError from '@/errors/error.validate';

export function validatePropertyResponse(model) {
  // Данная функция принимает на вход модель
  // В этой модели уже находится список необходимых свойств
  // Проходит итерация по списку свойств внутри модели
  // Проходит проверка значения свойства
  // В случае выпадения Null -> Исключение
  const validatedProps = model.props;
  for (let i in validatedProps) {
    let prop = validatedProps[i];
    console.log(prop);
    if (model[prop] == null || model[prop] == 'undefined') {
      throw new ValidateError('Property is null or undefined');
    }
  }
}
