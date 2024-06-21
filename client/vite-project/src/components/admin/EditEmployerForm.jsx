import { useEffect, useState } from "react";
import HeaderWithnav from "./HeaderWithnav";
import {  useNavigate, useParams } from "react-router-dom";
import { UpdateEmployer, getEmployeeDetails } from "../../services/AdminEmployerservices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INITIAL_VALUE = {
  f_Name: "",
  f_Email: "",
  f_Mobile: "",
  f_Designation: "",
  f_Gender: "",
  f_Course: [],
  f_Image: "",
};

function EditEmployerForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the image file
  const [selectedEmploye, setSelectedEmploye] = useState(INITIAL_VALUE);
  const [errors, setErrors] = useState({});
  const { EmpId } = useParams();
  const navigate = useNavigate()

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Set the image file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSelectedEmploye((prevState) => ({
          ...prevState,
          f_Image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setSelectedEmploye((prevState) => {
        const courses = prevState.f_Course;
        if (checked) {
          return { ...prevState, f_Course: [...courses, value] };
        } else {
          return { ...prevState, f_Course: courses.filter((course) => course !== value) };
        }
      });
    } else {
      setSelectedEmploye((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleGetEmployee = async () => {
    try {
      const { data } = await getEmployeeDetails(EmpId);
      
      setSelectedEmploye({ ...data.data });
      console.log(selectedEmploye, "seleeeeeeeeeee");
      setImagePreview(data.data.f_Image); // Set initial image preview
    } catch (error) {
      console.log("Error fetching employee:", error);
    }
  };

  useEffect(() => {
    handleGetEmployee();
  }, []);

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!selectedEmploye.f_Name.trim()) {
      errors.f_Name = "Name is required";
      valid = false;
    }

    if (!selectedEmploye.f_Email.trim()) {
      errors.f_Email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(selectedEmploye.f_Email)) {
      errors.f_Email = "Email is invalid";
      valid = false;
    }

    if (!selectedEmploye.f_Mobile.trim()) {
      errors.f_Mobile = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(selectedEmploye.f_Mobile)) {
      errors.f_Mobile = "Phone number is invalid";
      valid = false;
    }

    if (!selectedEmploye.f_Designation) {
      errors.f_Designation = "Designation is required";
      valid = false;
    }

    if (!selectedEmploye.f_Gender) {
      errors.f_Gender = "Gender is required";
      valid = false;
    }

    if (selectedEmploye.f_Course.length === 0) {
      errors.f_Course = "At least one course must be selected";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("f_Name", selectedEmploye.f_Name);
      formData.append("f_Email", selectedEmploye.f_Email);
      formData.append("f_Mobile", selectedEmploye.f_Mobile);
      formData.append("f_Designation", selectedEmploye.f_Designation);
      formData.append("f_Gender", selectedEmploye.f_Gender);
      selectedEmploye.f_Course.forEach((course) => {
        formData.append("f_Course[]", course);
      });

      // Only append the image if it has changed
      if (imageFile) {
        formData.append("f_Image", imageFile);
      }

      const { data } = await UpdateEmployer(EmpId, formData);

      if (data.success) {
        toast.success(data.message,{
          onClose: () => navigate("/EmployerList"),
        });

      } else {
        toast.error(data.message || "Failed to update employer");
      }
    } catch (error) {
      console.error("Error updating employer:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <HeaderWithnav />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-14">
        <ToastContainer />
        <form className="bg-white p-10 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">Employer Form</h2>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="f_Name" className="block text-gray-700 w-24">Name</label>
            <input
              type="text"
              name="f_Name"
              value={selectedEmploye.f_Name}
              onChange={handleInputChange}
              id="f_Name"
              placeholder="Enter your name"
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.f_Name ? "border-red-500" : ""
              }`}
            />
            {errors.f_Name && <span className="text-red-500 text-sm">{errors.f_Name}</span>}
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="f_Email" className="block text-gray-700 w-24">Email</label>
            <input
              type="email"
              name="f_Email"
              value={selectedEmploye.f_Email}
              onChange={handleInputChange}
              id="f_Email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.f_Email ? "border-red-500" : ""
              }`}
            />
            {errors.f_Email && <span className="text-red-500 text-sm">{errors.f_Email}</span>}
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="f_Mobile" className="block text-gray-700 w-24">Phone</label>
            <input
              type="tel"
              name="f_Mobile"
              value={selectedEmploye.f_Mobile}
              onChange={handleInputChange}
              id="f_Mobile"
              placeholder="Enter your phone number"
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.f_Mobile ? "border-red-500" : ""
              }`}
            />
            {errors.f_Mobile && <span className="text-red-500 text-sm">{errors.f_Mobile}</span>}
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="f_Designation" className="block text-gray-700 w-24">Designation</label>
            <select
              name="f_Designation"
              value={selectedEmploye.f_Designation}
              onChange={handleInputChange}
              id="f_Designation"
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.f_Designation ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>Select your Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.f_Designation && <span className="text-red-500 text-sm">{errors.f_Designation}</span>}
          </div>

          <div className="relative mb-4 flex items-center">
            <label className="block text-gray-700 w-24">Gender</label>
            <div className={`flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.f_Gender ? "border-red-500" : ""
              }`}
            >
              <label className="mr-4">
                <input
                  type="radio"
                  name="f_Gender"
                  value="Male"
                  checked={selectedEmploye.f_Gender === "Male"}
                  onChange={handleInputChange}
                  className="mr-1"
                />
                Male
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="f_Gender"
                  value="Female"
                  checked={selectedEmploye.f_Gender === "Female"}
                  onChange={handleInputChange}
                  className="mr-1"
                />
                Female
              </label>
            </div>
            {errors.f_Gender && <span className="text-red-500 text-sm">{errors.f_Gender}</span>}
          </div>

          <div className="relative mb-4 flex items-center">
            <label className="block text-gray-700 w-24">Courses</label>
            <div className={`flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.f_Course ? "border-red-500" : ""
              }`}
            >
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="f_Course"
                  value="MCA"
                  checked={selectedEmploye.f_Course.includes("MCA")}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                MCA
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="f_Course"
                  value="BCA"
                  checked={selectedEmploye.f_Course.includes("BCA")}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                BCA
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="f_Course"
                  value="BSC"
                  checked={selectedEmploye.f_Course.includes("BSC")}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                BSC
              </label>
            </div>
            {errors.f_Course && <span className="text-red-500 text-sm">{errors.f_Course}</span>}
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="imgUpload" className="block text-gray-700 w-24">Image</label>
            <input
              type="file"
              name="f_Image"
              id="imgUpload"
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.f_Image ? "border-red-500" : ""
              }`}
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.f_Image && <span className="text-red-500 text-sm">{errors.f_Image}</span>}
          </div>

          {imagePreview && (
            <div className="relative mb-4 flex items-center">
              <label className="block text-gray-700 w-24">Preview</label>
              <div className="flex-1 px-4 py-2 border border-gray-300 rounded-md">
                <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover" />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployerForm;
