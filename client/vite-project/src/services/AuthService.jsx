import axios from "axios"

const instance = axios.create({
    baseURL:`http://localhost:9000/api`
})

export const login = async (body) => await instance.post(`/v1/auth/login`, body);