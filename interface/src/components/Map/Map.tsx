import React, { useState, useEffect } from "react"
import { Gridcell, generateGrid, calculateLinePrice, addPoints, removePoints, addTemporaryPoints } from "./components/gridOperations"
import { addCity, getCity } from "src/features/Cities/cities"
import { addLine, endLine, getLine, deleteLine, cancelLine } from "src/features/Lines/lines"
import { generateTrack } from "src/features/Lines/components/tracks"
import { addRoute } from "src/features/Routes/routes"
import Pixel from "./components/Pixel"
import Static from "../Static/Static"

const dimensions = 64
interface Props {
  balance: number,
  setBalance: Function
}

interface Popup {
  active: boolean,
  type?: string,
  info?: object
}

interface DrawingLine {
  active: boolean,
  valid: boolean,
  price?: number,
  distance?: number
}

interface AddingRoute {
  active: boolean,
  lines?: any[]
}

const Map: React.FC<Props> = ({ balance, setBalance }) => {
  const [grid, setGrid] = useState<Gridcell[][]>([[]])
  const [drawingLine, setDrawingLine] = useState<DrawingLine>({ active: false, valid: false })
  const [addingRoute, setAddingRoute] = useState<AddingRoute>({ active: false })
  const [popup, setPopup] = useState<Popup>({ active: false })

  useEffect(() => {
    const map = generateGrid()
    setGrid(map)
  }, [])

  const onClickNewCity = () => {
    const map = [...grid]
    const city = addCity(grid, dimensions)
    map[city.x][city.y].city = city.id
    setGrid(map)
  }

  const onStartDrawing = (x: number, y: number) => {
    if (drawingLine.active) {
      const line = addLine(x, y)
      if (line) {
        const [points, distance] = [line[0], line[1]]
        const price = calculateLinePrice(grid, points)
        const map = addTemporaryPoints(points, grid)
        setGrid(map)
        if (points.length > 1) {
          if (grid[x][y].city) { setDrawingLine({ active: true, valid: true, price: price, distance: distance }) }
          else { setDrawingLine({ active: true, valid: false, price: price, distance: distance }) }
        }
      }
    }
  }

  const onCancelDrawing = () => {
    cancelLine()
    grid.map(column => column.map(item => item.drawLine = false))
    setDrawingLine({ active: false, valid: false })
  }

  const onFinishDrawing = (): boolean => {
    if (drawingLine.active) {
      onCancelDrawing()
      const line = endLine()
      if (line) {
        const price = calculateLinePrice(grid, line.points)
        if (price <= balance) {
          setBalance((balance: number) => balance - price)
          let map = addPoints(line, grid)
          map = generateTrack(line.points, map)
          setGrid(map)
          return true
        }
      }
    }
    return false
  }

  const clickLine = (id: number) => {
    if(addingRoute.active) {
      const lines = addRoute(id)
      if (lines) {
        setAddingRoute({ active: true, lines: lines })
      }
    } else {
      const line = getLine(id)
      if (line) {
        setPopup({ active: true, type: "line", info: line })
      }
    }
  }

  const onRemoveLine = (id: number) => {
    const line = deleteLine(id)
    const map = removePoints(line, grid)
    setGrid(map)
    setPopup({ active: false, type: "", info: {} })
  }

  const clickCity = (id: number) => {
    const city = getCity(id)
    if (city) {
      setPopup({ active: true, type: "city", info: city })
    }
  }

  return(
    <div>
      <div className="grid grid-rows-64 grid-flow-col overflow-auto">
        { grid.map((rows, i) =>
          rows.map((col, k) => (
            <div onClick={() => onStartDrawing(i, k)} key={`${i}-${k}`}>
              <Pixel x={i} y={k} gridcell={grid[i][k]} clickLine={clickLine} clickCity={clickCity} drawingLine={drawingLine}
                onStartDrawing={onStartDrawing}/>
            </div>
          ))
        )}
      </div>
      <Static balance={balance} drawingLine={drawingLine} setDrawingLine={setDrawingLine} setAddingRoute={setAddingRoute}
        addingRoute={addingRoute} onClickNewCity={onClickNewCity} onFinishDrawing={onFinishDrawing} 
        onCancelDrawing={onCancelDrawing} popup={popup} setPopup={setPopup} onRemoveLine={onRemoveLine}/>
    </div>
  )
}
export default Map