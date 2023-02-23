import React from "react"
import { FiRefreshCcw } from "react-icons/fi"

const Header = () => {
  return (
    <header className="bg-primary flex justify-between items-center px-24 py-4">
      <h2 className="text-white-text text-2xl">Uniswap Data Visualization</h2>
      <button className="flex items-center gap-2 bg-secondary rounded-2xl p-3 hover:opacity-60">
        <FiRefreshCcw color="#ffffff" />
        Refresh
      </button>
    </header>
  )
}

export default Header
