import React, { useState, useEffect } from "react"
import DrawLine from "./components/DrawLine"
import AddCity from "./components/AddCity"
import AddRoute from "./components/AddRoute"
import { changeLineName } from "src/features/Lines/lines"
import { changeCityName } from "src/features/Cities/cities"
import deleteIcon from "src/assets/static/delete.png"
import upgradeIcon from "src/assets/static/upgrade.png"
import moreIcon from "src/assets/static/more.png"

interface Props {
  balance: number,
  drawingLine: any,
  setDrawingLine: Function,
  addingRoute: any,
  setAddingRoute: Function, 
  popup: any,
  setPopup: Function,
  onClickNewCity: Function,
  onFinishDrawing: Function,
  onCancelDrawing: Function,
  onRemoveLine: Function,
}

const Static: React.FC<Props> = ({ 
  balance, drawingLine, setDrawingLine, setAddingRoute, addingRoute, onClickNewCity, onFinishDrawing, onCancelDrawing, 
  popup, setPopup, onRemoveLine
}) => {
  const [menu, setMenu] = useState<number>(0)
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

  const onStartDrawingLine = () => {
    setDrawingLine({ active: true, valid: false })
    setMenu(3)
  }

  const onStartAddingRoute = () => {
    setAddingRoute({ active: true })
    setMenu(4)
  }

  return (
    <>
      <p className="fixed top-0 left-0 ml-8 mt-4 px-4 py-2 rounded bg-white">
        {"€" + balance}
      </p>

      { menu === 0 ?
        <img src={moreIcon} onClick={() => setMenu(1)} className="fixed top-0 right-0 mr-8 mt-4 p-2 rounded bg-white w-10 h-10 cursor-pointer"/>
        : 
        <div className="fixed top-0 right-0 mr-8 mt-4 pb-2 px-2 rounded bg-white">
          { menu === 1 ?
            <div className="flex flex-col">
              <div className="flex w-full justify-end">
                <p onClick={() => setMenu(0)} className="text-slate-600 text-2xl align-center cursor-pointer">&times;</p>
              </div>
              <button className="mx-4" onClick={() => setMenu(2)}>Add City</button>
              <hr className="my-2"/>
              <button className="mx-4" onClick={onStartDrawingLine}>Draw Line</button>
              <hr className="my-2"/>
              <button className="mx-4" onClick={onStartAddingRoute}>Add Route</button>
            </div>
          : menu === 2 ?
            <AddCity onClickNewCity={onClickNewCity} setMenu={setMenu}/>
          : menu === 3 ?
            <DrawLine drawingLine={drawingLine} onFinishDrawing={onFinishDrawing} onCancelDrawing={onCancelDrawing} setMenu={setMenu}/>
          : menu === 4 ?
            <AddRoute setMenu={setMenu} addingRoute={addingRoute} setAddingRoute={setAddingRoute}/>
          :
          null
        }   
        </div>
      }
      

      { popup.active && popup.type === "line" ?
        <div className="flex flex-col items-center w-56 fixed top-44 right-0 mr-8 mt-4 pb-2 px-2 rounded bg-white">
          <div className="flex flex-row w-full pl-2 justify-between">
            <input type="text" onChange={onChangeLineName} value={lineName} className="font-semibold w-4/5 mt-2"/>
            <p onClick={() => setPopup(false)} className="text-slate-600 text-2xl align-center cursor-pointer">&times;</p>
          </div>
          <hr className="my-1 w-full"/>
          <div className="flex flex-row w-full px-2">
            <p className="mr-2">{popup.info.city0.name}</p>
            <p>-</p>
            <p className="ml-2">{popup.info.city1.name}</p>
          </div>
          <div className="flex flex-row w-full px-2 justify-between">
            <p>Distance:</p>
            <p>{`${popup.info.distance.toFixed(1)}km`}</p>
          </div>
          <div className="flex flex-row w-full px-2 justify-center">
            <img src={upgradeIcon} onClick={() => console.log("upgrade")} className="w-10 rounded px-2 py-1 mt-2 mr-6 bg-blue-500 hover:bg-blue-600 cursor-pointer" />
            <img src={deleteIcon} onClick={() => onRemoveLine(popup.info.id)} className="w-10 rounded px-2 py-1 mt-2 bg-red-500 hover:bg-red-600 cursor-pointer" />
          </div>
        </div>
        : 
        // CITY
        popup.active && popup.type === "city" ?
        <div className="flex flex-col items-center w-56 fixed top-44 right-0 mr-8 mt-4 pb-2 px-2 rounded bg-white">
          <div className="flex flex-row w-full pl-2 justify-between">
            <input type="text" onChange={onChangeCityName} value={cityName} className="font-semibold w-4/5 mt-2"/>
            <p onClick={() => setPopup(false)} className="text-slate-600 text-2xl align-center cursor-pointer">&times;</p>
          </div>
          <hr className="my-1 w-full"/>
          <div className="flex flex-row w-full px-2 justify-between">
            <p>Population:</p>
            <p>{popup.info.population}</p>
          </div>
          <div className="flex flex-row w-full px-2 justify-between">
            <p>Level:</p>
            <p>4</p>
          </div>
          <img src={upgradeIcon} onClick={() => console.log("upgrade")} className="w-10 rounded px-2 py-1 mt-2 bg-blue-500 hover:bg-blue-600 cursor-pointer" />
        </div>
        : null
      }
     </>
  )
}
export default Static