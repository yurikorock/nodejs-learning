import { readContacts } from '../utils/readContacts.js';

export const getAllContacts = async () => {
  return await readContacts();
};

console.log(await getAllContacts());

// У файлі src / scripts / getAllContacts.js опишіть функцію getAllContacts.
// Вона має повертати масив контактів із файлу src / db / db.json.
// Функція має коректно читати масив контактів з файлу.

// Перевірити роботу функції можна виконавши команду npm run get-all,
// яка буде виконувати код у файлі src / scripts / getAllContacts.js.
