import { writeContacts } from '../utils/writeContacts.js';
import { getAllContacts } from './getAllContacts.js';

export const removeLastContact = async () => {
  const arrayContacts = await getAllContacts(); // отримуємо існуючі контакти
  if (arrayContacts.length > 0) {
    arrayContacts.pop(); // видаляємо останній контакт
    return await writeContacts(arrayContacts); // зберігаємо новий масив контактів
  }
};

removeLastContact();

// Крок 8

// У файлі src / scripts / removeLastContact.js опишіть функцію removeLastContact,
// яка видалятиме останній контакт з масиву, якщо в масиві є хоча б один елемент.

// Перевірити роботу функції можна виконавши команду npm run remove-last,
// яка буде виконувати код у файлі src / scripts / removeLastContact.js.
// У файлі src / db / db.json мають відбутися відповідні зміни.
