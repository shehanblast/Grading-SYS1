const express = require('express');
const router = express.Router();
const controller = require('../../controller/course.controller');

module.exports = function () {
  router.post('/create', controller.createCourse);
  router.get('/', controller.getAllCourses);
  router.get('/:id', controller.getSubjectsForCourse);
  router.get('/course/:id', controller.getSpecificCourse);
  return router;
}