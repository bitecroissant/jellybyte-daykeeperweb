import { time } from '../lib/time'
import s from './EventDatePageHeader.module.scss'

type Props = {
  eventDate?: EventDatesTypes
}

export const EventDatePageHeader = (props: Props) => {
  const { eventDate } = props

  return (
    <div className={s.header}>
      <div className={s.remainDaysWrapper}>
        <p className={s.dates}>{ time().format() }</p>
        <p>距离 {eventDate?.eventName}</p>
        <p className={s.remainDays}>还有</p>
        <span className={s.days}>{ eventDate && time().calcNaturalDaysBetween(time(eventDate.happenAt)) }</span> 天
      </div>
    </div>
  )
}
