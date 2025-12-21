import { getStudents, getStudentById } from '../services/student.service.js';

export async function getStudentsController(req, res) {
  const students = await getStudents();
  // console.log(students);
  res.json({
    status: 200,
    message: 'Successfully get all students',
    data: students,
  });
}

export async function getStudentController(req, res) {
  const student = await getStudentById(req.params.id);
  if (student === null) {
    return res
      .status(400)
      .json({ status: 404, message: 'Student not found', data: null });
  }
  res.json({
    status: 200,
    message: 'Successfully get one student',
    data: student,
  });
}
