"use client";
import { useEffect, useState } from "react";
import { graphqlClient, STATS_QUERY_ORDER } from "@/lib/graphql";

interface StatsOrder {
    GetGlobalStatsOverTime: {
      id: string;
      db_write_timestamp: Date;
      numberOfPools: string;
      numberOfSwap: string;

    }[];
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
  
