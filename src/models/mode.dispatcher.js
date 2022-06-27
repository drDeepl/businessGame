class DispatcherModel {
  constructor() {
    this.accountProps = ['id', 'is_unlimited', 'balance'];
  }
  createModelByName(name, data) {
    const Class = new Object();
    Class.name = name;
    const titleProps = name.toLowerCase() + 'Props';
    Class[titleProps] = this[titleProps];
    const lengthDataProps = Object.keys(data).length;
    if (Class[titleProps].length === lengthDataProps) {
      for (let i in Class.props) {
        const property = Class[titleProps][i];
        if (data[property] == null || data[property] == 'undefined') {
          throw new Error('MODEL.USER', 'property value is null or undefined');
        } else {
          Class[property] = data[property];
        }
      }
    } else {
      throw new Error(
        'MODEL.USER',
        'length data props not equal length properties'
      );
    }
    return Class;
  }
}

Function.prototype.
