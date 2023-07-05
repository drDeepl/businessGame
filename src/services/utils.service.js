export const getItemFromLocalStorage = function (key) {
  const item = JSON.parse(localStorage.getItem(key));
  return item;
};

export const setItemToLocalStorage = function (key, value) {
  const item = JSON.stringify(value);
  localStorage.setItem(key, item);
};

export const decorateResponseApi = async function (func, context) {
  let response = {status: 200, data: null, message: ''};

  const responseWrap = await func(context).catch((resp) => {
    response.status = resp.response.status;
  });
  if (response.status != 200) {
    response.message = 'Что-то пошло не так';
    return response;
  }
  response.data = responseWrap.response
    ? responseWrap.response.data
    : response.data;
  return response;
};

export const apiDecorator = async function (func, context) {
  console.warn('API.DECORATOR');
  let response = {status: 200, data: null, message: ''};
  console.log(func, context, response);
  await func(context)
    .catch((resp) => {
      console.warn(resp);
      response.status = resp.response.status;
      response.message = 'Что-то пошло не так...';
    })
    .then((resp) => {
      response.data = resp.data;
    });
  return response;
};
