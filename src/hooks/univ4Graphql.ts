"use client";
import { useEffect, useState } from "react";
import { graphqlClient, STATS_QUERY, STATS_QUERY_ORDER } from "@/lib/graphql";
interface Stats {
  GlobalStats: {
    id: string;
    numberOfSwaps: string;
    numberOfPools: string;
  }[];
  chain_metadata: {
    chain_id: number;
    latest_processed_block: number;
  }[];
}

interface StatsOrder {
    GetGlobalStatsOverTime: {
      id: string;
      db_write_timestamp: Date;
      numberOfPools: string;
      numberOfSwap: string;

    }[];
  }

export function Univ4Graph() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       //const data = await graphqlClient.request<Stats>(STATS_QUERY);
       const response = await graphqlClient.request<Stats>(STATS_QUERY, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        }
      }); 
     /*  const response = await axios.post("https://cors-anywhere.herokuapp.com/https://indexer.dev.hyperindex.xyz/bdd91b0/v1/graphql", {
        query: STATS_QUERY
      });*/
      
       // setStats(response);
      } catch (error) {
        console.log("pppppppppppppppppp",error);
      }
    };

    // Initial fetch
    fetchData();

    // Poll every 250 milliseconds
    const interval = setInterval(fetchData, 100000);

    return () => clearInterval(interval);
  }, []);

  return stats;
}

export function Univ4GraphOrder() {
    const [stats, setStats] = useState<StatsOrder | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await graphqlClient.request<StatsOrder>(STATS_QUERY_ORDER);
          setStats(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      // Initial fetch
      fetchData();
  
      // Poll every 250 milliseconds
      const interval = setInterval(fetchData, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return stats;
  }
  
