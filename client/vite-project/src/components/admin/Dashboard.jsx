import { useEffect } from "react";
import HeaderWithnav from "./HeaderWithnav";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const navigate = useNavigate(); // Define navigate hook first

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page if token is missing
      navigate('/login');
      toast.error('Session expired. Please log in again.');
    }
  }, []);

  return (
    <div>
      <HeaderWithnav />

      <div className="flex items-center justify-center min-h-screen">
        <img
          src="https://res.cloudinary.com/dpgbodkae/image/upload/v1718785546/360_F_65756860_GUZwzOKNMUU3HldFoIA44qss7ZIrCG8I_u4kpy2.jpg"
          alt=""
        />
        <h1 className="text-4xl font-bold bg-yellow-400 p-9">
          Welcome to Admin panel
        </h1>
      </div>
    </div>
  );
}

export default Dashboard;
