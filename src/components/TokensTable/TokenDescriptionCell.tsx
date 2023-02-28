import React from "react"

import { CryptoIcon } from "../tableComponents"

const TokenDescriptionCell = ({
  name,
  address,
  symbol,
}: {
  name: string
  address: string
  symbol: string
}) => {
  return (
    <div className="flex items-center gap-2">
      <CryptoIcon address={address} size={24} />
      <p>{name}</p>
      <p className="text-grey-secondary">({symbol})</p>
    </div>
  )
}

export default TokenDescriptionCell
