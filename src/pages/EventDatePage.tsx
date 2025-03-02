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

export const EventDatePage = () => {
  const nav = useNavigate()
  const { get } = useAjax()
  const [eventDates, setEventDates] = useState<EventDatesTypes[]>([])
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
        setEventDates(filtered)
        console.log(JSON.stringify(filtered));
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

  const items = [0, 1, 2, 3, 4, 5, 6]
  const imgSrcList = [todiImg, lifaImg, hriddjImg]
  const borderColorList = ['#1CC5AD', '#ECC26C', '#2084F8']

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
        <EventDatePageHeader />
        <div className="listWrapper">
          {
            items.map(i => {
              return <EventDatePageItem key={i}
                imgSrc={imgSrcList[i % 3]} borderColor={borderColorList[i % 3]} />
            })
          }
        </div>
      </div>
      <button onClick={onCapture} className="captureBtn">截图</button>
    </>
  )
}

export default EventDatePage
