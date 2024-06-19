import { useState } from "react";
import HeaderWithnav from "./HeaderWithnav";

function EditEmployerForm() {
  const [imagePreview, setImagePreview] = useState(null);

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

  return (
    <div>
      <HeaderWithnav />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-14">
        <form className="bg-white p-10 rounded-lg shadow-lg ">
          <h2 className="text-2xl font-bold mb-6 text-center">Employer Form</h2>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="name" className="block text-gray-700 w-24">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="email" className="block text-gray-700 w-24">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="phone" className="block text-gray-700 w-24">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="gender" className="block text-gray-700 w-24">
              Designation
            </label>
            <select
              name="designation"
              id="designation"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled selected>
                Select your Designation
              </option>
              <option value="male">HR</option>
              <option value="female">Manager</option>
              <option value="other">Sales</option>
            </select>
          </div>

          <div className="relative mb-4 flex items-center">
            <label className="block text-gray-700 w-24">Gender</label>
            <div className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-1"
                />
                Male
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="mr-1"
                />
                Female
              </label>
            </div>
          </div>

          <div className="relative mb-4 flex items-center">
            <label className="block text-gray-700 w-24">Courses</label>
            <div className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="courses"
                  value="MCA"
                  className="mr-2"
                />
                MCA
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="courses"
                  value="BCA"
                  className="mr-2"
                />
                BCA
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="courses"
                  value="BSC"
                  className="mr-2"
                />
                BSC
              </label>
            </div>
          </div>

          <div className="relative mb-4 flex items-center">
            <label htmlFor="imgUpload" className="block text-gray-700 w-24">
              Image
            </label>
            <input
              type="file"
              name="imgUpload"
              id="imgUpload"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              accept="image/*"
              onChange={handleImageChange}
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployerForm;
