import React, { useState } from "react"
import Map from "./components/Map"

const App: React.FC = () => {
  const [balance, setBalance] = useState(200)
  return (
    <div>
      <Map balance={balance} setBalance={setBalance}/>
    </div>
  )
}

export default App;
