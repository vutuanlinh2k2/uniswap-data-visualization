import React from "react"

import Header from "./components/Header"
import { TopTokensTable, TopPoolsTable, TransactionsTable } from "./components/tables"

const Section = ({ title, component }: { title: string; component: React.ReactNode }) => {
  return (
    <div>
      <h2 className="text-grey-primary-text">{title}</h2>
      {component}
    </div>
  )
}

function App() {
  return (
    <div>
      <Header />
      <div className="px-32 bg-secondary pt-4 pb-12 flex flex-col gap-2">
        <Section title="Top Tokens" component={<TopTokensTable />} />
        <Section title="Top Pools" component={<TopPoolsTable />} />
        <Section title="Transactions" component={<TransactionsTable />} />
      </div>
    </div>
  )
}

export default App
