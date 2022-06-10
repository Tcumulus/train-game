import React, { useState } from "react"
import Cities from "src/features/Cities/Cities"

const nrows = 50
const ncols = 100

const Map: React.FC = () => {
  const generateGrid = () => {
    const rows = []
    for(let i = 0; i < nrows; i++) {
      rows.push(Array.from(Array(ncols), () => 0))
    }
    return rows
  }

  const [grid, setGrid] = useState(generateGrid)

  return(
    <div className="flex">
      <div className={`grid grid-rows-50 grid-flow-col overflow-auto`}>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div key={`${i}-${k}`} className="w-5 h-5 border border-black hover:bg-slate-300"/>
          ))
        )}
      </div>
    </div>
  )
}

export default Map