"use client";

import StableCoinGraph from "@/components/StableCoinDepeg";
import StableTvl from "@/components/StableCoinTvl";
import StableCoinHistoryGraph from "@/components/StableCoinHistory";
import { HooksStableCoin, HooksStableCoinHistory } from "@/hooks/stableCoin";

export default function Home() {
  const stats = HooksStableCoin();
  const statsHistory = HooksStableCoinHistory();

  if (!stats || !statsHistory) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-950 flex-col">
      <div className="flex items-center justify-center w-full p-6">
        <h1 className="text-3xl font-bold text-white text-center">
          Analytics Stable Coins
        </h1>
      </div>

      <div className="flex flex-col md:flex-row w-full mb-10">
        <div className="w-full md:w-1/2 p-4 flex flex-col mb-8">
          <h2 className="text-lg font-semibold text-white text-center mb-4">
            Depeg for all chains for every hours
          </h2>
          <div className="w-full h-[500px]">
            <StableCoinGraph chains={stats.chains} peggedAssets={stats.peggedAssets} />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 flex flex-col mb-8">
          <h2 className="text-lg font-semibold text-white text-center mb-4">
            TVL for all chains all times
          </h2>
          <div className="w-full h-[500px]">
            <StableTvl chains={stats.chains} peggedAssets={stats.peggedAssets} />
          </div>
        </div>
      </div>

      <div className="w-full p-4 flex flex-col mt-10">
        <h2 className="text-lg font-semibold text-white text-center mb-4">
          StableCoin Price History in 1 year
        </h2>
        <div className="w-full h-[500px]">
          <StableCoinHistoryGraph history={statsHistory} />
        </div>
      </div>
    </div>
  );
}
