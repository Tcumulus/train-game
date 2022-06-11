import React, { useState } from "react"
import heightmap from "./heightmap.js"
import Cities from "src/features/Cities/Cities"
import generateCity from "src/features/Cities/components/generateCity.ts"

const dimensions = 64

const Map: React.FC = () => {
  const generateGridType = () => {
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

  const map = generateGridType()
  const [grid, setGrid] = useState(map)

  //temporary
  const onClick = () => {
    const [cityX, cityY] = generateCity(map, dimensions)

    let grid_ = map
    grid_[cityX][cityY] = 3
    setGrid(grid_)
  }

  return(
    <div className="flex">
      <div className={`grid grid-rows-64 grid-flow-col overflow-auto`}>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div key={`${i}-${k}`}>            
              { grid[i][k] === 0 ?
                <div className="w-3 h-3 bg-blue-700 hover:bg-blue-800" />
                : grid[i][k] === 1 ?
                <div className="w-3 h-3 bg-green-700 hover:bg-green-800" />
                : grid[i][k] === 2 ?
                <div className="w-3 h-3 bg-slate-700 hover:bg-slate-800" />
                :
                <div className="w-3 h-3 bg-red-700 hover:bg-red-800" />
              }
            </div>
          ))
        )}
      </div>
      <button onClick={onClick} className="underline ml-10">
        Generate
      </button>
    </div>
  )
}

export default Map