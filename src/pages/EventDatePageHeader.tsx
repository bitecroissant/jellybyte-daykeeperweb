import { useEffect } from 'react'
import s from './EventDatePageHeader.module.scss'


export const EventDatePageHeader = () => {
  useEffect(() => {

  })

  return (
    <div className={s.header}>
      <div className={s.remainDaysWrapper}>
        <p className={s.dates}>2025-03-02</p>
        <p>距离莫后演唱会</p>
        <p className={s.remainDays}>还有</p>
        <span className={s.days}>13</span> 天
      </div>
    </div>
  )
}
