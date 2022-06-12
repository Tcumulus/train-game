const generateCity = (grid: number[][], dimensions: number): [number, number] => {
  let x = Math.floor(Math.random() * (dimensions-2)) + 1 // makes sure x can't be 0 or dimensions
  let y = Math.floor(Math.random() * (dimensions-2)) + 1

  if (grid[x][y] === 1) {
    //TODO: check if city is near another city
    return [x, y]
  } else {
    [x, y] = generateCity(grid, dimensions)
    return [x, y]
  }
}

export default generateCity