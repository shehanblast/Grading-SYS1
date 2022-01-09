const Course = require('../model/course.model');
const mongoose = require("mongoose");

const createCourse = async (req, res) => {
  if (req.body) {
    const course = new Course(req.body);
    await course.save()
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

const getAllCourses = async (req, res) => {
  await Course.find({}).populate('subjects', 'name description marks reviews')
  .then(data => {
    res.status(200).send({ data: data });
  })
  .catch(error => {
    res.status(500).send({ error: error.message });
  });
}

const getSubjectsForCourse = async (req, res) => {
  if (req.params && req.params.id) {
    await Course.findById(req.params.id)
    .populate('subjects', 'name description marks reviews')
    .then(data => {
      res.status(200).send({ subjects: data.subjects });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

const getSpecificCourse = async (req, res) => {
  if (req.params && req.params.id) {
    await Course.findById(req.params.id)
        .then(data => {
          res.status(200).send({ data: data});
        })
        .catch(error => {
          res.status(500).send({ error: error.message });
        });
  }
}

module.exports = {
  createCourse,
  getAllCourses,
  getSubjectsForCourse,
  getSpecificCourse
};