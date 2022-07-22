import { addSegment } from "./components/segments.ts"
import { isCity, getCityByCoords } from "src/features/Cities/cities"

interface Line {
  id: number,
  name: string,
  city0: any,
  city1: any,
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

export const getLine = (id: number): Line | undefined => {
  return lines.find(line => line.id === id)
}

export const deleteLine = (id: number): Line | undefined => {
  const line = getLine(id)
  lines = lines.filter(line => line.id !== id)
  return line
}

export const cancelLine = () => {
  counter = 0
}

export const addLine = (x: number, y: number): [number[][], number] | false => {
  if (counter === 0) {
    const city = isCity(x, y)
    if (!city) { return false }
    points = []
    segments = []
    distance = 0
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
  counter++

  return [points, distance]
}

export const endLine = (): Line | false => {
  counter = 0
  const city = isCity(x0, y0)
  if (segments.length > 0 && city) {
    const id = lines.length > 0 ? lines[lines.length-1].id + 1 : 1
    const city0 = getCityByCoords(segments[0].x0, segments[0].y0)
    const city1 = getCityByCoords(x0, y0)
    if (city0 && city1) {
      const line: Line = {
        id: id,
        name: "line " + id,
        city0: city0,
        city1: city1,
        segments: segments,
        points: points,
        distance: distance
      }
      lines.push(line)
      return line
    }
  }
  return false
}

export const changeLineName = (id: number, name: string) => {
  const index = lines.findIndex((line => line.id == id))
  lines[index].name = name
}