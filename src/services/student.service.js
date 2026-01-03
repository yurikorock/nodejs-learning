import { Student } from '../models/students.js';

export async function getStudents(page, perPage, sortBy, sortOrder, filter) {
  // показує скільки документів нам треба пропустити для конкретної сторінки для пагінації
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const studentQuery = Student.find();

  //фільтрація елментів
  if (typeof filter.minYear !== 'undefined') {
    studentQuery.where('year').gte(filter.minYear);
  }

  if (typeof filter.maxYear !== 'undefined') {
    studentQuery.where('year').lte(filter.maxYear);
  }

  //   //визначаємо загальну кількість студентів
  //   const total = await Student.find().countDocuments();
  //   //визначаємо самих студентів
  //   const students = await studentQuery.skip(skip).limit(perPage);

  // а можна зробити щоб вони відбувались паралельно
  const [total, students] = await Promise.all([
    Student.find().merge(studentQuery).countDocuments(),
    studentQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]); //merge(studentQuery) для того щоб повертало фільтровану кількість, а не загальну

  const totalPages = Math.ceil(total / perPage);

  return {
    students,
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
}

export function getStudentById(studentId) {
  return Student.findById(studentId);
}

export function createStudent(payload) {
  return Student.create(payload);
}

export function deleteStudent(studentId) {
  return Student.findByIdAndDelete(studentId);
}

export function updateStudent(studentId, payload) {
  return Student.findByIdAndUpdate(studentId, payload, { new: true });
  //{new: true} щоб в консолі повертався оновлена сутність з бази
}
export async function replaceStudent(studentId, payload) {
  const result = await Student.findByIdAndUpdate(studentId, payload, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });
  //upsert: true якщо ми хочемо оновити документ якого немає, тоді документ буде створений
  //includeResultMetadata: true, додаткова інформація про створений обєкт, щоб потім надавати відповідь
  // чи був обєкт створений чи оновлений
  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}
