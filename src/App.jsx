import React from 'react'
import Header from './components/Header'
import Topbar from './components/Topbar'
import { Footer } from './components/Footer'

import TpingVthree from './components/TpingVthree'


const App = () => {

  const [isStart, setIsStart] = React.useState(false);

  return (
    <div className="bg-gray-800 w-full h-screen grid grid-rows-[100px_100px_minmax(300px,auto)_80px] gap-4">
      <div className='bg-white'>
        <Header />
      </div>
      <div className=''>
        <Topbar isStart={isStart} setIsStart={setIsStart} />
      </div>
      <div className='m-4 pl-[100px] pr-[100px]'>
        <TpingVthree isStart={isStart} setIsStart={setIsStart}/>
      </div>
      <div className=''>
        <Footer />
      </div>
      {/* <Test /> */}
    </div>
  )
}

export default App