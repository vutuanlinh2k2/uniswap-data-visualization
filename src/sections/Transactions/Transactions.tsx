import React from "react"

import { TransactionsTable } from "../../components/Tables"

const Transactions = () => {
    return (
        <div>
            <h2 className="text-grey-primary-text">Transactions</h2>
            <TransactionsTable />
        </div>
    )
}

export default Transactions
