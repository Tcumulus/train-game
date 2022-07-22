import React from "react"

interface Props {
  onClickNewCity: Function,
  setMenu: Function
}

const AddCity: React.FC<Props> = ({onClickNewCity, setMenu}) => {
  const onApprove = () => {
    onClickNewCity()
    setMenu(1)
  }

  const onCancel = () => {
    setMenu(1)
  }

  return (
    <div className="flex flex-col justify-center">
        <div className="flex flex-row justify-between m-2">
          <p className="text-slate-600">Price</p>
          <p>€150</p>
        </div>
        <button onClick={onCancel} className="py-1 text-white bg-red-500 hover:bg-red-600 rounded">Cancel</button>
        <button onClick={onApprove} className="py-1 mt-1 text-white bg-cyan-500 hover:bg-cyan-600 rounded">Add City</button>
    </div>
  )
}
export default AddCity