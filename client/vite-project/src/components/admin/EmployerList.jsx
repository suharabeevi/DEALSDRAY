import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderWithnav from './HeaderWithnav';
import { GetAllEmployersList } from '../../services/AdminEmployerservices';

function EmployerList() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        const response = await GetAllEmployersList();
        const { data: { employee } } = response; 
        setEmployers(employee);
      } catch (error) {
        console.error('Error fetching employers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <HeaderWithnav />

      <div className="overflow-x-auto mt-20">
        <h1 className="bg-yellow-300 text-center py-2 text-2xl font-normal">
          Employer List
        </h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border-r border-gray-300">Unique ID</th>
              <th className="py-2 px-4 border-r border-gray-300">Image</th>
              <th className="py-2 px-4 border-r border-gray-300">Name</th>
              <th className="py-2 px-4 border-r border-gray-300">Email</th>
              <th className="py-2 px-4 border-r border-gray-300">Mobile No</th>
              <th className="py-2 px-4 border-r border-gray-300">Designation</th>
              <th className="py-2 px-4 border-r border-gray-300">Gender</th>
              <th className="py-2 px-4 border-r border-gray-300">Course</th>
              <th className="py-2 px-4 border-r border-gray-300">Create Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : employers.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No employers found
                </td>
              </tr>
            ) : (
              employers.map((employer) => (
                <tr key={employer._id} className="border-b border-gray-200">
                  <td className="py-3 px-4 border-r border-gray-300">
                    {employer.f_Id}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    <img
                      src={employer.f_Image}
                      alt={employer.f_Name}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {employer.f_Name}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {employer.f_Email}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {employer.f_Mobile}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {employer.f_Designation}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {employer.f_Gender}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {employer.f_Course.join(', ')}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {formatDate(employer.f_CreateDate)}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                     
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition duration-300"
                    >
                      Edit
                    </Link>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployerList;
