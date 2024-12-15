import React from 'react'
import Header from './components/Header'
import Topbar from './components/Topbar'
import { Footer } from './components/Footer'

import TpingVthree from './components/TpingVthree'


const App = () => {

  const [isWord, setIsWord] = React.useState(false);
  const [isStart, setIsStart] = React.useState(false);

  React.useEffect(() => {
    const item = localStorage.getItem('setItem-time')
    if (item === 'false') {
      setIsWord(true);
    }
  },[])

  return (
    <div className="bg-gray-800 w-full h-screen grid grid-rows-[100px_100px_minmax(300px,auto)_80px] gap-4">
      <div className='bg-white'>
        <Header />
      </div>
      <div className=''>
        <Topbar isStart={isStart} setIsStart={setIsStart} setIsWord={setIsWord}/>
      </div>
      <div className='m-4 pl-[100px] pr-[100px]'>
        <TpingVthree isStart={isStart} setIsStart={setIsStart} isWord={isWord}/>
      </div>
      <div className=''>
        <Footer />
      </div>
      {/* <Test /> */}
    </div>
  )
}

export default App