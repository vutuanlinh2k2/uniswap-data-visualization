import React from "react"

const TableHeader = ({ headerText }: { headerText: string }) => {
  return <p className="text-right w-full text-grey-primary">{headerText}</p>
}

export default TableHeader
