import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  documents: "src/graphql/*.graphql",
  generates: {
    "src/generate/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
}

export default config
