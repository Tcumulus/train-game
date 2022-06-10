import React from "react"
import map from "assets/map.png"

const Map: React.FC = () => {
  return(
    <img src={map} className="w-full h-full overflow-auto"></img>
  )
}

export default Map