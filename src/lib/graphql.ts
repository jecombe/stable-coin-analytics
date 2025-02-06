import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  "https://indexer.dev.hyperindex.xyz/bdd91b0/v1/graphql",
  
);



export const STATS_QUERY = `
  query myQuery {
    GlobalStats {
      id
      numberOfSwaps
      numberOfPools
    }
    chain_metadata {
      chain_id
      latest_processed_block
    }
  }
`;

export const STATS_QUERY_ORDER = `
query GetGlobalStatsOverTime {
    GlobalStats(order_by: { db_write_timestamp: asc }) {
        id
        db_write_timestamp
        numberOfPools
        numberOfSwaps
    }
}
`;
