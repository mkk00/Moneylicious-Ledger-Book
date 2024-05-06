import axios from 'axios'

const requestData = {
  url: 'https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?',
  serviceKey: import.meta.env.VITE_API_KEY
}

/**
 * 캘린더 현재 월에 해당하는 공휴일 데이터 요청
 */
export const getHolidayData = async (year: number, month: number | string) => {
  const formatMonth =
    Number(month) + 1 < 10
      ? (Number(month) + 1).toString().padStart(2, '0')
      : Number(month) + 1

  return await axios.get(
    `${requestData.url}serviceKey=${requestData.serviceKey}&solYear=${year}&solMonth=${formatMonth}`
  )
}
