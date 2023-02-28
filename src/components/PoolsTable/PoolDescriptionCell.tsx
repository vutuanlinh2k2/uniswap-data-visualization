import React from "react"

import { CryptoIcon } from "../tableComponents"

const PoolDescriptionCell = ({
  token0Symbol,
  token1Symbol,
  token0Address,
  token1Address,
  feeTier,
}: {
  token0Symbol: string
  token1Symbol: string
  token0Address: string
  token1Address: string
  feeTier: number
}) => {
  return (
    <div className="flex gap-2 items-center ">
      <div className="flex">
        <CryptoIcon address={token0Address} size={18} />
        <CryptoIcon address={token1Address} size={18} />
      </div>
      <p>{`${token0Symbol}/${token1Symbol}`}</p>
      <p className="bg-grey-tertiary px-1.5 py-0.5 rounded-lg table-number text-sm">
        {feeTier / 10000}%
      </p>
    </div>
  )
}

export default PoolDescriptionCell
