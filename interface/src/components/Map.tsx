import React, { useState, useEffect } from "react"
import heightmap from "./heightmap.ts"
import generateCity from "src/features/Cities/components/generateCity.ts"
import { addCity } from "src/features/Cities/cities.ts"
import { addLine, endLine } from "src/features/Lines/lines.ts"
import Pixel from "./Pixel"

const dimensions = 64

const Map: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([[]])
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  useEffect(() => {
    const map = generateGrid()
    setGrid(map)
  }, [])

  //temporary
  const onClickNewCity = () => {
    const map = [...grid]
    const [x, y] = generateCity(map, dimensions)
    addCity(x, y)
    map[x][y] = 3
    setGrid(map)
  }

  const onStartDrawing = (x: number, y: number) => {
    if (isDrawing) {
      addLine(x, y, grid[x][y])
    }
  }

  const onFinishDrawing = () => {
    if (isDrawing) {
      let map = [...grid]
      const points = endLine()
      for(let i = 1; i < points.length-1; i++) { //loop through points, but don't count [0] and [points.length]
        map[points[i][0]][points[i][1]] = 4
      }
      setGrid(map)
    }
    setIsDrawing(false)
  }

  return(
    <div className="flex">
      <div className={`grid grid-rows-64 grid-flow-col overflow-auto`}>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div onClick={() => onStartDrawing(i, k)} key={`${i}-${k}`}>            
              <Pixel x={i} y={k} type={grid[i][k]} isDrawing={isDrawing}/>
            </div>
          ))
        )}
      </div>
      <button onClick={onClickNewCity} className="underline ml-10 h-10">
        Add city
      </button>
      {
        isDrawing ?
        <button onClick={onFinishDrawing} className="underline ml-10 h-10">Finish</button>
        :
        <button onClick={() => setIsDrawing(true)} className="underline ml-10 h-10">Draw</button>
      }
    </div>
  )
}

const generateGrid = () => {
  const map = heightmap(dimensions, 1, 3.5)
  const rows = []
  for(let i = 0; i < dimensions; i++) {
    const column = []
    for(let j = 0; j < dimensions; j++) {
      const cell = map[i][j]
      if (cell < 0.2) { column.push(0) }
      else if (cell >= 0.2 && cell < 0.85) { column.push(1) }
      else { column.push(2) }
    }
    rows.push(column)
  }
  return rows
}

export default Map