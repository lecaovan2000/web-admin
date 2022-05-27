import axiosClient from "./axiosClient";
const apiLoginAdmin = {
   login: (payload)=>{
      const url = 'user/login_admin'
      return axiosClient.post(url, payload)
   },
   register:(payload)=>{
      const url = 'user/register'
      return axiosClient.post(url, payload)
   },
   logout:(data)=>{
      const url='user/logout'
      return axiosClient.post(url,data)
   },
   checkExpiredToken: () => {
      const url = "/oauth/check_access_token";
      return axiosClient.post(url);
   },
}
export default apiLoginAdmin;