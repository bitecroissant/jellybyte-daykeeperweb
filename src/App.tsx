import { MouseEvent } from 'react'
import html2canvas from 'html2canvas'
import { EventDatePageItem } from './pages/EventDatePageItem'
import { EventDatePageHeader } from './pages/EventDatePageHeader'
import s from './App.module.scss'
import todiImg from './assets/todi.png'
import lifaImg from './assets/lifa.png'
import hriddjImg from './assets/hriddj.png'

function App() {
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
      <div id="pageWrapper" className={s.pageWrapper}>
        <EventDatePageHeader />
        <div className="listWrapper">
          {
            items.map(i => {
              return <EventDatePageItem
                imgSrc={imgSrcList[i % 3]} borderColor={borderColorList[i % 3]} />
            })
          }
        </div>
      </div>
      <button onClick={onCapture} className="captureBtn">截图</button>
    </>
  )
}

export default App
