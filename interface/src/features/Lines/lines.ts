import { addSegment } from "./components/segments.ts"

interface Line {
  id: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  segments: any[],
  points: number[][],
  distance: number
}

let lines: Line[] = []

let counter = 0
let points: number[][] = []
let segments: any[] = []
let distance = 0
let [x0, y0] = [0, 0]
let lastType = 0

export const getLine = (id: number): Line | undefined => {
  const line = lines.find(line => line.id === id)
  return line
}

export const deleteLine = (id: number): Line | undefined => {
  const line = getLine(id)
  lines = lines.filter(line => line.id !== id)
  return line
}

export const addLine = (x: number, y: number, type: number): number[][] | false => {
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
        if (i !== 0 || points.length === 0) {
          points.push(segment.points[i])
        }
      }
    }
  }
  [x0, y0] = [x, y]
  lastType = type
  counter++

  return points
}

export const endLine = (): Line | false => {
  counter = 0
  if (segments.length > 0 && lastType === 3) {
    const id = lines.length > 0 ? lines[lines.length-1].id + 1 : 0
    const line = {
      id: id,
      x0: segments[0].x0,
      y0: segments[0].y0,
      x1: x0,
      y1: y0,
      segments: segments,
      points: points,
      distance: distance
    }
    lines.push(line)
    return line
  }
  return false
}