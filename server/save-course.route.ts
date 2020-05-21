import { Request, Response } from 'express';
import { COURSES } from './db-data';

export function saveCourse(req: Request, res: Response) {
  console.log('Saving course ' + req.params['id'] + '...');

  // tslint:disable-next-line: one-variable-per-declaration
  const id = req.params['id'],
    changes = req.body;

  if (id === '0') {
    res.sendStatus(500);
  } else {
    COURSES[id] = {
      ...COURSES[id],
      ...changes
    };
    res.status(200).json(COURSES[id]);
  }
}
