import React, { useState } from "react"
import { endRoute, cancelRoute } from "src/features/Routes/routes"

interface Props {
  setMenu: Function,
  addingRoute: any,
  setAddingRoute: Function
}

const AddRoute: React.FC<Props> = ({ setMenu, addingRoute, setAddingRoute }) => {
  const [checkedState, setCheckedState] = useState<boolean[]>(addingRoute.lines ? addingRoute.lines.length > 2 ? new Array(addingRoute.lines.length-2).fill(false) : [false] : [false])
  const [routeName, setRouteName] = useState<string>("Route Name")

  const onApprove = () => {
    const cities = [addingRoute.lines[0].city0]
    checkedState.map((bool, index) => bool ? cities.push(addingRoute.lines[index+1].city0) : null)
    cities.push(addingRoute.lines[addingRoute.lines.length-1].city1)
    const route = endRoute(routeName, cities)
    setAddingRoute({ active: false })
    setMenu(1)
  }

  const onCancel = () => {
    cancelRoute()
    setAddingRoute({ active: false })
    setMenu(1)
  }

  const onCheck = (pos: number) => {
    const newCheckedState = checkedState.map((item, index) => index === pos ? !item : item)
    setCheckedState(newCheckedState)
  }

  const onChangeRouteName = (e: any) => {
    setRouteName(e.target.value)
  }

  return (
    <div className="flex flex-col justify-center w-40">
      <input type="text" onChange={onChangeRouteName} value={routeName} className="font-semibold mt-2"/>
      <hr className="my-1 w-full"/>
      { addingRoute.lines ?
        addingRoute.lines.map((line: any, i: number) => (
          <div key={i}>
            { i === 0 ?
              <p>{line.city0.name}</p>
              : null
            }
            <div className="flex flex-row items-center">
              <p className="text-slate-500 mx-2">|</p>
              <p className="text-slate-500 text-sm">{line.distance ? Math.round(line.distance * 10) / 10 : 0}km</p>
            </div>
            { i !== addingRoute.lines.length-1 ?
              <div className="flex flex-row justify-between">
                <p>{line.city1.name}</p>
                <input type="checkbox" id={`c-${i}`} checked={checkedState[i]} onChange={() => onCheck(i)}/>
              </div>
              :
              <p>{line.city1.name}</p>
            }
            
          </div>
        ))
        :
        null
      }

      <button onClick={onCancel} className="py-1 mt-1 text-white bg-red-500 hover:bg-red-600 rounded">Cancel</button>
      <button onClick={onApprove} className="py-1 mt-1 text-white bg-cyan-500 hover:bg-cyan-600 rounded">Finish</button>
    </div>
  )
}
export default AddRoute