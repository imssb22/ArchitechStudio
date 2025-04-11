"use client"
import React, { useState } from 'react'
import type { RootState } from '../../../public/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, reset, incrementByAmount } from '../../../public/features/counter/counterSlice'

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const [val, setVal] = useState(0)
  const dispatch = useDispatch()


  const handleIncrement = () => {
    dispatch(increment())
  }

  const handleDecrement = () => {
    dispatch(decrement())
  }
  const handleInByAmt = () => {
    dispatch(incrementByAmount(val))
  }
  const handleReset = () => {
    dispatch(reset())
  }

  return (
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className='flex items-center space-x-4'>
        <button 
          className="bg-amber-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-amber-600 transition"
          aria-label="Increment value"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
        className="bg-amber-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-amber-600 transition"
          aria-label="Decrement value"
          onClick={handleDecrement}
        >
          Decrement
        </button>
        <br />
        <br />
        <button
        className="bg-amber-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-amber-600 transition"
          aria-label="Reset value"
          onClick={handleReset}
        >
          Reset
        </button>
        <br /><br />
        <input type="Number" placeholder='Inc val' name="val"
        onChange={(e) => {setVal(Number(e.target.value))}} />
        <button
        className="bg-amber-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-amber-600 transition"
          aria-label="Decrement value"
          onClick={handleInByAmt}
        >
          Increase by value
        </button>
      </div>
    </div>
  )
}