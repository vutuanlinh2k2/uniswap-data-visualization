# 🦄 Uniswap Data Visualization

## Demo Link
[https://uniswap-data-visualization-ayqk.vercel.app/](https://uniswap-data-visualization-ayqk.vercel.app/)

## About

This is a project to display DeFi data related to tokens, pools and transactions from the Uniswap Protocol, following the [Uniswap Info website](https://info.uniswap.org/#/). [Uniswap V3 Subgraph](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3) and [Ethereum Blocks](https://thegraph.com/hosted-service/subgraph/blocklytics/ethereum-blocks) are used for GraphQL API calling.

`Warning`: If facing slowness or errors when running the project locally, please click Refresh and/or check all of the mentioned sources first.

## Technologies used

- [React](https://reactjs.org/) (with [Typescript](https://www.typescriptlang.org/)): building UI components + state management (with Context)
- [Apollo Client](https://www.apollographql.com/docs/react/): GraphQl queries and clients set-up
- [tailwindcss](https://tailwindcss.com/): styling

## Project structure

- `apollo`: Define Apollo clients
- `components`: React components
- `constants`: Project constants
- `context`: Handle app's Context
- `data`: Define apps, data types and formatting-data functions
- `generate`: Generated types from GraphQL queries
- `graphql`: Defined GraphQL queries
- `hooks`: Custom React hooks
- `test`: Test utility functions
- `types`: Defined Typescript type files
- `utils`: Commonly-used utility functions

## Running the project locally

### Prerequisites:

- Node `v16.10.0`
- Yarn `v1.22.19`

### Steps:

1. Clone the project:

```shell
git clone https://github.com/vutuanlinh2k2/uniswap-data-visualization.git
```

2. Move to the project's directory:

```shell
cd uniswap-data-visualization
```

3. Install dependencies:

```shell
yarn
```

4. Generate types from GraphQL queries

```shell
yarn generate
```

5. Start running the project:

```shell
yarn start
```

### Other scripts

- `yarn prertier`: Format code
- `yarn lint`: Linting check
