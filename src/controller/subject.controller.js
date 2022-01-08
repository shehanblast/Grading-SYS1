const Subject = require('../model/subject.model');

const createSubject = async (req, res) => {
  if (req.body) {
    const subject = new Subject(req.body);
    subject.save()
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

const getAllSubjects = async (req, res) => {

  try {
    const products = await Subject.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }

}

const getSubject = async (req, res) => {
  await Subject.find({ amount: {$lt: 3000}})
  .then(data => {
    res.status(200).send({ data: data });
  })
  .catch(error => {
    res.status(500).send({ error: error.message });
  });
}

module.exports = {
  createSubject,
  getSubject,
  getAllSubjects
};