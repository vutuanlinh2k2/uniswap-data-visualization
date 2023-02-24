/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query getCurrentEthPrice {\n  bundles(where: {id: \"1\"}) {\n    id\n    ethPriceUSD\n  }\n}": types.GetCurrentEthPriceDocument,
    "query getTopTokens {\n  tokens(\n    first: 50\n    orderBy: totalValueLockedUSD\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n  }\n}\n\nquery getTokensData($idIn: [ID!]) {\n  tokens(\n    where: {id_in: $idIn}\n    orderBy: totalValueLockedUSD\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n    symbol\n    name\n    derivedETH\n    volumeUSD\n    volume\n    feesUSD\n    totalValueLockedUSD\n  }\n}\n\nquery getTokensDataBasedOnBlock($idIn: [ID!], $blockNumber: Int) {\n  tokens(\n    where: {id_in: $idIn}\n    block: {number: $blockNumber}\n    orderBy: totalValueLockedUSD\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n    symbol\n    name\n    derivedETH\n    volumeUSD\n    volume\n    feesUSD\n    totalValueLockedUSD\n  }\n}": types.GetTopTokensDocument,
    "query getTransactionsData {\n  transactions(\n    first: 500\n    orderBy: timestamp\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n    timestamp\n    mints {\n      amount0\n      amount1\n      amountUSD\n      origin\n      pool {\n        token0 {\n          id\n          symbol\n        }\n        token1 {\n          id\n          symbol\n        }\n      }\n    }\n    burns {\n      id\n      amount0\n      amount1\n      amountUSD\n      origin\n      pool {\n        token0 {\n          id\n          symbol\n        }\n        token1 {\n          id\n          symbol\n        }\n      }\n    }\n    swaps {\n      amount0\n      amount1\n      amountUSD\n      origin\n      pool {\n        token0 {\n          id\n          symbol\n        }\n        token1 {\n          id\n          symbol\n        }\n      }\n    }\n  }\n}": types.GetTransactionsDataDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getCurrentEthPrice {\n  bundles(where: {id: \"1\"}) {\n    id\n    ethPriceUSD\n  }\n}"): (typeof documents)["query getCurrentEthPrice {\n  bundles(where: {id: \"1\"}) {\n    id\n    ethPriceUSD\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getTopTokens {\n  tokens(\n    first: 50\n    orderBy: totalValueLockedUSD\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n  }\n}\n\nquery getTokensData($idIn: [ID!]) {\n  tokens(\n    where: {id_in: $idIn}\n    orderBy: totalValueLockedUSD\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n    symbol\n    name\n    derivedETH\n    volumeUSD\n    volume\n    feesUSD\n    totalValueLockedUSD\n  }\n}\n\nquery getTokensDataBasedOnBlock($idIn: [ID!], $blockNumber: Int) {\n  tokens(\n    where: {id_in: $idIn}\n    block: {number: $blockNumber}\n    orderBy: totalValueLockedUSD\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n    symbol\n    name\n    derivedETH\n    volumeUSD\n    volume\n    feesUSD\n    totalValueLockedUSD\n  }\n}"): (typeof documents)["query getTopTokens {\n  tokens(\n    first: 50\n    orderBy: totalValueLockedUSD\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n  }\n}\n\nquery getTokensData($idIn: [ID!]) {\n  tokens(\n    where: {id_in: $idIn}\n    orderBy: totalValueLockedUSD\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n    symbol\n    name\n    derivedETH\n    volumeUSD\n    volume\n    feesUSD\n    totalValueLockedUSD\n  }\n}\n\nquery getTokensDataBasedOnBlock($idIn: [ID!], $blockNumber: Int) {\n  tokens(\n    where: {id_in: $idIn}\n    block: {number: $blockNumber}\n    orderBy: totalValueLockedUSD\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n    symbol\n    name\n    derivedETH\n    volumeUSD\n    volume\n    feesUSD\n    totalValueLockedUSD\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getTransactionsData {\n  transactions(\n    first: 500\n    orderBy: timestamp\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n    timestamp\n    mints {\n      amount0\n      amount1\n      amountUSD\n      origin\n      pool {\n        token0 {\n          id\n          symbol\n        }\n        token1 {\n          id\n          symbol\n        }\n      }\n    }\n    burns {\n      id\n      amount0\n      amount1\n      amountUSD\n      origin\n      pool {\n        token0 {\n          id\n          symbol\n        }\n        token1 {\n          id\n          symbol\n        }\n      }\n    }\n    swaps {\n      amount0\n      amount1\n      amountUSD\n      origin\n      pool {\n        token0 {\n          id\n          symbol\n        }\n        token1 {\n          id\n          symbol\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query getTransactionsData {\n  transactions(\n    first: 500\n    orderBy: timestamp\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n    timestamp\n    mints {\n      amount0\n      amount1\n      amountUSD\n      origin\n      pool {\n        token0 {\n          id\n          symbol\n        }\n        token1 {\n          id\n          symbol\n        }\n      }\n    }\n    burns {\n      id\n      amount0\n      amount1\n      amountUSD\n      origin\n      pool {\n        token0 {\n          id\n          symbol\n        }\n        token1 {\n          id\n          symbol\n        }\n      }\n    }\n    swaps {\n      amount0\n      amount1\n      amountUSD\n      origin\n      pool {\n        token0 {\n          id\n          symbol\n        }\n        token1 {\n          id\n          symbol\n        }\n      }\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;