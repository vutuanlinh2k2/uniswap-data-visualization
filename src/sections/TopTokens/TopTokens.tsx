import React from "react"

import { TopTokensTable } from "../../components/Tables"

const TopTokens = () => {
    return (
        <div>
            <h2 className="text-grey-primary-text">Top Tokens</h2>
            <TopTokensTable />
        </div>
    )
}

export default TopTokens
