import React from "react"
import Track from "src/features/Lines/components/Track"

interface Props {
  x: number,
  y: number,
  gridcell: any,
  clickLine: Function,
  clickCity: Function,
  isDrawing: boolean,
  onStartDrawing: Function,
}

const Pixel: React.FC<Props> = ({ x, y, gridcell, clickLine, clickCity, isDrawing, onStartDrawing }) => {
  const getClassname = (): string => {
    let color = ""
    if (gridcell.type === 0) {
      color = "bg-blue-700 hover:bg-blue-800"
    } else if (gridcell.type === 1) {
      color = "bg-green-700 hover:bg-green-800"
    } else if (gridcell.type === 2) {
      color = "bg-slate-700 hover:bg-slate-800"
    }
    return color
  }
  return (
    <>
      {
        gridcell.drawLine ?
        <div className={`w-6 h-6 bg-yellow-700 hover:bg-yellow-800`} />
        :
        <div className={`w-6 h-6 ${getClassname()}`}>
          {
            gridcell.line ?
            <div onClick={() => clickLine(gridcell.line)}>
              <Track track={gridcell.track}/>
            </div>
            : 
            gridcell.city ?
            <>
              {
                isDrawing ?
                <div onClick={() => onStartDrawing(x, y)} className="w-6 h-6 bg-red-700 hover:bg-red-800"/>
                :
                <div onClick={() => clickCity(gridcell.city)} className="w-6 h-6 bg-red-700 hover:bg-red-800"/>
              }
            </>
            : null
          }
        </div>
      }
    </>
  )
}

export default Pixel