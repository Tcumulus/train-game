import { getLine } from "src/features/Lines/lines"

interface Route {
  id: number,
  name: string,
  distance: number,
  cities: number[],
  lines: number[]
}

const routes: Route[] = []
let lineIds: number[] = []
let lines: any[] = []
let distance = 0

export const addRoute = (id: number): any[] | false => {
  if (!lineIds.includes(id)) {
    const line = getLine(id)
    if(line) {
      if (lines.length > 0) {
        //check that lines are connecting in the right order
        const lastLine = lines[lines.length-1] 
        if (lastLine.city0.id !== line.city1.id && lastLine.city1.id !== line.city0.id) {
          return false
        } if (lastLine.city0.id === line.city1.id || lastLine.city1.id === line.city1.id) {
          const [city0, city1] = [line.city0, line.city1];
          [line.city0, line.city1] = [city1, city0]
        }
      }
      lineIds.push(id)
      lines.push(line)
      distance += line.distance
      return lines
    }
  }
  return false
}

export const endRoute = (name: string, cities: number[]): Route => {
  const id = routes.length > 0 ? routes[routes.length-1].id + 1 : 1
  const route: Route = {
    id: id,
    name: name,
    distance: distance,
    cities: cities,
    lines: lines
  }
  routes.push(route);
  [lines, lineIds, distance] = [[], [], 0]
  return route
}

export const cancelRoute = () => {
  [lines, lineIds, distance] = [[], [], 0]
}