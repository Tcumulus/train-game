import generateCity from "./components/generateCity"

interface City {
  id: number,
  x: number,
  y: number,
  name: string,
  population: number
}

const names: string[] = ["Piep", "Nytfell", "Helmholm", "Ruttendorf", "Fürtdorf", "Sanbruck", "Lyston", "Brinton", "Ären", "Ösmå"]
const cities: City[] = []

export const getCity = (id: number): City | undefined => {
  const city = cities.find(city => city.id === id)
  return city
}

export const getCityByCoords = (x: number, y: number): City | undefined => {
  const city = cities.find(city => city.x === x && city.y === y)
  return city
}

export const isCity = (x: number, y: number): boolean => {
  const match = cities.some(city => city.x === x && city.y === y)
  return match
}

export const getCities = (): City[] => {
  return cities
}

export const addCity = (grid: any[][], dimensions: number): City => {
  const [x, y] = generateCity(grid, dimensions)
  const population = Math.floor(Math.random() * 50) + 50 // between 50 and 100
  const name = names[Math.floor(Math.random() * names.length)]
  const id = cities.length > 0 ? cities[cities.length-1].id + 1 : 1
  const city = {
    id: id,
    x: x,
    y: y,
    name: name,
    population: population
  }
  cities.push(city)
  return city
}

export const changeCityName = (id: number, name: string) => {
  const index = cities.findIndex((city => city.id == id))
  cities[index].name = name
}