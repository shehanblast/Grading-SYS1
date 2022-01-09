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
    const products = await Subject.find({}).populate('courses','name');
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

const getSubjectOfStudent = async (req, res) => {

    await Subject.find({user: req.params.id})
        .then(data => {
          res.status(200).send({data: data});
        })
        .catch(error => {
          res.status(500).json({message: "Server Error"});
        });

}




module.exports = {
  createSubject,
  getSubject,
  getSubjectOfStudent,
  getAllSubjects
};