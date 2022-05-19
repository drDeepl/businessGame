export default class ModelObtainToken {
  constructor(data) {
    this.refresh = data.refresh;
    this.access = data.access;
    this.username = data.username;
  }
}
