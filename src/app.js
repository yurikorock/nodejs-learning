import express from 'express';
import { Student } from './models/students.js';

const app = express();
app.use(express.json());

app.get('/students', async (request, response) => {
  const students = await Student.find();
  // console.log(students);

  response.json({
    status: 200,
    message: 'Successfully get all students',
    data: students,
  });
});

app.get('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
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
});

app.post('/students', async (req, res) => {
  const student = await Student.create({
    name: 'John2',
    year: 1990,
    gender: 'male',
    onDuty: true,
  });

  res.status(201).json(student);
});

export default app;
