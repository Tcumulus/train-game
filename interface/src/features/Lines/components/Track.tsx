import React from "react"

import one from "src/assets/lines/one.png"
import two from "src/assets/lines/two.png"
import three from "src/assets/lines/three.png"
import four from "src/assets/lines/four.png"
import five from "src/assets/lines/five.png"

interface Props {
  track: any
}

const Track: React.FC<Props> = ({ track }) => {
  console.log(track)
  return (
    <>
    {
      track.type === 1 ?
      <>
      {
        track.rotation === 0 ?
        <img src={one} className="rotate-0"/> 
        :
        <img src={one} className="rotate-90"/> 
      }
      </>
      
      : track.type === 2 ?
      <>
      {
        track.rotation === 0 ?
        <img src={two} className="rotate-0"/> 
        :
        <img src={two} className="rotate-90"/> 
      }
      </>

      : track.type === 3 ?
      <>
      {
        track.rotation === 0 ?
        <img src={three} className="rotate-0"/> 
        : track.rotation === 90 ?
        <img src={three} className="rotate-90"/> 
        : track.rotation === 180 ?
        <img src={three} className="rotate-180"/> 
        :
        <img src={three} className="-rotate-90"/> 
      }
      </>

      : track.type === 4 ?
      <>
      {
        track.rotation === 0 ?
        <img src={four} className="rotate-0"/> 
        : track.rotation === 90 ?
        <img src={four} className="rotate-90"/> 
        : track.rotation === 180 ?
        <img src={four} className="rotate-180"/> 
        :
        <img src={four} className="-rotate-90"/> 
      }
      </>

      : track.type === 5 ?
      <>
      {
        track.rotation === 0 ?
        <img src={five} className="rotate-0"/> 
        : track.rotation === 90 ?
        <img src={five} className="rotate-90"/> 
        : track.rotation === 180 ?
        <img src={five} className="rotate-180"/> 
        :
        <img src={five} className="-rotate-90"/> 
      }
      </>
      : null
    }
    </>
  )
}

export default Track


