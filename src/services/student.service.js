import { Student } from '../models/students.js';

export function getStudents() {
  return Student.find();
  // throw new Error("Cannot complete operation");
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
