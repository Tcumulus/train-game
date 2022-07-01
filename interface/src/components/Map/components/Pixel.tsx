import React from "react"
import City from "src/features/Cities/components/City"
import Track from "src/features/Lines/components/Track"

interface Props {
  x: number,
  y: number,
  gridcell: any,
  isDrawing: boolean,
  clickLine: Function
}

const Pixel: React.FC<Props> = ({ x, y, gridcell, isDrawing, clickLine }) => {
  const getColor = (): string => {
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
        <div className="w-3 h-3 bg-yellow-700 hover:bg-yellow-800" />
        :
        <>
          {
            gridcell.type === 3 ?
            <City x={x} y={y} isDrawing={isDrawing}/>
            :
              <div className={`w-3 h-3 ${getColor()}`}>
                {
                  gridcell.line ?
                  <div onClick={() => clickLine(gridcell.lineId)}>
                    <Track track={gridcell.track}/>
                  </div>
                  : null
                }
              </div>
          }
        </>
      }
    </>
  )
}

export default Pixel