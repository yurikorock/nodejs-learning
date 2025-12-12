import { faker } from '@faker-js/faker';

// export const createFakeContact = () => ({
//   id: faker.string.uuid(),
//   name: faker.person.fullName(),
//   phone: faker.phone.number(),
//   email: faker.internet.email(),
//   job: faker.person.jobTitle(),
// });

//створюємо шаблон 1 контакту з даними у вигляді обєкту
export const createFakeContact = () => {
  const randomId = faker.string.uuid();
  const randomName = faker.person.fullName();
  const randomPhoneNumber = faker.phone.number({ style: 'international' });
  const randomEmail = faker.internet.email();
  const randomJobTitle = faker.person.jobTitle();
  return {
    id: randomId,
    fullName: randomName,
    phonenumber: randomPhoneNumber,
    email: randomEmail,
    jobTitle: randomJobTitle,
  };
};
