import { addSegment } from "./components/segments.ts"

interface Line {
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  segments: any[],
  distance: number
}

const lines: Line[] = []

let counter = 0
let points: number[][] = []
let segments: any[] = []
let distance = 0
let [x0, y0] = [0, 0]
let lastType = 0

export const addLine = (x: number, y: number, type: number): number[][] | boolean => {
  if (counter === 0) {
    points = []
    segments = []
    distance = 0
    if (type !== 3) {
      return false
    }
  } else {
    if (x0 !== x || y0 !== y) {
      const segment = addSegment(x0, y0, x, y)
      segments.push(segment)
      distance += segment.distance
      for(let i = 0; i < segment.points.length; i++) {
        points.push(segment.points[i])
      }
    }
  }
  [x0, y0] = [x, y]
  lastType = type
  counter++

  return points
}

export const endLine = (): number[][] | false => {
  counter = 0
  if (segments.length > 0 && lastType === 3) {
    const line = {
      x0: segments[0].x0,
      y0: segments[0].y0,
      x1: x0,
      y1: y0,
      segments: segments,
      distance: distance
    }
    lines.push(line)
    return points
  }
  return false
}