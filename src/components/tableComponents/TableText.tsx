import React from "react"

export const TableHeaderText = ({ headerTitle }: { headerTitle: string }) => {
  return <p className="text-right w-full text-grey-primary-text">{headerTitle}</p>
}

export const TableCellText = ({ cellText }: { cellText: string | number }) => {
  return <p className="text-right">{cellText}</p>
}
