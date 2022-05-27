import axiosClient from "./axiosClient";
const apiNews = {
   getAllNews: (payload)=>{
      const url = 'newspaper/'
      return axiosClient.post(url, payload)
   },
}
export default apiNews;