import React from "react"

import { formatNumber } from "../../utils"

const TokenAmountCell = ({ symbol, amount }: { symbol: string; amount: number }) => {
  return <p className="text-right table-number">{`${formatNumber(Math.abs(amount))} ${symbol}`}</p>
}

export default TokenAmountCell
