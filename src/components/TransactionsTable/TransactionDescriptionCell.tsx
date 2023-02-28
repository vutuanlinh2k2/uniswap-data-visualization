import React from "react"
import { getEtherscanTransaction } from "../../utils"

const TransactionDescriptionCell = ({
  type,
  hash,
  token0,
  token1,
}: {
  type: string | undefined
  hash: string
  token0: string
  token1: string
}) => {
  if (!type || hash === "") return <p className="text-pink">-</p>
  const verb = type === "add" ? "Add" : type === "remove" ? "Remove" : "Swap"
  const preposition = type === "add" || type === "remove" ? "and" : "for"
  return (
    <a
      href={getEtherscanTransaction(hash)}
      className="text-pink"
    >{`${verb} ${token0} ${preposition} ${token1}`}</a>
  )
}

export default TransactionDescriptionCell
