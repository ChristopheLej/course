import { Request, Response } from 'express';
import { COURSES } from './db-data';
import { Sleep } from './sleep';

export function saveCourse(req: Request, res: Response) {
  console.log('Saving course ' + req.params['id'] + '...');
  Sleep.msleep(1500);

  // tslint:disable-next-line: one-variable-per-declaration
  const id = req.params['id'],
    changes = req.body;

  if (id === '0') {
    res.status(500).json(COURSES[id]);
  } else {
    COURSES[id] = {
      ...COURSES[id],
      ...changes
    };
    res.status(200).json(COURSES[id]);
  }
}
