import React, { useState, useEffect } from "react"
import { Gridcell, generateGrid, calculateLinePrice, addPoints, removePoints, addTemporaryPoints } from "./components/gridOperations"
import generateCity from "src/features/Cities/components/generateCity"
import { addLine, endLine, getLine, deleteLine, cancelLine } from "src/features/Lines/lines"
import { generateTrack } from "src/features/Lines/components/tracks"
import Pixel from "./components/Pixel"

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
    <div className="flex">
      <div className="grid grid-rows-64 grid-flow-col overflow-auto">
        { grid.map((rows, i) =>
          rows.map((col, k) => (
            <div onClick={() => onStartDrawing(i, k)} key={`${i}-${k}`}>
              <Pixel x={i} y={k} gridcell={grid[i][k]} isDrawing={isDrawing} clickLine={clickLine}/>
            </div>
          ))
        )}
      </div>
      <button onClick={onClickNewCity} className="underline ml-10 h-10">
        Add city
      </button>
      {
        isDrawing ?
        <>
        {
          validDraw ?
          <>
            <button onClick={onFinishDrawing} className="underline ml-10 h-10">Finish</button>
            <button onClick={onCancelDrawing} className="underline ml-10 h-10">Cancel</button>
          </>
          :
          <button onClick={onCancelDrawing} className="underline ml-10 h-10">Cancel</button>
        }
        </>
        :
        <button onClick={() => setIsDrawing(true)} className="underline ml-10 h-10">Draw</button>
      }
      <p className="ml-10 mt-2">
        {"€" + balance}
      </p>
    </div>
  )
}
export default Map