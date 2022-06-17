import React from "react"
import City from "src/features/Cities/components/City"

interface Props {
  x: number,
  y: number,
  type: number,
  isDrawing: boolean
}

const Pixel: React.FC<Props> = ({ x, y, type, isDrawing }) => {
  return (
    <>
      {
        type === 3 ?
        <City x={x} y={y} isDrawing={isDrawing}/>
        : type === 0 ?
        <div className="w-2 h-2 bg-blue-700 hover:bg-blue-800" />
        : type === 1 ?
        <div className="w-2 h-2 bg-green-700 hover:bg-green-800" />
        : type == 2 ?
        <div className="w-2 h-2 bg-slate-700 hover:bg-slate-800" />
        :
        <div className="w-2 h-2 bg-yellow-700 hover:bg-yellow-800" />
      }
    </>
  )
}

export default Pixel