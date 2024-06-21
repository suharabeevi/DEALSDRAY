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

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300 flex justify-center">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 mx-1 border rounded ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

function EmployerList() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employerToDelete, setEmployerToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        const response = await GetAllEmployersList();
        const {
          data: { employee },
        } = response;
        setEmployers(employee);
        console.log(employee, "employerssss");
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const indexOfLastEmployer = currentPage * itemsPerPage;
  const indexOfFirstEmployer = indexOfLastEmployer - itemsPerPage;
  const currentEmployers = filteredEmployers.slice(indexOfFirstEmployer, indexOfLastEmployer);

  return (
    <div>
      <HeaderWithnav />

      <div className="overflow-x-auto mt-20">
        <h1 className="bg-yellow-300 text-center py-2 text-2xl font-normal">
          Employer List
        </h1>
        
        <div className="my-4 mx-2 flex justify-between items-center">
          <div>
            <input
              type="text"
              placeholder="Search by Name,ID,Email..."
              className="border border-gray-300 px-3 py-2 rounded-md w-96"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="text-gray-600 bg-slate-200 p-3">
            Total Employers: {employers.length}
          </div>
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
            ) : currentEmployers.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No employers found
                </td>
              </tr>
            ) : (
              currentEmployers.map((employer) => (
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
                    <Link to={`/editEmployee/${employer._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition duration-300">
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
      <Pagination
        totalItems={filteredEmployers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default EmployerList;
