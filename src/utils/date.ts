import dayjs from 'dayjs';
import { DateTimePattern } from '@/enum';

/**
 * format date time
 *
 * @param date date
 * @returns formatted date time
 */
export function formatDateTime(date?: dayjs.ConfigType) {
  return dayjs(date).format(DateTimePattern.DateTime);
}
