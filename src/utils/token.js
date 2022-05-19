import StorageKeys from '../constants/storage-keys'
import {common} from './common'
import { path } from '../constants/path';

const getAccessToken = () => {
   return localStorage.getItem(StorageKeys.ACCESS_TOKEN);
}
const getAccessUser = () => {
   return localStorage.getItem(StorageKeys.USER);
}

const setAccessToken = (token) => {
   return localStorage.setItem(StorageKeys.ACCESS_TOKEN, token);
}

const setDeviceToken = (token) => {
   return localStorage.setItem(StorageKeys.DEVICE_TOKEN, token);
}
const checkExpiredToken = async (responseData) => {
   if (responseData.errorCode === 401 && responseData.message === "Token is invalid or expired") {
      common.removeBearerToken()
      window.location.hash = path.login;
   }
}
const checkAccessToken =async (responseData)=>{
   if (responseData.errorCode === 401 && responseData.message === "Tài khoản không tồn tại !") {
      common.removeBearerToken()
      window.location.hash = path.login;
   }
}

export const utilsToken = {
   getAccessToken,
   setAccessToken,
   setDeviceToken,
   checkExpiredToken,
   getAccessUser,
   checkAccessToken
}