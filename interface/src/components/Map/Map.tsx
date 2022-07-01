import React, { useState, useEffect } from "react"
import { Gridcell, generateGrid, calculateLinePrice, addPoints, removePoints, addTemporaryPoints } from "./components/gridOperations"
import generateCity from "src/features/Cities/components/generateCity"
import { addLine, endLine, getLine, deleteLine, cancelLine } from "src/features/Lines/lines"
import { generateTrack } from "src/features/Lines/components/tracks"
import Pixel from "./components/Pixel"
import Static from "../Static/Static"

const dimensions = 64
interface Props {
  balance: number,
  setBalance: Function
}

const Map: React.FC<Props> = ({ balance, setBalance }) => {
  const [grid, setGrid] = useState<Gridcell[][]>([[]])
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [validDraw, setValidDraw] = useState<boolean>(false)

  useEffect(() => {
    const map = generateGrid()
    setGrid(map)
  }, [])

  const onClickNewCity = () => {
    const map = [...grid]
    const [x, y] = generateCity(map, dimensions)
    map[x][y].type = 3
    setGrid(map)
  }

  const onStartDrawing = (x: number, y: number) => {
    if (isDrawing) {
      const points = addLine(x, y, grid[x][y].type)
      if (points) {
        const map = addTemporaryPoints(points, grid)
        setGrid(map)
        if (points.length > 1) {
          if (grid[x][y].type === 3) { setValidDraw(true) }
          else { setValidDraw(false) }
        }
      }
    }
  }

  const onCancelDrawing = () => {
    cancelLine()
    grid.map(column => column.map(item => item.drawLine = false))
    setIsDrawing(false)
    setValidDraw(false)
  }

  const onFinishDrawing = (): boolean => {
    if (isDrawing) {
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
    const line = getLine(id)
    console.log(line)
  }

  const removeLine = (id: number) => {
    const line = deleteLine(id)
    const map = removePoints(line, grid)
    setGrid(map)
  }

  return(
    <div className="overflow-hidden">
      <div className="grid grid-rows-64 grid-flow-col overflow-auto">
        { grid.map((rows, i) =>
          rows.map((col, k) => (
            <div onClick={() => onStartDrawing(i, k)} key={`${i}-${k}`}>
              <Pixel x={i} y={k} gridcell={grid[i][k]} isDrawing={isDrawing} clickLine={clickLine}/>
            </div>
          ))
        )}
      </div>
      <Static balance={balance} isDrawing={isDrawing} setIsDrawing={setIsDrawing} validDraw={validDraw} 
        onClickNewCity={onClickNewCity} onFinishDrawing={onFinishDrawing} onCancelDrawing={onCancelDrawing}/>
    </div>
  )
}
export default Map