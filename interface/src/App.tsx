import React, { useState } from "react"
import Map from "./components/Map/Map"

const App: React.FC = () => {
  const [balance, setBalance] = useState(1000)
  return (
    <div>
      <Map balance={balance} setBalance={setBalance}/>
    </div>
  )
}

export default App;
