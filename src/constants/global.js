const DEFAULT_PAGINATION = {
   pageNo: 1,
   pageSize: 10
}
const DEFAULT_PAGINATION_NEWS = {
   pageNo: 1,
   pageSize: 10
}

const HALF_LAYOUT = {
   wrapperCol: 12,
   labelCol: {
      span: 12
   }
}
const FULL_LAYOUT = {
   wrapperCol: 24,
   labelCol: {
      span: 12
   }
}

const dateTimeFormat = 'DD/MM/YYYY HH:mm'
const dateFormat = 'DD/MM/YYYY'
const dateFormatBE = "yyyy-MM-dd'T'HH:mm:ss"
const timeFormat = 'HH:mm'

const emailRegex = /\S+@\S+\.\S+/
const phoneNumberRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g
const letterRegex = /^[a-zA-Z ]{2,30}$/
const urlRegex =
   /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

export const constants = {
   DEFAULT_PAGINATION,
   DEFAULT_PAGINATION_NEWS,

   HALF_LAYOUT,
   FULL_LAYOUT,

   dateTimeFormat,
   dateFormat,
   dateFormatBE,
   timeFormat,

   emailRegex,
   phoneNumberRegex,
   letterRegex,
   urlRegex
}
