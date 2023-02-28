import React from "react"
import ReactDOM from "react-dom/client"
import { ApolloProvider } from "@apollo/client"

import "./index.css"
import App from "./App"
import { AppContextProvider } from "./context/AppContext"
import { UniswapV3Client } from "./apollo/client"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={UniswapV3Client}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ApolloProvider>
  </React.StrictMode>
)
