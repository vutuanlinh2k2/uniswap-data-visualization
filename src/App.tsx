import React from "react"

import { Header } from "./components/Header"
import { TokensTable } from "./components/TokensTable"
import { PoolsTable } from "./components/PoolsTable"
import { TransactionsTable } from "./components/TransactionsTable"

const Section = ({ title, component }: { title: string; component: React.ReactNode }) => {
  return (
    <div>
      <h2 className="text-grey-primary">{title}</h2>
      {component}
    </div>
  )
}

function App() {
  return (
    <div>
      <Header />
      <div className="bg-secondary pt-4 pb-12 w-full">
        <div className="flex flex-col gap-2 m-auto max-w-screen-xl" style={{ width: "85%" }}>
          <Section title="Top Tokens" component={<TokensTable />} />
          <Section title="Top Pools" component={<PoolsTable />} />
          <Section title="Transactions" component={<TransactionsTable />} />
        </div>
      </div>
    </div>
  )
}

export default App
