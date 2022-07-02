import React, { useState, useEffect } from "react"
import { changeLineName } from "src/features/Lines/lines"
import { changeCityName, getCity } from "src/features/Cities/cities"
import deleteIcon from "src/assets/static/delete.png"

interface Props {
  balance: number,
  isDrawing: boolean,
  setIsDrawing: Function,
  validDraw: boolean,
  popup: any,
  setPopup: Function,
  onClickNewCity: Function,
  onFinishDrawing: Function,
  onCancelDrawing: Function,
  removeLine: Function,
}

const Static: React.FC<Props> = ({ 
  balance, isDrawing, setIsDrawing, validDraw, onClickNewCity, onFinishDrawing, 
  onCancelDrawing, popup, setPopup, removeLine
}) => {
  const [menu, setMenu] = useState<boolean>(false)
  const [lineName, setLineName] = useState<string>("")
  const [cityName, setCityName] = useState<string>("")

  useEffect(() => {
    if (popup.type === "line") { setLineName(popup.info.name) }
    else if (popup.type === "city") { setCityName(popup.info.name) }
  }, [popup])

  const onChangeLineName = (e: any) => {
    setLineName(e.target.value)
    changeLineName(popup.info.id, e.target.value)
  }

  const onChangeCityName = (e: any) => {
    setCityName(e.target.value)
    changeCityName(popup.info.id, e.target.value)
  }

  return (
    <>
      <p className="fixed top-0 left-0 ml-8 mt-4 px-4 py-2 rounded bg-white">
        {"€" + balance}
      </p>

      { menu ?
        <div className="flex flex-col w-40 fixed top-0 right-0 mr-8 mt-4 pb-2 px-2 rounded bg-white">
          <div className="flex w-full justify-end">
            <p onClick={() => setMenu(false)} className="text-slate-600 text-2xl align-center cursor-pointer">&times;</p>
          </div>
          <button onClick={() => onClickNewCity()} className="">Add city</button>
          <hr className="my-2"/>
          <div className="flex flex-row justify-center">
            { isDrawing ?
              <>
              { validDraw ?
                <>
                  <button onClick={() => onFinishDrawing()}>Finish</button>
                  <button onClick={() => onCancelDrawing()} className="ml-4">Cancel</button>
                </>
                :
                <button onClick={() => onCancelDrawing()}>Cancel</button>
              }
              </>
              :
              <button onClick={() => setIsDrawing(true)}>Draw</button>
            }
          </div>
        </div>
        :
        <button onClick={() => setMenu(true)} className="fixed top-0 right-0 mr-8 mt-4 px-4 py-2 rounded bg-white">menu</button>
      }

      { popup.active && popup.type === "line" ?
        <div className="flex flex-col items-center w-40 fixed top-44 right-0 mr-8 mt-4 pb-2 px-2 rounded bg-white">
          <div className="flex flex-row w-full pl-2 justify-between">
            <input type="text" onChange={onChangeLineName} value={lineName} className="font-semibold w-2/3 mt-2"/>
            <p onClick={() => setPopup(false)} className="text-slate-600 text-2xl align-center cursor-pointer">&times;</p>
          </div>
          <hr className="my-1 w-full"/>
          <div className="flex flex-row w-full px-2 justify-between">
            <p>Start:</p>
            <p>{getCity(popup.info.c0)!.name}</p>
          </div>
          <div className="flex flex-row w-full px-2 justify-between">
            <p>End:</p>
            <p>{getCity(popup.info.c1)!.name}</p>
          </div>
          <div className="flex flex-row w-full px-2 justify-between">
            <p>Distance:</p>
            <p>{`${popup.info.distance.toFixed(1)}km`}</p>
          </div>
          <img src={deleteIcon} onClick={() => removeLine(popup.info.id)} className="w-10 rounded px-2 py-1 mt-2 bg-red-500 hover:bg-red-600" />
        </div>
        : 
        // CITY
        popup.active && popup.type === "city" ?
        <div className="flex flex-col items-center w-40 fixed top-44 right-0 mr-8 mt-4 pb-2 px-2 rounded bg-white">
          <div className="flex flex-row w-full pl-2 justify-between">
          <input type="text" onChange={onChangeCityName} value={cityName} className="font-semibold w-2/3 mt-2"/>
            <p onClick={() => setPopup(false)} className="text-slate-600 text-2xl align-center cursor-pointer">&times;</p>
          </div>
          <hr className="my-1 w-full"/>
          <div className="flex flex-row w-full px-2 justify-between">
            <p>Population:</p>
            <p>{popup.info.population}</p>
          </div>
        </div>
        : null
      }
     </>
  )
}
export default Static