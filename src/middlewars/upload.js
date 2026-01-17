import multer from 'multer';
import path from 'node:path';

// при створення студента ще й завантажуємо файли додаткові
// (чи то зображення чи то якийсь файл)б використовуючи multipart/form-data через HTTP-протокол
// в нас можуть бути різні типи файлів, і ми їх зберігаємо всі без розбору в tmp,
// а вже потім в студентконтроллерс ми зберігаємо куди треба
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('src/tmp'));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9); //унік префікс, щоб не затирати існ файли
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
