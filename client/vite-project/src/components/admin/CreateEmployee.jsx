import { useState } from "react";
import HeaderWithnav from "./HeaderWithnav";
import { CreateEmployer } from "../../services/AdminEmployerservices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function CreateEmployee() {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_Gender: "",
    f_Course: [],
    f_Image: null
  });
  const [errors, setErrors] = useState({});

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
const navigate = useNavigate()
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === "checkbox") {
      const updatedCourses = [...formData.f_Course];
      if (checked && !updatedCourses.includes(value)) {
        updatedCourses.push(value);
      } else {
        const index = updatedCourses.indexOf(value);
        if (index !== -1) {
          updatedCourses.splice(index, 1);
        }
      }
      setFormData((prev) => ({
        ...prev,
        f_Course: updatedCourses
      }));
    } else if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file
      }));
      handleImageChange(event);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.f_Name.trim()) {
      errors.f_Name = "Name is required";
    }
    if (!formData.f_Email.trim()) {
      errors.f_Email = "Email is required";
    } else if (!/\S+@gmail\.com/.test(formData.f_Email)) {
      errors.f_Email = "Email must be a valid Gmail address";
    }
    if (!formData.f_Mobile.trim()) {
      errors.f_Mobile = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.f_Mobile)) {
      errors.f_Mobile = "Phone number must be 10 digits";
    }
    if (!formData.f_Designation.trim()) {
      errors.f_Designation = "Designation is required";
    }
    if (!formData.f_Gender.trim()) {
      errors.f_Gender = "Gender is required";
    }
    if (formData.f_Course.length === 0) {
      errors.f_Course = "Select at least one course";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        
        const { data } = await CreateEmployer(formData);
        console.log(data);
        if(data.data.message === "Employee registered successfully"){
            toast.success("Login successful!", { onClose: () => navigate("/EmployerList") });

        }else{
            toast.dark(data.data.message, { onClose: () => navigate("/EmployerList") });

        }
        // Optionally reset the form
        setFormData({
          f_Name: "",
          f_Email: "",
          f_Mobile: "",
          f_Designation: "",
          f_Gender: "",
          f_Course: "",
          f_Image: null
        });
        setImagePreview(null);
      } catch (error) {
        console.error("Error creating employer:", error);
      }
    }
  };

  return (
    <div>
      <HeaderWithnav />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-14">
      <ToastContainer/>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Employer Form</h2>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="f_Name" className="block text-gray-700 w-24">
              Name
            </label>
            <input
              type="text"
              name="f_Name"
              id="f_Name"
              value={formData.f_Name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`flex-1 px-4 py-2 border ${
                errors.f_Name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            {errors.f_Name && (
              <span className="text-red-500 text-sm">{errors.f_Name}</span>
            )}
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="f_Email" className="block text-gray-700 w-24">
              Email
            </label>
            <input
              type="email"
              name="f_Email"
              id="f_Email"
              value={formData.f_Email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`flex-1 px-4 py-2 border ${
                errors.f_Email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            {errors.f_Email && (
              <span className="text-red-500 text-sm">{errors.f_Email}</span>
            )}
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="f_Mobile" className="block text-gray-700 w-24">
              Phone
            </label>
            <input
              type="tel"
              name="f_Mobile"
              id="f_Mobile"
              value={formData.f_Mobile}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`flex-1 px-4 py-2 border ${
                errors.f_Mobile ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            {errors.f_Mobile && (
              <span className="text-red-500 text-sm">{errors.f_Mobile}</span>
            )}
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="f_Designation" className="block text-gray-700 w-24">
              Designation
            </label>
            <select
              name="f_Designation"
              id="f_Designation"
              value={formData.f_Designation}
              onChange={handleChange}
              className={`flex-1 px-4 py-2 border ${
                errors.f_Designation ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            >
              <option value="">Select your Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.f_Designation && (
              <span className="text-red-500 text-sm">
                {errors.f_Designation}
              </span>
            )}
          </div>

          <div className="relative mb-4 flex items-center">
            <label className="block text-gray-700 w-24">Gender</label>
            <div
              className={`flex-1 px-4 py-2 border ${
                errors.f_Gender ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            >
              <label className="mr-4">
                <input
                  type="radio"
                  name="f_Gender"
                  value="Male"
                  checked={formData.f_Gender === "Male"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Male
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="f_Gender"
                  value="Female"
                  checked={formData.f_Gender === "Female"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Female
              </label>
            </div>
            {errors.f_Gender && (
              <span className="text-red-500 text-sm">{errors.f_Gender}</span>
            )}
          </div>

          <div className="relative mb-4 flex items-center">
            <label className="block text-gray-700 w-24">Courses</label>
            <div
              className={`flex-1 px-4 py-2 border ${
                errors.f_Course ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            >
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="f_Course"
                  value="MCA"
                  checked={formData.f_Course.includes("MCA")}
                  onChange={handleChange}
                  className="mr-2"
                />
                MCA
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="f_Course"
                  value="BCA"
                  checked={formData.f_Course.includes("BCA")}
                  onChange={handleChange}
                  className="mr-2"
                />
                BCA
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="f_Course"
                  value="BSC"
                  checked={formData.f_Course.includes("BSC")}
                  onChange={handleChange}
                  className="mr-2"
                />
                BSC
              </label>
            </div>
            {errors.f_Course && (
              <span className="text-red-500 text-sm">{errors.f_Course}</span>
            )}
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="f_Image" className="block text-gray-700 w-24">
              Image
            </label>
            <input
              type="file"
              name="f_Image"
              id="f_Image"
              className={`flex-1 px-4 py-2 border ${
                errors.f_Image ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          {imagePreview && (
            <div className="relative mb-4 flex items-center">
              <label className="block text-gray-700 w-24">Preview</label>
              <div className="flex-1 px-4 py-2 border border-gray-300 rounded-md">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployee;
