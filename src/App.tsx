import React from "react"
import { useQuery } from "@apollo/client"

import { ExampleTokensQueryDocument } from "./generate/graphql"

function App() {
    const { data } = useQuery(ExampleTokensQueryDocument)
    console.log("data :", data)

    return <div className="text-primary">Uniswap</div>
}

export default App
