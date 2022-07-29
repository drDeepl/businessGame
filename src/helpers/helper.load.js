export async function loadingRequest(loadState, func, arg) {
  // NOTE: Фунцкия принимает объект с состояние загрузки компонентами
  // NOTE: функцию для обращения к апи
  // NOTE: один аргумент для функции
  // NOTE: возвращает фунцкия результат запроса
  loadState = true;
  console.warn('load: ' + loadState);
  const response = await func(arg);
  loadState = false;
  console.warn('load: ' + loadState);
  return response;
}
