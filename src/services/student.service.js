import { Student } from '../models/students.js';

export function getStudents() {
//   return Student.find();
throw new Error("Cannot complete operation");
}

export function getStudentById(studentId) {
  return Student.findById(studentId);
}
