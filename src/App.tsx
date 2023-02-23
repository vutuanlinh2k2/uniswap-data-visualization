import React from "react"

import { Header } from "./components/Header"
import { TopPools, TopTokens, UniswapOverview, Transactions } from "./sections"

function App() {
  return (
    <div>
      <Header />
      <div className="px-32 bg-secondary pt-4 pb-12 flex flex-col gap-2">
        <UniswapOverview />
        <TopTokens />
        <TopPools />
        <Transactions />
      </div>
    </div>
  )
}

export default App
