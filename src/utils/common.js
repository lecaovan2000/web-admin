import StorageKeys from "../constants/storage-keys"

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
const removeBearerToken = () => {
   localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
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
   getBase64
}
