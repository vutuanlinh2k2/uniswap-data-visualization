import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "src/generate/uniswap-v3/": {
      schema: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
      documents: "src/graphql/uniswap-v3/*.graphql",
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "src/generate/ethereum-blocks/": {
      schema: "https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks",
      documents: "src/graphql/ethereum-blocks/*.graphql",
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
}

export default config
