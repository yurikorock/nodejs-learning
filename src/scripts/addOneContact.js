import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const addOneContact = async () => {
  const fakeContact = []; // створюємо масив для контактів

  const oneContact = createFakeContact();
  fakeContact.push(oneContact);
  const existingContacts = await readContacts(); //отримуємо існуючі контакти
  if (!existingContacts) {
    console.error('не вдалося прочитати існуючі контакти.');
    return;
  }
  const allContacts = [...existingContacts, ...fakeContact]; //записуємо до існуючих контактів 1 фейковий контакт
  await writeContacts(allContacts); // записуємо назад оновлені контакти в db.json
  console.log(`Додано нових контактів в кількості : 1`);
};

addOneContact();

// У файлі src / scripts / addOneContact.js опишіть функцію addOneContact.
// Вона має додавати до масиву у файлі src / db / db.json лише один згенерований контакт.
// Забезпечте правильне додавання одного контакту до масиву, збереження змін у файлі.

// Перевірити роботу функції можна виконавши команду npm run add-one, яка буде
// виконувати код у файлі src / scripts / addOneContact.js.У файлі src / db / db.json
// мають відбутися відповідні зміни.
