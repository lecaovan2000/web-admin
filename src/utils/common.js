import StorageKeys from "../constants/storage-keys"
import moment from 'moment-timezone' ;
import { constants } from "../constants/global";

const createFormDataPayload = data => {
   const formData = new FormData()
   if (Object.keys(data).length > 0) {
      Object.keys(data).forEach(key => {
         if (data[key] !== null && data[key] !== undefined) {
            formData.append(key, data[key])
         }
      })
   }
   return formData
}
const getTimeZone = () => {
   return moment.tz.guess()
}
const convertToDate = (ISOString, dateFormat) => {
   const stillUtc = moment(ISOString).utc().toDate()
   return moment(stillUtc)
      .tz(getTimeZone())
      .format(dateFormat || constants.dateFormat)
}
const convertBirthdayToDate = birthday => {
   const isoString = moment(birthday, 'YYYY-MM-DD').toISOString()
   return convertToDate(isoString)
}
const removeBearerToken = () => {
   localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
   localStorage.removeItem(StorageKeys.USER)
}

const removeCurrentUser = () => {
   localStorage.removeItem(StorageKeys.USER)
}
const formatPrice = (data)=>{
   return (data).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}
function getBase64(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
   })
}


export const common = {
   createFormDataPayload,
   removeBearerToken,
   removeCurrentUser,
   formatPrice,
   getBase64,
   convertBirthdayToDate
}
