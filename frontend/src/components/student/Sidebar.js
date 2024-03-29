import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";

const NavLinkComponent = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
    >
      {icon && <icon className="" />}
      <h1 className="font-normal">{label}</h1>
    </NavLink>
  );
};

const Sidebar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: "LOGOUT" });
    navigate("/login/studentlogin");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("faculty")));
  }, [navigate]);

  return (
    <div className="flex-[0.2]">
      <div className="space-y-8 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 h-[33rem]">
        <div className="">
          <NavLinkComponent
            to="/student/home"
            icon={HomeIcon}
            label="Dashboard"
          />
          <NavLinkComponent
            to="/student/profile"
            icon={AssignmentIndIcon}
            label="Profile"
          />
        </div>
        <div className="">
          <NavLinkComponent
            to="/student/testresult"
            icon={AddIcon}
            label="Test results"
          />
          <NavLinkComponent
            to="/student/attendance"
            icon={AddIcon}
            label="Attendance"
          />
        </div>
        <div className="">
          <NavLinkComponent
            to="/student/subjectlist"
            icon={EngineeringIcon}
            label="Subject List"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
