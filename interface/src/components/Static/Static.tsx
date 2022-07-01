import React, { useState } from "react"

interface Props {
  balance: number,
  isDrawing: boolean,
  setIsDrawing: Function,
  validDraw: boolean,
  onClickNewCity: Function,
  onFinishDrawing: Function,
  onCancelDrawing: Function
}

const Static: React.FC<Props> = ({ balance, isDrawing, setIsDrawing, validDraw, onClickNewCity, onFinishDrawing, onCancelDrawing }) => {
  const [menu, setMenu] = useState<boolean>(false)
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
     </>
  )
}
export default Static