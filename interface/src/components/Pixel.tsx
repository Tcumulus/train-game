import React from "react"
import City from "src/features/Cities/components/City"

interface Props {
  x: number,
  y: number,
  gridcell: any,
  isDrawing: boolean
}

const Pixel: React.FC<Props> = ({ x, y, gridcell, isDrawing }) => {
  return (
    <>
      {
        gridcell.drawLine ?
        <div className="w-3 h-3 bg-yellow-700 hover:bg-yellow-800" />
        :
        <>
          {
            gridcell.line === true ? //temporary
            <div className="w-3 h-3 bg-yellow-400 hover:bg-yellow-500" />
            : gridcell.type === 3 ?
            <City x={x} y={y} isDrawing={isDrawing}/>
            : gridcell.type === 0 ?
            <div className="w-3 h-3 bg-blue-700 hover:bg-blue-800" />
            : gridcell.type === 1 ?
            <div className="w-3 h-3 bg-green-700 hover:bg-green-800" />
            : gridcell.type === 2 ?
            <div className="w-3 h-3 bg-slate-700 hover:bg-slate-800" />
            : null
          }
          {
            //TRACK
          }
        </>
      }
    </>
  )
}

export default Pixel