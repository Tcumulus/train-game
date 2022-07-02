import heightmap from "./heightmap"
const dimensions = 64

export interface Gridcell {
  type: number,
  line: boolean | number,
  city: boolean | number,
  drawLine: boolean,
  track: { type: number, rotation: number }
}

const initiateGridcell = (): Gridcell => {
  const gridcell = { 
    type: 0,
    city: false,
    line: false,
    drawLine: false, 
    track: { type: 0, rotation: 0 } 
  }
  return gridcell
}

export const generateGrid = (): Gridcell[][] => {
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

export const calculateLinePrice = (grid: Gridcell[][], points: number[][]): number => {
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

export const addPoints = (line: any, grid: Gridcell[][]): Gridcell[][] => {
  const map = [...grid]
  for(let i = 0; i < line.points.length; i++) {
    const x = line.points[i][0]
    const y = line.points[i][1]
    if (!map[x][y].city) {
      map[x][y].line = line.id
    }
  }
  return map
}

export const removePoints = (line: any, grid: Gridcell[][]): Gridcell[][] => {
  const map = [...grid]
  for(let i = 0; i < line.points.length; i++) {
    const x = line.points[i][0]
    const y = line.points[i][1]
    if (map[x][y].type !== 3) {
      map[x][y].line = false
      map[x][y].track = { type: 0, rotation: 0 } 
    }
  }
  return map
}

export const addTemporaryPoints = (points: number[][], grid: Gridcell[][]): Gridcell[][] => {
  const map = [...grid]
  for(let i = 0; i < points.length; i++) {
    const x = points[i][0]
    const y = points[i][1]
    if (!map[x][y].city) {
      map[x][y].drawLine = true
    }
  }
  return map
}