import * as express from 'express';
import { Application } from 'express';
import { getAllCourses, getCourseById } from './get-courses.route';
import { AddressInfo } from 'net';
import { loginUser } from './auth.route';
import { saveCourse } from './save-course.route';
import { searchLessons } from './search-lessons.route';

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(bodyParser.json());

app.route('/api/login').post(loginUser);

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').put(saveCourse);

app.route('/api/courses/:id').get(getCourseById);

app.route('/api/lessons').get(searchLessons);

const httpServer = app.listen(9000, () => {
  const address: AddressInfo = httpServer.address() as AddressInfo;
  console.log('HTTP REST API Server running at http://localhost:' + address.port);
});
