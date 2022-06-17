import React, { useState } from "react"
import { getCity } from "./../cities.ts"

interface Props {
  x: number,
  y: number,
  isDrawing: boolean
}

const City: React.FC<Props> = ({ x, y, isDrawing }) => {
  const [info, setInfo] = useState<any>(null)

  const onCityClick = () => {
    if (!isDrawing) {
      const City = getCity(x, y)
      console.log(City)
      setInfo(City)
    }
  }

  return(
    <div onClick={onCityClick} className="w-3 h-3 bg-red-700 hover:bg-red-800"></div>
  )
}

export default City