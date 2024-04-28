import axios from 'axios'

const requestData = {
  url: 'https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?',
  serviceKey: import.meta.env.VITE_API_KEY
}

export const getHolidayData = async (year: number, month: number | string) =>
  await axios.get(
    `${requestData.url}serviceKey=${requestData.serviceKey}&solYear=${year}&solMonth=${month}`
  )
