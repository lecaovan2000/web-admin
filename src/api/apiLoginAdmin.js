import axiosClient from "./axiosClient";
const apiLoginAdmin = {
   login: (payload)=>{
      const url = 'user/login_admin'
      return axiosClient.post(url, payload)
   },
   register:(payload)=>{
      const url = 'user/register'
      return axiosClient.post(url, payload)
   }
}
export default apiLoginAdmin;