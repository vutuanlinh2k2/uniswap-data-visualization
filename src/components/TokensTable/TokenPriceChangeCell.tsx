import React from "react"
import { BsArrowUp, BsArrowDown } from "react-icons/bs"

const TokenPriceChangeCell = ({ priceChange }: { priceChange: number }) => {
  const rounded = Math.round(priceChange * 100) / 100
  const className = rounded >= 0 ? "text-green" : "text-red"
  return (
    <div className="flex items-center justify-end gap-0.5 table-number">
      {rounded === 0 ? null : rounded > 0 ? (
        <BsArrowUp className="text-green" />
      ) : (
        <BsArrowDown className="text-red" />
      )}
      <p className={className}>{rounded === 0 ? "0.00" : Math.abs(rounded)}%</p>
    </div>
  )
}

export default TokenPriceChangeCell
