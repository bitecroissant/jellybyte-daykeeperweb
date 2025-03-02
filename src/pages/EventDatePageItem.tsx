import { useEffect } from 'react'
import s from './EventDatePageItem.module.scss'

interface Props {
  imgSrc: string
  borderColor: string
}

export const EventDatePageItem = (props: Props) => {
  const {imgSrc,borderColor} = props
  
  useEffect(() => {

  })
  return (
    <>
      <div className={s.itemWrapper}>
        <div className={s.avatar}>
          <img src={imgSrc} height={80}/>
        </div>
        <div className={s.contentWrapper} style={{borderColor}}>
          <div className="nameAndDays">
<div className="eventName">
            拖地
          </div>
<div className={s.daysBetween}>
            已经 <span className={s.days}>{3}</span> 天
          </div>
          </div>
          
          
          <div className={s.happenedAt}>
            2025-03-02
          </div>
        </div>
      </div>
    </>
  )
}
