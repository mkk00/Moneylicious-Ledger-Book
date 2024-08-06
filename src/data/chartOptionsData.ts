import { gray } from '@/styles/theme'
import { transUnitOfAmount } from '@/utils/getLedgerStats'

export const lineChartOptions = {
  series: {
    spline: true,
    eventDetectType: 'grouped'
  },
  xAxis: {
    label: {
      formatter: (value: number) => {
        return `${value}년도`
      }
    },
    pointOnColumn: true,
    margin: 10
  },
  yAxis: {
    label: {
      formatter: (value: string) => {
        return transUnitOfAmount(Number(value))
      }
    },
    margin: 10
  },
  lang: {
    loData: '데이터가 없습니다.'
  },
  legend: {
    visible: false
  },
  tooltip: {
    offsetX: -80,
    offsetY: -90,
    formatter: (value: number) => {
      return transUnitOfAmount(value)
    }
  },
  plot: {
    visible: false
  },
  exportMenu: {
    visible: false
  },
  theme: {
    chart: {
      fontFamily: 'NanumSquareRound',
      fontSize: 16
    },
    series: {
      lineWidth: 5,
      colors: [gray.gray_400]
    },
    yAxis: {
      width: 1,
      color: gray.gray_300
    },
    xAxis: {
      width: 1,
      color: gray.gray_300
    },
    legend: {
      label: {
        fontSize: 16
      }
    }
  }
}

export const pieChartOptions = {
  legend: {
    visible: false
  },
  series: {
    dataLabels: {
      visible: true,
      anchor: 'outer',
      pieSeriesName: { visible: true }
    }
  },
  exportMenu: {
    visible: false
  },
  tooltip: {
    offsetX: -80,
    offsetY: -90,
    formatter: (value: number) => {
      return transUnitOfAmount(value)
    }
  },
  lang: {
    loData: '데이터가 없습니다.'
  },
  theme: {
    chart: {
      fontFamily: 'NanumSquareRound',
      fontSize: 16
    }
  }
}
