import { isCity } from "../cities.ts"

const generateCity = (grid: number[][], dimensions: number): [number, number] => {
  let x = Math.floor(Math.random() * (dimensions-2)) + 1 // makes sure x can't be 0 or dimensions
  let y = Math.floor(Math.random() * (dimensions-2)) + 1

  if (grid[x][y] === 1) {
    //check if there is no city in the 5x5 grid surrounding it
    for(let i = 0; i < 5; i++) {
      for(let j = 0; j < 5; j++) {
        if (isCity(x+i-2, y+j-2)) {
          [x, y] = generateCity(grid, dimensions)
          return [x, y]
        }
      }
    }
    return [x, y]
  } else {
    [x, y] = generateCity(grid, dimensions)
    return [x, y]
  }
}

export default generateCity