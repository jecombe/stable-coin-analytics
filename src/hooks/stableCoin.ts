"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { HistoryEntry, PropsInterface } from "@/interfaces/interface";

export function HooksStableCoin() {
  const [stats, setStats] = useState<PropsInterface | null>(null);

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
  const [stats, setStats] = useState<HistoryEntry[] | null>(null);

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
  
  
