import React, { useContext, useMemo } from "react"
import { FiRefreshCcw } from "react-icons/fi"

import { AppContext } from "../../context/AppContext"

const Header = () => {
  const { fetchAppData, isLoadingTokens, isLoadingPools, isTransactionsLoading } =
    useContext(AppContext)

  const isAppLoading = useMemo(() => {
    return isLoadingTokens || isLoadingPools || isTransactionsLoading
  }, [isLoadingTokens, isLoadingPools, isTransactionsLoading])

  const refreshApp =
    fetchAppData && !isAppLoading
      ? async () => {
          await fetchAppData()
        }
      : () => {
          return
        }

  return (
    <header className="bg-primary py-4">
      <div
        className="flex items-center w-full justify-between max-w-screen-xl m-auto"
        style={{ width: "85%" }}
      >
        <div className="flex items-center gap-1.5">
          <img className="w-8 h-8" src="/UniswapLogo.png" />
          <h2 className="text-white text-2xl">Uniswap Data Visualization</h2>
        </div>
        <button
          disabled={isAppLoading}
          onClick={refreshApp}
          className="flex items-center gap-2 bg-secondary rounded-2xl p-3 hover:opacity-60 disabled:opacity-60"
        >
          <FiRefreshCcw color="#ffffff" />
          Refresh
        </button>
      </div>
    </header>
  )
}

export default Header
