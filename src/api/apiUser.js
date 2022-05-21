import { common } from "../utils/common";
import axiosClient from "./axiosClient";
// import { constants } from "../constants/global";
const apiUser = {
   getAllUser: (data)=>{
      const url = 'user/'
      return axiosClient.post(url, data)
   },
   getProjectUser: (data) => {
      const url = "news/user"
      return axiosClient.post(url, data)
   },
   getProfileUser: (userUid) => {
      const url = "user/get_profile"
      const params = { uid: userUid}
      return axiosClient.get(url, {params})
   },
   showHide: (payload, activate) => {
      // const url = `groups/${!locked ? 'delete' : 'upload'}`
      // console.log('apiGroup', data)
      // return axiosClient.post(url, common.createFormDataPayload(data))

      if (!activate) {
         const url = `user/deactivate`
         return axiosClient.post(url, payload )
      } else {
         const url = 'user/unblock'
         return axiosClient.post(url, payload)
      }
   },
}
export default apiUser;