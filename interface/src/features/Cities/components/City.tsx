import React from "react"

interface Props {
  x_: number,
  y_: number
}

const City: React.FC<Props> = ({ x_, y_ }) => {
  const image_w = 5000
  const image_h = 5000

  // convert coords on map to viewport coords
  function windowCoords(x_: number, y_: number):any {
    const { innerWidth: width, innerHeight: height } = window;
    let x = width / image_w * x_
    let y = width / image_h * y_
    return { x, y }
  }

  const { x, y } = windowCoords(x_, y_)

  return(
    <div className="fixed w-2 h-2 bg-red-500">

    </div>
  )
}

export default City