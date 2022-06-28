import React, { useState, useEffect } from "react"
import heightmap from "./heightmap"
import generateCity from "src/features/Cities/components/generateCity"
import { addLine, endLine } from "src/features/Lines/lines"
import { generateTrack } from "src/features/Lines/components/tracks"
import Pixel from "./Pixel"

const dimensions = 64

interface Props {
  balance: number,
  setBalance: Function
}

interface Gridcell {
  type: number,
  line: boolean,
  drawLine: boolean,
  track: { type: number, rotation: number }
}

const Map: React.FC<Props> = ({ balance, setBalance }) => {
  const [grid, setGrid] = useState<Gridcell[][]>([[]])
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

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
        const map = updatePoints(points, grid, true)
        setGrid(map)
      }
    }
  }

  const onFinishDrawing = () => {
    if (isDrawing) {
      const points = endLine()
      if (points) {
        const price = calculateLinePrice(grid, points)
        setBalance((balance: number) => balance - price)

        let map = updatePoints(points, grid, false)
        map = generateTrack(points, map)
        setGrid(map)
      }
      grid.map(column => column.map(item => item.drawLine = false))
    }
    setIsDrawing(false)
  }

  return(
    <div className="flex">
      <div className="grid grid-rows-64 grid-flow-col overflow-auto">
        { grid.map((rows, i) =>
          rows.map((col, k) => (
            <div onClick={() => onStartDrawing(i, k)} key={`${i}-${k}`}>
              <Pixel x={i} y={k} gridcell={grid[i][k]} isDrawing={isDrawing}/>
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
      <p className="ml-10 mt-2">
        {"€" + balance}
      </p>
    </div>
  )
}
export default Map

const initiateGridcell = (): Gridcell => {
  const gridcell = { 
    type: 0, 
    line: false, 
    drawLine: false, 
    track: { type: 0, rotation: 0 } 
  }
  return gridcell
}

const generateGrid = (): Gridcell[][] => {
  const map = heightmap(dimensions, 1, 3.5)
  const rows = []
  for(let i = 0; i < dimensions; i++) {
    const column = []
    for(let j = 0; j < dimensions; j++) {
      let element = initiateGridcell()
      const cell = map[i][j]
      if (cell < 0.2) {
        element.type = 0
        column.push(element)
      }
      else if (cell >= 0.2 && cell < 0.85) {
        element.type = 1
        column.push(element) 
      }
      else {
        element.type = 2
        column.push(element) 
      }
    }
    rows.push(column)
  }
  return rows
}

const calculateLinePrice = (grid: Gridcell[][], points: number[][]): number => {
  let price = 0
  for(let i = 0; i < points.length; i++) {
    const type = grid[points[i][0]][points[i][1]].type
    if (type === 0) { price += 10 }
    else if (type === 1) { price += 2 }
    else if (type === 2) { price += 6 }
    else if (type === 3) { price += 15 }
  }
  return price
}

const updatePoints = (points: number[][], grid: Gridcell[][], temp: boolean): Gridcell[][] => {
  const map = [...grid]
  for(let i = 0; i < points.length; i++) {
    const x = points[i][0]
    const y = points[i][1]
    if (map[x][y].type !== 3) {
      if (temp) {
        map[x][y].drawLine = true
      } else {
        map[x][y].line = true
      }
    }
  }
  return map
}