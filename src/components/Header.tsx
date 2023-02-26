import React, { useContext, useMemo } from "react"
import { FiRefreshCcw } from "react-icons/fi"

import { AppContext } from "../AppContext"

const Header = () => {
  const { fetchAppData, isLoadingTokens, isLoadingPools, isTransactionsLoading } =
    useContext(AppContext)

  const isAppLoading = useMemo(() => {
    return isLoadingTokens || isLoadingPools || isTransactionsLoading
  }, [isLoadingTokens, isLoadingPools, isTransactionsLoading])

  const refreshApp =
    fetchAppData && !isAppLoading
      ? async () => {
          console.log("refreshing")
          await fetchAppData()
        }
      : () => {
          return
        }

  return (
    <header className="bg-primary flex justify-between items-center px-32 py-4">
      <div className="flex items-center gap-1.5">
        <img className="w-8 h-8" src="/UniswapLogo.png" />
        <h2 className="text-white-text text-2xl">Uniswap Data Visualization</h2>
      </div>
      <button
        disabled={isAppLoading}
        onClick={refreshApp}
        className="flex items-center gap-2 bg-secondary rounded-2xl p-3 hover:opacity-60 disabled:opacity-60"
      >
        <FiRefreshCcw color="#ffffff" />
        Refresh
      </button>
    </header>
  )
}

export default Header
