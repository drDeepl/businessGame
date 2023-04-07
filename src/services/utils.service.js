export const getItemFromLocalStorage = function (key) {
  const item = JSON.parse(localStorage.getItem(key));
  return item;
};

export const setItemToLocalStorage = function (key, value) {
  const item = JSON.stringify(value);
  localStorage.setItem(key, item);
};
