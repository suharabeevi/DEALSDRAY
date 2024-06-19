import { Link } from "react-router-dom";
import HeaderWithnav from "./HeaderWithnav";

function EmployerList() {
  return (
    <div>
      <HeaderWithnav />

      <div className="overflow-x-auto mt-20">
        <h1 className="bg-yellow-300">Employer List</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border-r border-gray-300">Unique ID</th>
              <th className="py-2 px-4 border-r border-gray-300">Image</th>
              <th className="py-2 px-4 border-r border-gray-300">Name</th>
              <th className="py-2 px-4 border-r border-gray-300">Email</th>
              <th className="py-2 px-4 border-r border-gray-300">Mobile No</th>
              <th className="py-2 px-4 border-r border-gray-300">
                Designation
              </th>
              <th className="py-2 px-4 border-r border-gray-300">Gender</th>
              <th className="py-2 px-4 border-r border-gray-300">Course</th>
              <th className="py-2 px-4 border-r border-gray-300">
                Create Date
              </th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 border-r border-gray-300"></td>
              <td className="py-3 px-4 border-r border-gray-300">
                <img
                  src="https://res.cloudinary.com/dpgbodkae/image/upload/v1718785546/360_F_65756860_GUZwzOKNMUU3HldFoIA44qss7ZIrCG8I_u4kpy2.jpg"
                  alt=""
                  className="h-10 w-10 object-cover rounded-full"
                />
              </td>
              <td className="py-3 px-4 border-r border-gray-300">suharaaa</td>
              <td className="py-3 px-4 border-r border-gray-300">
                suharaaasuharaaasuharaaa
              </td>
              <td className="py-3 px-4 border-r border-gray-300">suharaaa</td>
              <td className="py-3 px-4 border-r border-gray-300">suharaaa</td>
              <td className="py-3 px-4 border-r border-gray-300">suharaaa</td>
              <td className="py-3 px-4 border-r border-gray-300">suharaaa</td>
              <td className="py-3 px-4 border-r border-gray-300">suharaaa</td>
              <td className="py-3 px-4">
                <Link
                  to="/editEmployee"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </Link>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployerList;
