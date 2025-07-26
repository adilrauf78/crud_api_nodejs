// GET ALL STUDENT LIST

const db = require("../config/database");

const getStudent = async (req, res) =>{
    try {
        const data = await db.query(' SELECT * From students')
        if(!data){
            return res.status(404).send({
                success: false,
                message: 'No Record Found'
            })
        }
        res.status(200).send({
                success: true,
                message: 'All Students Record',
                totalStudents: data[0].length,
                data: data[0],
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get all Students in API",
            error,
        });
    }
}

// Get Student by Id

const getStudentById = async (req, res) =>{
try {
    const studentId = req.params.id;
    if(!studentId){
        return res.status(404).send({
            success: false,
            message: "Invalid or Provide Student Id",
        })
    }
    const data = await db.query('SELECT * FROM students WHERE id=?', [studentId]);
    if(!data){
        return res.status(404).send({
            success: false,
            message: 'No Records Found',
        })
    }
    res.status(200).send({
        success: true,
        studentDetails: data[0],
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error in Get Student by Id in Api",
        error,
    })
}
}


// Create Student 
const createStudent = async (req, res) => {
    try {
        const {name, roll_no, phone_number} = req.body
        if(!name || !roll_no || !phone_number){
            return res.status(404).send({
                success: false,
                message: "Please provide all fields",
            })
        }
        const data = await db.query("INSERT INTO students (name, roll_no, phone_number) VALUES (?, ?, ?)",
            [name, roll_no, phone_number]);
        if(!data){
            return res.status(404).send({
                success: false,
                message: 'Error in Insert Query',
            })
        }
        res.status(201).send({
            success: true,
            message: "New Students Record Created",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error in Create Student in Api",
            error,
        }) 
    }
}

//Update Student Records

const updateStudentRecords = async (req,res) =>{
    try {
        const studentId = req.params.id;
        if(!studentId){
            res.status(404).send({
                success: false,
                message: "Invalid Id or Provide Id",
            })
        }
        const {name, roll_no, phone_number} = req.body;
        const data = db.query("UPDATE students SET name = ?, roll_no = ?, phone_number = ? WHERE id = ?", [name, roll_no, phone_number,studentId]);
        if(!data){
            res.status(500).send({
                success: false,
                message: 'Error in Update data',
            })
        }
        res.status(200).send({
            success: true,
            message: "Students Details Updated",
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update Student Records in Api',
            error,
        })
    }
}

// Delete Student Records
const deleteStudentRecords = async (req,res) =>{
    try {
        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: 'Please provide student Id or valid Id',
            })
        }
        await db.query('DELETE FROM students WHERE id = ?', [studentId]);
        res.status(200).send({
            success: true,
            message: 'Student Deleted Successfully',
        })
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success: false,
            message: 'Error in delete Student Record in Api',
            error
        })
    }
}

module.exports = {getStudent , getStudentById, createStudent, updateStudentRecords, deleteStudentRecords};