import {faker} from '@faker-js/faker';

export function createRandomUser(model) {
  model.username = faker.lorem.word(5);
  model.first_name = faker.name.firstName();
  model.last_name = faker.name.lastName();
  model.email = faker.internet.email();
  model.password = faker.internet.password();
  return model;
}
