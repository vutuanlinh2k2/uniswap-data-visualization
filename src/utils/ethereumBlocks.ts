import { gql } from "@apollo/client"

export const getBlocksQueryDocument = (timestamp: string) => {
  const queryString = `query blocks { t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
    timestamp + 600
  } }) {
        number
      }}`

  return gql(queryString)
}
