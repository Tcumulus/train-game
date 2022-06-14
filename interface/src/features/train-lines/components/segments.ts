// code inspired by https://www.redblobgames.com/grids/line-drawing.html

interface Segment {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  points: number[][],
  distance: number
}

const segments: Segment[] = [] 

export const addSegment = (x1: number, y1: number, x2: number, y2: number): Segment => {
  const [dx, dy] = [x2 - x1, y2 - y1]
  const [dx_abs, dy_abs] = [Math.abs(dx), Math.abs(dy)]
  const [x_sign, y_sign] = [dx > 0 ? 1 : -1, dy > 0 ? 1 : -1]

  let point = [x1, y1]
  const points: number[][] = []
  for (let x_ = 0, y_ = 0; x_ < dx_abs || y_ < dy_abs;) {
    const decision = (1 + 2*x_) * dy_abs - (1 + 2*y_) * dx_abs
    if (decision === 0) { // diagonal
      point = [point[0] + x_sign, point[1] + y_sign]
      x_++; y_++
    } else if (decision < 0) { // horizontal
      point = [point[0] + x_sign, point[1]]
      x_++
    } else { // vertical
      point = [point[0], point[1] + y_sign]
      y_++
    }
    points.push(point)
  }
  const distance = Math.sqrt(dx**2 + dy**2)
  const segment = {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    points: points,
    distance: distance
  }
  segments.push(segment)
  return segments[segments.length - 1]
}