const express = require('express');
const { getStudent, getStudentById, createStudent, updateStudentRecords, deleteStudentRecords } = require('../controller/studentController');

// routes object
const router = express.Router();

// routes

// Get all student list || GET

router.get('/getall', getStudent);

//Get Student by Id
router.get('/get/:id', getStudentById);

//CREATE Student || Post
router.post('/create', createStudent)

//Update Student Records || Put
router.put('/update/:id', updateStudentRecords)

//Delete Student Record || Delete
router.delete('/delete/:id', deleteStudentRecords)

module.exports = router;