import { Link } from "react-router-dom";

function HeaderWithnav () {
  return (
    <div className="fixed top-0 z-50 bg-slate-800 w-full h-14">
      <header className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dpgbodkae/image/upload/v1718785546/360_F_65756860_GUZwzOKNMUU3HldFoIA44qss7ZIrCG8I_u4kpy2.jpg"
            alt="Logo"
            className="h-12"
          />
          <nav className="ml-8 flex space-x-8">
            <Link to="/Home" className="text-white px-1 py-1 rounded-md hover:bg-green-500">Home</Link>
            <Link to="/EmployerList" className="text-white px-1 py-1 rounded-md hover:bg-green-500">Employment List</Link>
            <Link to="/createEmployee" className=" text-white px-1 py-1 rounded-md hover:bg-green-500 transition duration-300">CreateEmploye +</Link>
          </nav>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
          Logout
        </button>
      </header>
    </div>
  );
}

export default HeaderWithnav;

