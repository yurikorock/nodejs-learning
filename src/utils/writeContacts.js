import { PATH_DB } from '../constants/contacts.js';
import path from 'node:path';
import fs from 'node:fs/promises';

const pathToDb = path.resolve(process.cwd(), PATH_DB);

export const writeContacts = async (updatedContacts) => {
  const data = JSON.stringify(updatedContacts, null, 2);
  try {
    await fs.writeFile(pathToDb, data, 'utf8');
    console.log('Дані успішно записані в файл.');
  } catch (err) {
    console.error('Помилка запису в файл:', err);
  }
};

// У файлі src / utils / writeContacts.js опишіть утилітну функцію writeContacts.
// Вона має записувати дані у файл src / db / db.json.
// Функція повинна коректно приймати дані як параметр та забезпечувати правильний запис даних у файл.
