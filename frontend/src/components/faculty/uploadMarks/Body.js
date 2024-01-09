import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import { getStudent, uploadMark } from "../../../redux/actions/facultyActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { MARKS_UPLOADED, SET_ERRORS } from "../../../redux/actionTypes";
import { getTest } from "../../../redux/actions/facultyActions";

const SearchForm = ({ value, setValue, handleSubmit, tests }) => (
  <form className="flex flex-col space-y-2 col-span-1" onSubmit={handleSubmit}>
    {/* Input fields for Year, Section, Test */}
  </form>
);

const StudentList = ({ students, loading, error, search, handleInputChange, uploadMarks }) => (
  <div className="col-span-3 mr-6">
    {/* Loading and error messages */}
    {/* Student list rendering */}
  </div>
);

const Body = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const tests = store.faculty.tests.result;
  const [marks, setMarks] = useState([]);
  // ... rest of the component's state and useEffects

  const handleInputChange = (value, _id) => {
    // ... handle input change logic
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
  };

  const students = useSelector((state) => state.admin.students.result);
  // ... other functions and useEffects

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <BoyIcon />
          <h1>All Students</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          <SearchForm
            value={value}
            setValue={setValue}
            handleSubmit={handleSubmit}
            tests={tests}
          />
          <StudentList
            students={students}
            loading={loading}
            error={error}
            search={search}
            handleInputChange={handleInputChange}
            uploadMarks={uploadMarks}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
