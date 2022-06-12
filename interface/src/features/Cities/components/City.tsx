import React, { useState } from "react"
import { getCity } from "./../cities.ts"

interface Props {
  x: number,
  y: number
}

const City: React.FC<Props> = ({ x, y }) => {
  const [info, setInfo] = useState<any>(null)

  const onCityClick = () => {
    const City = getCity(x, y)
    setInfo(City)
  }

  return(
    <div onClick={onCityClick} className="w-3 h-3 bg-red-700 hover:bg-red-800"></div>
  )
}

export default City