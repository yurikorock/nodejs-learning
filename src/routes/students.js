import express from 'express';
import {
  getStudentsController,
  getStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getStudentsController));

router.get('/:id', ctrlWrapper(getStudentController));

// router.post('/students', async (req, res) => {
//   const student = await Student.create({
//     name: 'John2',
//     year: 1990,
//     gender: 'male',
//     onDuty: true,
//   });

//   res.status(201).json(student);
// });
export default router;
