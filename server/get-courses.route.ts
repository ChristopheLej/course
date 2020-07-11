import { Request, Response } from 'express';
import { COURSES } from './db-data';
import { Sleep } from './sleep';

export function getAllCourses(req: Request, res: Response) {
  console.log('Retrieving courses data ...');
  Sleep.msleep(1000);

  res.status(200).json({ payload: Object.values(COURSES) });
}

export function getCourseById(req: Request, res: Response) {
  const courseId = parseInt(req.params['id'], 10);

  const courses = Object.values(COURSES);

  const course = courses.find(course => course.id === courseId);

  res.status(200).json(course);
}
