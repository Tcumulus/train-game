import React, { useState } from "react"
import heightmap from "./heightmap.js"
import Cities from "src/features/Cities/Cities"

const dimensions = 64

const Map: React.FC = () => {
  
  const generateGrid = () => {
    const map = heightmap(dimensions, 1, 4)
    const rows = []
    for(let i = 0; i < dimensions; i++) {
      const column = []
      for(let j = 0; j < dimensions; j++) {
        column.push(map[i][j])
      }
      rows.push(column)
    }
    return rows
  }

  const generateGridType = (grid: Array<Array<number>>) => {
    const rows = []
    for(let i = 0; i < dimensions; i++) {
      const column = []
      for(let j = 0; j < dimensions; j++) {
        const cell = grid[i][j]
        if (cell < 0.2) { column.push(0) }
        else if (cell >= 0.2 && cell < 0.85) { column.push(1) }
        else { column.push(2) }
      }
      rows.push(column)
    }
    return rows
  }

  const grid = generateGrid()
  const [grid_h, setGrid_h] = useState(grid)
  const [grid_t, setGrid_t] = useState(generateGridType(grid))

  return(
    <div className="flex">
      <div className={`grid grid-rows-64 grid-flow-col overflow-auto`}>
        {grid_t.map((rows, i) =>
          rows.map((col, k) => (
            <>            
              { grid_t[i][k] == 0 ?
                <div key={`${i}-${k}`} className="w-3 h-3 bg-blue-700 hover:bg-blue-800" />
                : grid_t[i][k] == 1 ?
                <div key={`${i}-${k}`} className="w-3 h-3 bg-green-700 hover:bg-green-800" />
                :
                <div key={`${i}-${k}`} className="w-3 h-3 bg-slate-700 hover:bg-slate-800" />
              }
            </>
          ))
        )}
      </div>
    </div>
  )
}

export default Map