export function ValidateResponse(model, response) {
  console.log('ValidateResponse:' + response);
  for (let prop in model) {
    console.log(prop);
  }
}
