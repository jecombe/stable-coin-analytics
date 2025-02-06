"use client";
import { useEffect, useState } from "react";
import { graphqlClient, STATS_QUERY, STATS_QUERY_ORDER } from "@/lib/graphql";
import axios from "axios";
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

export function HooksStableCoin() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://stablecoins.llama.fi/stablecoins', {
              params: {
                includePrices: true,
              },
              headers: {
                'accept': '*/*',
              }
            });
        
            console.log("Hooks",response.data);
            setStats(response.data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };

    // Initial fetch
    fetchData();

    // Poll every 250 milliseconds
    const interval = setInterval(fetchData, 1800000); // 1800000 ms = 30 minutes

    return () => clearInterval(interval);
  }, []);

  return stats;
}


export function HooksStableCoinHistory() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://stablecoins.llama.fi/stablecoinprices', {
              headers: {
                'accept': '*/*',
              }
            });
        
            console.log("Hooks",response.data);
            setStats(response.data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };

    // Initial fetch
    fetchData();

    // Poll every 250 milliseconds
    const interval = setInterval(fetchData, 1800000); // 1800000 ms = 30 minutes

    return () => clearInterval(interval);
  }, []);

  return stats;
}
  
  
