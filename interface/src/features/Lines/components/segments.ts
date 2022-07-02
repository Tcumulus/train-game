interface Segment {
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  points: number[][],
  distance: number
}

export const addSegment = (x0: number, y0: number, x1: number, y1: number): Segment => {
  const [_x0, _y0] = [x0, y0]
  const points: number[][] = []
  const [dx, dy] = [Math.abs(x1 - x0), -Math.abs(y1 - y0)]
  const [sx, sy] = [x0 < x1 ? 1 : -1, y0 < y1 ? 1 : -1]
  let error = dx + dy

  while (true) {
    points.push([x0, y0])
    if (x0 === x1 && y0 === y1) { break }
    const e2 = 2 * error
    if (e2 >= dy) {
      if (x0 == x1) { break }
      error = error + dy
      x0 = x0 + sx
    }
    if (e2 <= dx) {
      if (y0 == y1) { break }
      error = error + dx
      y0 = y0 + sy
    }
  }
  
  const distance = Math.sqrt(dx**2 + dy**2)
  const segment = {
    x0: _x0,
    y0: _y0,
    x1: x1,
    y1: y1,
    points: points,
    distance: distance
  }
  return segment
}