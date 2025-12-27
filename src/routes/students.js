import express from 'express';
import {
  getStudentsController,
  getStudentController,
  createStudentController,
  deleteStudentController,
  updateStudentController,
  replaceStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidID } from '../middlewars/isValidId.js';
import { validateBody } from '../middlewars/validateBody.js';
import { studentSchema, updateStudentSchema } from '../validation/students.js';

const router = express.Router();

router.get('/', ctrlWrapper(getStudentsController));

router.get('/:id', isValidID, ctrlWrapper(getStudentController));

router.post(
  '/',
  validateBody(studentSchema),
  ctrlWrapper(createStudentController),
);

router.delete('/:id', isValidID, ctrlWrapper(deleteStudentController));

router.patch(
  '/:id',
  isValidID,
  validateBody(updateStudentSchema),
  ctrlWrapper(updateStudentController),
);

router.put(
  '/:id',
  isValidID,
  validateBody(studentSchema),
  ctrlWrapper(replaceStudentController),
);

export default router;
