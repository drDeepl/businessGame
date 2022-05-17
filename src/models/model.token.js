export default class ModelObtainToken {
  cunstructor(data = {}) {
    this.refresh = data.refresh;
    this.access = data.access;
    this.username = data.username;
  }
}
