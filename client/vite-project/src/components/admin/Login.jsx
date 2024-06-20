import { useEffect, useState } from "react";
import Header from "./Header";
import { login } from "../../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const [toastShown, setToastShown] = useState(false);

  const [loginData, setLoginData] = useState({
    f_userName: "",
    f_Pwd: ""
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    if (!loginData.f_userName) {
      setError("Username is required");
      return false;
    } else if (!loginData.f_Pwd) {
      setError("Password is required");
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await login(loginData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.data.f_userName);
      toast.success("Login successful!", { onClose: () => navigate("/home") });
    } catch (error) {
      setError("Invalid username or password");
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      if (!toastShown) {
        toast.error('Session expired. Please log in again.');
        setToastShown(true);
      }
      // Redirect to login page
      navigate('/login');
    }
  }, [toastShown, navigate]);
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-14">
        <ToastContainer />
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <div className="relative mb-4">
            <span>Username</span>
            <input
              type="text"
              name="f_userName"
              value={loginData.f_userName}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative mb-4">
            <span>Password</span>
            <input
              type="password"
              name="f_Pwd"
              value={loginData.f_Pwd}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
