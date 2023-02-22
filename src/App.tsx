import React from "react"
import { useQuery } from "@apollo/client"

import { ExampleTokensQueryDocument } from "./generate/graphql"

function App() {
    const { data } = useQuery(ExampleTokensQueryDocument)
    console.log("data :", data)

    return <div className="text-red-500">Uniswap</div>
}

export default App
