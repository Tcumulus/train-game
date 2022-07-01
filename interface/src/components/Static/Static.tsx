import React, { useState, useEffect } from "react"
import { changeName } from "src/features/Lines/lines"

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
  const [name, setName] = useState<string>("")

  useEffect(() => {
    if (popup) {
      setName(popup.info.name)
    }
  }, [popup])

  const onChangeName = (e: any) => {
    setName(e.target.value)
    changeName(popup.info.id, e.target.value)
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
            <input type="text" onChange={onChangeName} value={name} className="font-semibold w-2/3 mt-2"/>
            <p onClick={() => setPopup(false)} className="text-slate-600 text-2xl align-center cursor-pointer">&times;</p>
          </div>
          <hr className="my-1 w-full"/>
          <div className="flex flex-row w-full px-2 justify-between">
            <p>Id:</p>
            <p>{popup.info.id}</p>
          </div>
          <div className="flex flex-row w-full px-2 justify-between">
            <p>Distance:</p>
            <p>{`${popup.info.distance.toFixed(1)}km`}</p>
          </div>
          <button onClick={() => removeLine(popup.info.id)} className="rounded px-2 py-1 mt-2 text-white bg-red-500 hover:bg-red-600">
            Delete
          </button>
        </div>
        : null
      }
     </>
  )
}
export default Static