interface City {
  x: number,
  y: number,
  name: string,
  population: number
}

const names: string[] = ["Piep", "Nytfell", "Helmholm", "Ruttendorf", "Luven", "West town"]
const cities: City[] = []

export const getCity = (x: number, y: number): City | undefined => {
  const city = cities.find(city => city.x === x && city.y === y)
  return city
}

export const isCity = (x: number, y: number): boolean => {
  const match = cities.some(city => city.x === x && city.y === y)
  return match
}

export const addCity = (x: number, y: number) => {
  const population = Math.floor(Math.random() * 50) + 50 // between 50 and 100
  const name = names[Math.floor(Math.random() * names.length)];
  const city = {
    x: x,
    y: y,
    name: name,
    population: population
  }
  cities.push(city)
}