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
    "query getBlocks($timestamp_gt: BigInt!, $timestamp_lt: BigInt!) {\n  blocks(\n    first: 1\n    orderBy: timestamp\n    orderDirection: desc\n    where: {timestamp_gt: $timestamp_gt, timestamp_lt: $timestamp_lt}\n  ) {\n    number\n  }\n}": types.GetBlocksDocument,
    "query testGetBlocks {\n  blocks(first: 100) {\n    id\n    number\n  }\n}": types.TestGetBlocksDocument,
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
export function gql(source: "query getBlocks($timestamp_gt: BigInt!, $timestamp_lt: BigInt!) {\n  blocks(\n    first: 1\n    orderBy: timestamp\n    orderDirection: desc\n    where: {timestamp_gt: $timestamp_gt, timestamp_lt: $timestamp_lt}\n  ) {\n    number\n  }\n}"): (typeof documents)["query getBlocks($timestamp_gt: BigInt!, $timestamp_lt: BigInt!) {\n  blocks(\n    first: 1\n    orderBy: timestamp\n    orderDirection: desc\n    where: {timestamp_gt: $timestamp_gt, timestamp_lt: $timestamp_lt}\n  ) {\n    number\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query testGetBlocks {\n  blocks(first: 100) {\n    id\n    number\n  }\n}"): (typeof documents)["query testGetBlocks {\n  blocks(first: 100) {\n    id\n    number\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;