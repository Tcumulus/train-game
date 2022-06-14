import { addSegment } from "./components/segments.ts"

interface Line {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  segments: any[],
  distance: number
}

const lines: Line[] = []

let counter = 0
let segments: any[] = []
let distance = 0
let [x1, y1] = [0, 0]

export const addLine = (x: number, y: number, type: number) => {
  if (counter === 0) {
    if (type === 3) {
      counter++
    }
  } else {
    if (x1 !== x || y1 !== y) {
      const segment = addSegment(x1, y1, x, y)
      distance += segment.distance
      segments.push(segment)
      counter++
    }
  }
  [x1, y1] = [x, y]
}

export const endLine = () => {
  // check if end of line is city
  if (segments.length > 0) {
    const line = {
      x1: segments[0].x1,
      y1: segments[0].y1,
      x2: x1,
      y2: y1,
      segments: segments,
      distance: distance
    }
    lines.push(line)
    segments = []
    distance = 0
    counter = 0
  
    console.log(line)
  }
}