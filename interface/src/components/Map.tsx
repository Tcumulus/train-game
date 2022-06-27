import React, { useState, useEffect } from "react"
import heightmap from "./heightmap.ts"
import generateCity from "src/features/Cities/components/generateCity.ts"
import { addCity } from "src/features/Cities/cities.ts"
import { addLine, endLine } from "src/features/Lines/lines.ts"
import Pixel from "./Pixel"

const dimensions = 64

interface Props {
  balance: number,
  setBalance: Function
}

const Map: React.FC<Props> = ({ balance, setBalance }) => {
  const [grid, setGrid] = useState<number[][]>([[]])
  const [drawingGrid, setDrawingGrid] = useState<number[][]>([[]])
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  useEffect(() => {
    const map = generateGrid()
    setGrid(map)
    setDrawingGrid(map)
  }, [])

  //temporary
  const onClickNewCity = () => {
    const map = [...grid]
    const [x, y] = generateCity(map, dimensions)
    addCity(x, y)
    map[x][y] = 3
    setGrid(map)
    setDrawingGrid(map)
  }

  const onStartDrawing = (x: number, y: number) => {
    if (isDrawing) {
      const points = addLine(x, y, drawingGrid[x][y])
      if (points) {
        const map = updatePoints(points, drawingGrid)
        setDrawingGrid(map)
      }
    }
  }

  const onFinishDrawing = () => {
    if (isDrawing) {
      const points = endLine()
      if (points) {
        const price = calculateLinePrice(grid, points)
        console.log("price: ", price)
        setBalance((balance: number) => balance - price)
        const map = updatePoints(points, drawingGrid)
        setGrid(map)
      } else {
        console.log(grid[0][0])
        setDrawingGrid(grid)
      }
    }
    setIsDrawing(false)
  }

  return(
    <div className="flex">
      <div className="grid grid-rows-64 grid-flow-col overflow-auto">
        { isDrawing ? 
          <>
            { drawingGrid.map((rows, i) =>
              rows.map((col, k) => (
                <div onClick={() => onStartDrawing(i, k)} key={`${i}-${k}`}>
                  <Pixel x={i} y={k} type={drawingGrid[i][k]} isDrawing={isDrawing}/>
                </div>
              ))
            )}
          </>
          :
          <>
            { grid.map((rows, i) =>
              rows.map((col, k) => (
                <div onClick={() => onStartDrawing(i, k)} key={`${i}-${k}`}>            
                  <Pixel x={i} y={k} type={grid[i][k]} isDrawing={isDrawing}/>
                </div>
              ))
            )}
          </>
        }

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
export default Map

const generateGrid = (): number[][] => {
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

const calculateLinePrice = (grid: number[][], points: number[][]): number => {
  let price = 0
  for(let i = 0; i < points.length; i++) {
    const type = grid[points[i][0]][points[i][1]]
    
    if (type === 0) { price += 10 }
    else if (type === 1) { price += 2 }
    else if (type === 2) { price += 6 }
    else if (type === 3) { price += 15 }
  }
  return price
}

const updatePoints = (points: number[][], grid: number[][]): number[][] => {
  const map = grid.map(item => item.slice())
  for(let i = 0; i < points.length; i++) {
    if (map[points[i][0]][points[i][1]] !== 3) {
      console.log(grid[points[i][0]][points[i][1]])
      map[points[i][0]][points[i][1]] = 4
      console.log(grid[points[i][0]][points[i][1]])
    }
  }
  return map
}