import { time } from '../lib/time'
import s from './EventDatePageItem.module.scss'

interface Props {
  imgSrc: string
  borderColor: string
  eventDate?: EventDatesTypes
}

export const EventDatePageItem = (props: Props) => {
  const { imgSrc, borderColor, eventDate } = props

  return (
    <>
      <div className={s.itemWrapper}>
        <div className={s.avatar}>
          <img src={imgSrc} height={80} />
        </div>
        <div className={s.contentWrapper} style={{ borderColor }}>
          <div className="nameAndDays">
            <div className="eventName">
              {eventDate?.eventName}
            </div>
            <div className={s.daysBetween}>
              已经 <span className={s.days}>{ eventDate && time().calcNaturalDaysBetween(time(eventDate.happenAt)) }</span> 天
            </div>
          </div>


          <div className={s.happenedAt}>
            {time(eventDate?.happenAt).format()}
          </div>
        </div>
      </div>
    </>
  )
}
