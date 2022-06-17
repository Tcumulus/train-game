interface Segment {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  points: number[][],
  distance: number
}

export const addSegment = (x1: number, y1: number, x2: number, y2: number): Segment => {
  const points: number[][] = []
  const [dx, dy] = [x2 - x1, y2 - y1]
  const distance = Math.sqrt(dx**2 + dy**2)

  //calculate points between two points
  for (let i = 0; i <= distance; i++) {
    let t = distance === 0 ? 0.0 : i / distance
    const x = Math.round(lerp(x1, x2, t))
    const y = Math.round(lerp(y1, y2, t))
    points.push([x, y])
  }
  
  const segment = {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    points: points,
    distance: distance
  }
  return segment
}

const lerp = (start: number, end: number, t: number): number => {
  return start + t * (end-start);
}