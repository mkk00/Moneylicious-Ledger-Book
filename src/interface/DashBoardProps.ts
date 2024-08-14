/**
 * 수입지출 금액 합계 타입
 *
 * @description 월별 수입지출 금액의 합계를 구하는 getMonthlyTrend 함수의 리턴값에 사용
 * @description 연별 수입지출 금액의 합계를 구하는 getYearlyTrend 함수의 리턴값에 사용
 */
interface AmountDataProps {
  income: number
  expense: number
}

/**
 * 카테고리별 금액 합계 타입
 */
interface CategoryProps {
  [key: string]: number
}

/**
 * 카테고리별 수입지출 금액 합계 타입
 */
interface TypeProps {
  income: CategoryProps
  expense: CategoryProps
}

/**
 * 월별로 구성된 카테고리 타입
 */
interface MonthProps {
  [month: number]: TypeProps
}

/**
 * 월별 차트 조회에 필요한 데이터 타입
 */
interface MonthDataProps {
  [year: number]: MonthProps
}

/**
 * 연별 차트 조회에 필요한 데이터 타입
 */
interface YearDataProps {
  [year: number]: TypeProps
}

//#region 가계부 Summary 에 사용되는 타입
/**
 * 월별 최대 지출 항목 타입
 */
interface MonthlyMaxExpenseProps {
  [key: number]: number
}

/**
 * 카테고리별 최대 지출 항목 타입
 */
interface CategoryExpenseProps {
  [key: string]: number
}
//#endregion

export type {
  AmountDataProps,
  CategoryProps,
  TypeProps,
  MonthProps,
  MonthDataProps,
  YearDataProps,
  MonthlyMaxExpenseProps,
  CategoryExpenseProps
}
