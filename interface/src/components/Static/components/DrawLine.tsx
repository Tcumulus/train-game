import React from "react"

interface Props {
  drawingLine: any,
  onFinishDrawing: Function,
  onCancelDrawing: Function,
  setMenu: Function
}

const DrawLine: React.FC<Props> = ({drawingLine, onFinishDrawing, onCancelDrawing, setMenu}) => {
  const onApprove = () => {
    onFinishDrawing()
    setMenu(1)
  }

  const onCancel = () => {
    onCancelDrawing()
    setMenu(1)
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col m-2">
        <div className="flex flex-row justify-between">
          <p className="text-slate-600">Distance</p>
          <p>{drawingLine.distance ? Math.round(drawingLine.distance * 10) / 10 : 0}km</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-slate-600">Price</p>
          <p>€{drawingLine.price ? drawingLine.price : 0}</p>
        </div>
      </div>
      { drawingLine.valid ?
        <>
          <button onClick={onCancel} className="py-1 text-white bg-red-500 hover:bg-red-600 rounded">Cancel</button>
          <button onClick={onApprove} className="py-1 mt-1 text-white bg-cyan-500 hover:bg-cyan-600 rounded">Finish</button>
        </>
        :
        <button onClick={onCancel} className="py-1 text-white bg-red-500 hover:bg-red-600 rounded">Cancel</button>
      }
    </div>
  )
}
export default DrawLine