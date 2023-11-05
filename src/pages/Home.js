import React from 'react'
import Sidebar from '../components 2/Sidebar'
import Chat from '../components 2/Chat'

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home