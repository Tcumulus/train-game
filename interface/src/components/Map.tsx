import React, { useState, useEffect } from "react"
import heightmap from "./heightmap.ts"
import generateCity from "src/features/Cities/components/generateCity.ts"
import { addCity } from "src/features/Cities/cities.ts"
import Pixel from "./Pixel"

const dimensions = 64

const Map: React.FC = () => {

  const [grid, setGrid] = useState<number[][]>([[]])

  useEffect(() => {
    const map = generateGrid()
    setGrid(map)
  }, [])

  //temporary
  const onClick = () => {
    const map = [...grid]
    const [x, y] = generateCity(map, dimensions)
    addCity(x, y)
    map[x][y] = 3
    setGrid(map)
  }

  return(
    <div className="flex">
      <div className={`grid grid-rows-64 grid-flow-col overflow-auto`}>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div key={`${i}-${k}`}>            
              <Pixel x={i} y={k} type={grid[i][k]} />
            </div>
          ))
        )}
      </div>
      <button onClick={onClick} className="underline ml-10 h-10">
        Add city
      </button>
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