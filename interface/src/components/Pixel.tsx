import React from "react"
import City from "src/features/Cities/components/City"

interface Props {
  x: number,
  y: number,
  type: number
}

const Pixel: React.FC<Props> = ({ x, y, type }) => {
  return (
    <>
      {
        type === 3 ?
        <City x={x} y={y}/>
        : type === 0 ?
        <div className="w-3 h-3 bg-blue-700 hover:bg-blue-800" />
        : type === 1 ?
        <div className="w-3 h-3 bg-green-700 hover:bg-green-800" />
        :
        <div className="w-3 h-3 bg-slate-700 hover:bg-slate-800" />
      }
    </>
  )
}

export default Pixel