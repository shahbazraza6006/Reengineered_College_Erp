import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import { Spinner } from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const LoadingErrorSection = ({ loading, error }) => (
  <div className={classes.loadingAndError}>
    {loading && (
      <Spinner
        message="Loading"
        height={50}
        width={150}
        color="#111111"
        messageColor="blue"
      />
    )}
    {error.noSubjectError && (
      <p className="text-red-500 text-2xl font-bold">{error.noSubjectError}</p>
    )}
  </div>
);

const SubjectData = ({ subjects, classes }) => (
  <div className={classes.adminData}>
    <div className="grid grid-cols-7">
      {/* Render Subject Data */}
    </div>
    {subjects?.map((sub, idx) => (
      <div key={idx} className={`${classes.adminDataBody} grid-cols-7`}>
        {/* Render Subject Data Body */}
      </div>
    ))}
  </div>
);

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [value, setValue] = useState({
    department: "",
    year: "",
  });
  const [search, setSearch] = useState(false);
  const subjects = useSelector((state) => state.admin.subjects.result);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getSubject(value));
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>
        <div className=" mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem]">
          <div className="col-span-3 mr-6">
            <LoadingErrorSection loading={loading} error={error} />
            {!loading && Object.keys(error).length === 0 && subjects?.length !== 0 && (
              <SubjectData subjects={subjects} classes={classes} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
