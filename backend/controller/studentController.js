import student from "../models/student.js";
import Test from "../models/test.js";
import Student from "../models/student.js";
import Subject from "../models/subject.js";
import Marks from "../models/marks.js";
import Feedback from "../models/feedback.js";
import Attendence from "../models/attendance.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const studentLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log("studentLogin",username,password)
  const errors = { usernameError: String, passwordError: String };
  try {
    const existingStudent = await Student.findOne({ username });
    if (!existingStudent) {
      errors.usernameError = "Student doesn't exist.";
      return res.status(404).json(errors);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingStudent.password
    );
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const token = jwt.sign(
      {
        email: existingStudent.email,
        id: existingStudent._id,
      },
      "sEcReT",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingStudent, token: token });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };
    if (newPassword !== confirmPassword) {
      errors.mismatchError =
        "Your password and confirmation password do not match";
      return res.status(400).json(errors);
    }

    const student = await Student.findOne({ email });
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();
    if (student.passwordUpdated === false) {
      student.passwordUpdated = true;
      await student.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: student,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const {
      name,
      dob,
      department,
      contactNumber,
      avatar,
      email,
      batch,
      section,
      year,
      fatherName,
      motherName,
      fatherContactNumber,
    } = req.body;

    const updatedStudent = await Student.findOne({ email });

    const updateField = async (field, value) => {
      if (value !== undefined) {
        updatedStudent[field] = value;
        await updatedStudent.save();
      }
    };

    await Promise.all([
      updateField('name', name),
      updateField('dob', dob),
      updateField('department', department),
      updateField('contactNumber', contactNumber),
      updateField('avatar', avatar),
      updateField('batch', batch),
      updateField('section', section),
      updateField('year', year),
      updateField('fatherName', fatherName),
      updateField('motherName', motherName),
      updateField('fatherContactNumber', fatherContactNumber),
    ]);

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const testResult = async (req, res) => {
  try {
    const { department, year, section } = req.body;
    const errors = { notestError: String };
    const student = await Student.findOne({ department, year, section });
    const test = await Test.find({ department, year, section });
    if (test.length === 0) {
      errors.notestError = "No Test Found";
      return res.status(404).json(errors);
    }
    var result = [];
    for (var i = 0; i < test.length; i++) {
      var subjectCode = test[i].subjectCode;
      var subject = await Subject.findOne({ subjectCode });
      var marks = await Marks.findOne({
        student: student._id,
        exam: test[i]._id,
      });
      if (marks) {
        var temp = {
          marks: marks.marks,
          totalMarks: test[i].totalMarks,
          subjectName: subject.subjectName,
          subjectCode,
          test: test[i].test,
        };

        result.push(temp);
      }
    }

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const attendance = async (req, res) => {
  try {
    const { department, year, section } = req.body;
    const errors = { notestError: String };
    const student = await Student.findOne({ department, year, section });

    const attendence = await Attendence.find({
      student: student._id,
    }).populate("subject");
    if (!attendence) {
      res.status(400).json({ message: "Attendence not found" });
    }

    res.status(200).json({
      result: attendence.map((att) => {
        let res = {};
        res.percentage = (
          (att.lectureAttended / att.totalLecturesByFaculty) *
          100
        ).toFixed(2);
        res.subjectCode = att.subject.subjectCode;
        res.subjectName = att.subject.subjectName;
        res.attended = att.lectureAttended;
        res.total = att.totalLecturesByFaculty;
        return res;
      }),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const giveFeedback = async (req, res) => {
  try{

    const { department, year, section } = req.body;
    const errors = {notesError : String};
    const student = await Student.findOne({department, year, section});

    //Find the subject to which the student wants to give feedback
    const subject = await Subject.findOne({subjectCode : req.body.subjectCode});

    //Check if the student has already given feedback to the subject
    const feedback = await Feedback.findOne({student : student._id, subject : subject._id});

    if(feedback){
      errors.notesError = "You have already given feedback to this subject";
      return res.status(400).json(errors);
    }
    else{
      const newFeedback = new Feedback({
        subject : subject,
        student : student,
        feedbackComments : req.body.feedbackComments,
      })
      await newFeedback.save();
      res.status(200).json({message : "Feedback given successfully"});
    }


  } catch (error) {
    res.status(400).json({
      message : "something went wrong with feedback",
      error : error.message
    })
  }
}
