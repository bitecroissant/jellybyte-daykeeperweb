import { MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { EventDatePageItem } from './EventDatePageItem'
import { EventDatePageHeader } from './EventDatePageHeader'
import { useAjax } from '../lib/ajax'
import { time } from '../lib/time'
import todiImg from '../assets/todi.png'
import lifaImg from '../assets/lifa.png'
import hriddjImg from '../assets/hriddj.png'
import { AxiosError } from 'axios'

const keys = ['莫后演唱会', '拖地', '陆陆理发', '瓜瓜理发', '陆陆换床单', '瓜瓜换床单',]
const imgSrcList = ['', todiImg, lifaImg, lifaImg, hriddjImg, hriddjImg]
const borderColorList = ['', '#1CC5AD', '#ECC26C', '#2084F8', '#ECC26C', '#2084F8']

type keyTypes = typeof keys

type EventDatesSortedMapper = {
  [key in keyTypes[number]]?: EventDatesTypes
}


export const EventDatePage = () => {
  const nav = useNavigate()
  const { get } = useAjax()
  const [eventDatesNameMapper, setEventDatesNameMapper] = useState<EventDatesSortedMapper>({})
  const loadEventDates = async () => {
    try {
      const result = (await get<EventDatesTypes[]>('/event_dates')).data
      if (result && result.length > 0) {
        const filtered = result.filter(d => {
          return d.datesStatus === 'active' && d.group !== 'solar_term'
        }).sort((a, b) => {
          const timeA = time(a.happenAt);
          return timeA.isAfter(b.happenAt) ? -1 : 1;
        });

        const mapper: EventDatesSortedMapper = {}
        keys.forEach((k) => {
          const items = filtered.filter(x => x.eventName === k)
          if (items.length === 1) {
            mapper[k] = items[0]
          } else {
            console.error(k, '###',JSON.stringify(items))
          }
        })
        setEventDatesNameMapper(mapper)
      }
    } catch (err) {
      if ((err as AxiosError).response?.status === 403) {
        nav('/sign_in')
      }
    }
  }

  useEffect(() => {
    loadEventDates()
  }, [])


  const onCapture = async (ev: MouseEvent) => {
    const el = (ev.target as HTMLButtonElement)
    console.log('disappare')
    el.style.visibility = "hidden"
    const screenshot = await html2canvas(document.body)
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = screenshot.toDataURL('image/png');
    link.click();
    setTimeout(() => {
      console.log('appare')
      el.style.visibility = "visible"
    }, 300)
  }

  return (
    <>
      <div>
        <EventDatePageHeader eventDate={eventDatesNameMapper[keys[0]]} />
        <div className="listWrapper">
          {
            keys.map((k, i) => {
              if (i === 0) { return }
              return <EventDatePageItem key={i}
                imgSrc={imgSrcList[i]} borderColor={borderColorList[i]} 
                eventDate={eventDatesNameMapper[k]} />
            })
          }
        </div>
      </div>
      <button onClick={onCapture} className="captureBtn">截图</button>
    </>
  )
}

export default EventDatePage
