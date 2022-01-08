const express = require('express');
const router = express.Router();
const controller = require('../../controller/subject.controller');

module.exports = function () {
  router.post('/create', controller.createSubject);
  router.get('/', controller.getAllSubjects);
  router.get('/:id', controller.getSubjectOfStudent);
  return router;
}