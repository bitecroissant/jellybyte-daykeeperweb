import { MouseEvent, useState } from 'react'
import html2canvas from 'html2canvas'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const onClickScreenShot = async (ev: MouseEvent) => {
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
    }, 1500)
  }

  return (
    <div id="wrapper" >

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button className="btn" onClick={onClickScreenShot}>截图</button>
    </div>
  )
}

export default App
