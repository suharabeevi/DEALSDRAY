import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderWithnav from "./HeaderWithnav";
import {
  ConformEmployeDelete,
  GetAllEmployersList,
} from "../../services/AdminEmployerservices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationModal from "./ConfirmDelete";

function EmployerList() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employerToDelete, setEmployerToDelete] = useState(null);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        const response = await GetAllEmployersList();
        const {
          data: { employee },
        } = response;
        setEmployers(employee);
        console.log(employee,"employerssss");
        setError(null);
      } catch (error) {
        console.error("Error fetching employers:", error);
        setError("Failed to fetch employers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (employerId) => {
    setEmployerToDelete(employerId);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setEmployerToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await ConformEmployeDelete(employerToDelete);
      const updatedEmployers = employers.filter(
        (emp) => emp._id !== employerToDelete
      );
      setEmployers(updatedEmployers);
      setShowDeleteModal(false);
      toast.success("Employer deleted successfully");
    } catch (error) {
      console.error("Error deleting employer:", error);
      toast.error("Failed to delete employer. Please try again.");
    }
  };

  const filteredEmployers = searchTerm
    ? employers.filter((employer) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          (employer.f_Name &&
            employer.f_Name.toString().toLowerCase().includes(searchTermLower)) ||
          (employer.f_Email &&
            employer.f_Email.toString().toLowerCase().includes(searchTermLower)) ||
          (employer.f_Id &&
            employer.f_Id.toString().toLowerCase().includes(searchTermLower))
        );
      })
    : employers;

  return (
    <div>
      <HeaderWithnav />

      <div className="overflow-x-auto mt-20">
        <h1 className="bg-yellow-300 text-center py-2 text-2xl font-normal">
          Employer List
        </h1>
        <div className="my-4 mx-2 flex justify-end ml-6">
          <input
            type="text"
            placeholder="Search by Name,ID,Email..."
            className="border border-gray-300 px-3 py-2 rounded-md w-96"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
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
            ) : error ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  {error}
                </td>
              </tr>
            ) : filteredEmployers.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No employers found
                </td>
              </tr>
            ) : 
            (
              filteredEmployers.map((employer) => (
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
                    {employer.f_Course.join(", ")}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {formatDate(employer.f_CreateDate)}
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/editEmployee/${employer._id}`}  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition duration-300">
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                      onClick={() => handleDeleteClick(employer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default EmployerList;
