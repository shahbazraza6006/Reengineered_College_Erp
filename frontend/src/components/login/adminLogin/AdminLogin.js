import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { adminSignIn } from "../../../redux/actions/adminActions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../utils/Spinner";

const LoginForm = ({
  translate,
  loading,
  error,
  username,
  password,
  showPassword,
  setUsername,
  setPassword,
  setShowPassword,
  handleLogin,
}) => (
  <form
    onSubmit={handleLogin}
    className={`${
      loading ? "h-[27rem]" : "h-96"
    } w-96 bg-[#2c2f35] flex flex-col items-center justify-center ${
      translate ? "-translate-x-[12rem]" : ""
    } duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl`}
  >
    <h1 className="text-white text-3xl font-semibold">Admin</h1>
    {/* Rest of the form */}
  </form>
);

const AdminLogin = () => {
  const [translate, setTranslate] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setTranslate(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
  }, [store.errors]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(adminSignIn({ username, password }, navigate));
  };

  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  }, [store.errors]);

  return (
    <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
      <div className="grid grid-cols-2">
        {/* First div */}
        {/* Second div */}
        <LoginForm
          translate={translate}
          loading={loading}
          error={error}
          username={username}
          password={password}
          showPassword={showPassword}
          setUsername={setUsername}
          setPassword={setPassword}
          setShowPassword={setShowPassword}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  );
};

export default AdminLogin;
