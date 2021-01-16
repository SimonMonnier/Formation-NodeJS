import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Rooms from '../components/Rooms'
import Room from '../components/Room'
import AddRoom from '../components/AddRoom'

const RoomsPage = () => {
  return (
    <Routes>
      <Route path='/' element={<Rooms />} />
      <Route path=':id' element={<Room />} />
      <Route path='/add' element={<AddRoom />} />
    </Routes>
  )
}

export default RoomsPage
