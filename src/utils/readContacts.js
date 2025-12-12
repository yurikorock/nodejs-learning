import { PATH_DB } from '../constants/contacts.js';
import path from 'node:path';
import fs from 'node:fs/promises';

const pathToDb = path.resolve(process.cwd(), PATH_DB);

export const readContacts = async () => {
  try {
    const fileContent = await fs.readFile(pathToDb, 'utf8');
    // console.log('Вміст файлу:', fileContent);
    return JSON.parse(fileContent);
  } catch (err) {
    console.error('Помилка читання файлу:', err);
    return null;
    //   throw new Error('Не вдалося прочитати файл контактів');
  }
};

// У файлі src / utils / readContacts.js опишіть утилітну функцію readContacts.
// Вона має зчитувати вміст файлу src / db / db.json та повертати його.
// Функція повинна коректно обробляти дані та забезпечувати правильне зчитування даних з файлу.
