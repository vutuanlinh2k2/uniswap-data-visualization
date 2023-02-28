import React from "react"
import { ColumnInstance } from "react-table"

const transactionsFilterOptions = [
  {
    value: undefined,
    text: "All",
  },
  {
    value: "swap",
    text: "Swaps",
  },
  {
    value: "add",
    text: "Adds",
  },
  {
    value: "remove",
    text: "Removes",
  },
]

const TransactionsFilter: React.FC<{ column: ColumnInstance }> = ({
  column: { filterValue, setFilter },
}) => {
  const unselectedClassName = "text-grey-secondary"
  return (
    <div className="flex gap-3 cursor-pointer">
      {transactionsFilterOptions.map((option, i) => (
        <p
          key={i}
          className={filterValue === option.value ? "" : unselectedClassName}
          onClick={() => {
            setFilter(option.value)
          }}
        >
          {option.text}
        </p>
      ))}
    </div>
  )
}

export default TransactionsFilter
