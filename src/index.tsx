import React from "react"
import ReactDOM from "react-dom/client"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import "./index.css"
import App from "./App"

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
