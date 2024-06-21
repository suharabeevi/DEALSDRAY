// import axios from "axios"

// const instance = axios.create({
//     baseURL:`http://localhost:9000/api`
// })

// axios.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

// export const CreateEmployer = async (body) => await instance.post(`/v2/createEmploye`, body);

import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:9000/api`,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const CreateEmployer = async (formData) => {
  return await instance.post(`/v2/createEmploye`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const GetAllEmployersList = async () =>
  await instance.get(`/v2/getallEmployee`);

export const ConformEmployeDelete = async (EmployerId) =>
  await instance.delete(`/v2/deleteEmploye/${EmployerId}`);

export const getEmployeeDetails = async (id) =>
   await instance.get(`/v2/employee/${id}`);


export const UpdateEmployer = async (EmployerId, updatedFormData) => {
  return await instance.put(
    `/v2/updateEmployer/${EmployerId}`,
    updatedFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

