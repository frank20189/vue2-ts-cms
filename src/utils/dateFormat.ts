const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
export function formatUtcString(
  utcString: string,
  formate: string = DATE_TIME_FORMAT
) {
  // 使用utc需要指定区域
  return dayjs.utc(utcString).utcOffset(8).format(formate)
}
