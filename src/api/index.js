import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})


export const getFunctionByName = name => api.get(`/function/${name}`)
const apis = {
    getFunctionByName,
}
export default apis