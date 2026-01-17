import * as fs from 'node:fs/promises';
import path from 'node:path';
import createHttpError from 'http-errors'; // 2 крок щоб вдосконалити відображення статус кодів

import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
  replaceStudent,
} from '../services/student.service.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getStudentsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await getStudents(
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    req.user.id,
  ); // req.user.id для сортування хто має доступ до своїх студентів
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
    throw new createHttpError.NotFound('Student not found'); // alternative
    // return res
    //   .status(404)
    //   .json({ status: 404, message: 'Student not found', data: null });
  }

  if (student.ownerId.toString() !== req.user.id.toString()) {
    // throw new createHttpError.Forbidden('Student resctricted'); // academical response
    throw new createHttpError.NotFound('Student not found'); // best practice
  }
  res.json({
    status: 200,
    message: 'Successfully get one student',
    data: student,
  });
}

export async function createStudentController(req, res) {
  await fs.rename(
    req.file.path,
    path.resolve('src/uploads/avatars', req.file.filename),
  ); // це вже другим етапом додаємо для того куди вантажимо аватар

  // const student = await createStudent(req.body); було
  const student = await createStudent({
    ...req.body,
    avatar: `http://localhost:8080/avatars/${req.file.filename}`, //додали другим етапом для зчитування аватарки фронтендом поля аватар
    ownerId: req.user.id,
  }); // стало
  // ownerId: req.user.id добавили, щоб визначати юзера хто власник створення

  console.log(student);
  res.status(201).json({
    status: 201,
    message: 'Student created successfully',
    data: student,
  });
}

export async function deleteStudentController(req, res) {
  const result = await deleteStudent(req.params.id);
  if (result === null) {
    throw new createHttpError.NotFound('Student not found');
    // return res
    //   .status(404)
    //   .json({ status: 404, message: 'Student not found', data: null });
  }
  res.status(204).end(); //variant 1
  //   res.json({
  //     status: 200,
  //     message: 'Student deleted successfully',
  //   }); // variant 2
}
export async function updateStudentController(req, res) {
  const result = await updateStudent(req.params.id, req.body);
  if (result === null) {
    throw new createHttpError.NotFound('Student not found');
    // return res
    //   .status(404)
    //   .json({ status: 404, message: 'Student not found', data: null });
  }

  res.status(200).json({
    status: 200,
    message: 'Student updated successfully',
    data: result,
  });
}
export async function replaceStudentController(req, res) {
  const { value, updatedExisting } = await replaceStudent(
    req.params.id,
    req.body,
  );

  if (updatedExisting === true) {
    res.status(200).json({
      status: 200,
      message: 'Student replace successfully',
      data: value,
    });
  }
  res.status(201).json({
    status: 201,
    message: 'Student created successfully',
    data: value,
  });
}
