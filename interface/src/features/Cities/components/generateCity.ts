import { isCity, getCities, addCity } from "../cities.ts"

const generateCity = (grid: any[][], dimensions: number): [number, number] => {
  const cities = getCities()
  let [x, y] = [0, 0]

  if (cities.length === 0 || cities.length > 4) {
    x = Math.floor(Math.random() * (dimensions-2)) + 1 // makes sure x can't be 0 or dimensions
    y = Math.floor(Math.random() * (dimensions-2)) + 1
  } else { // first five cities are in the vicinity of others
    const randomCity = Math.floor(Math.random() * cities.length)
    const maxDistance = cities.length * 10
    x = Math.floor(Math.random() * maxDistance) + (cities[randomCity].x - maxDistance/2)
    y = Math.floor(Math.random() * maxDistance) + (cities[randomCity].y - maxDistance/2)
    if (x < 1 || x > (dimensions-1) || y < 1 || y > (dimensions-1)) {
      [x, y] = generateCity(grid, dimensions)
    }
  }

  if (grid[x][y].type === 1) {
    //check that there is no city in the 5x5 grid surrounding it
    for(let i = 0; i < 5; i++) {
      for(let j = 0; j < 5; j++) {
        if (isCity(x+i-2, y+j-2)) {
          [x, y] = generateCity(grid, dimensions)
          addCity(x, y)
          return [x, y]
        }
      }
    }
    addCity(x, y)
    return [x, y]
  } else {
    [x, y] = generateCity(grid, dimensions)
    addCity(x, y)
    return [x, y]
  }
}

export default generateCity