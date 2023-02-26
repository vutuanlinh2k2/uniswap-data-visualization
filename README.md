# 🦄 Uniswap Data Visualization

## About
This is a project to display DeFi data related to tokens, pools and transactions from the Uniswap Protocol, following the [Uniswap Info website](https://info.uniswap.org/#/). [Uniswap V3 Subgraph](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3) and [Ethereum Blocks](https://thegraph.com/hosted-service/subgraph/blocklytics/ethereum-blocks) are used for API calling.

!!! Warning: If facing slowness when running the project locally, please reference back to those mentioned sources first.

## Running the project locally

### Prerequisites:
- Node `v16.10.0`
- Yarn `v1.22.19`

### Steps:

1) Clone the project:

```shell
git clone https://github.com/vutuanlinh2k2/uniswap-data-visualization.git
```

2) Move to the project's directory:

```shell
cd uniswap-data-visualization
```

3) Install dependencies:
```shell
yarn
```

4) Run the project locally:
```shell
yarn start
```

 * Other scripts
- `yarn generate`: Regenerate Typescript from GraphQL
- `yarn prettier`: format code using Prettier
- `yarn lint`: lint code using ESLint 
