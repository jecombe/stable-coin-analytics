import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";

const SKIP_STABLE = ["Zunami ETH", "Rai Reflex Index"];

const formatNumber = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + "B"; // Billion
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + "M"; // Million
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + "K"; // Thousand
  }
  return `${num}`;
};

const StableTvl = ({ data }) => {
  const [brushIndex, setBrushIndex] = useState([0, 0]);

  useEffect(() => {
    console.log(brushIndex);
  }, [data]);

  const chartData = data.chains
    .filter((item) => item.tokenSymbol && !SKIP_STABLE.includes(item.name))
    .map((item) => ({
      name: item.name,
      tvl: item.tvl,
      formattedTvl: formatNumber(item.tvl),
    }));

  const topThree = [...chartData].sort((a, b) => b.tvl - a.tvl).slice(0, 3);

  return (
    <div className="w-full h-[500px] p-4 rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 40, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600" />
          <XAxis dataKey="name" tick={false} />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#8884d8"
            tickFormatter={formatNumber}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", color: "#fff" }}
            formatter={(value) => formatNumber(value)}
          />
          <Bar yAxisId="right" dataKey="tvl" fill="#82ca9d" />
          <Brush
            dataKey="name"
            height={30}
            stroke="#8884d8"
            travellerWidth={10}
            margin={{ top: 10 }}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="text-center mb-4 text-white">
        <ul className="list-disc pl-4">
          {topThree.map((item, index) => (
            <p key={index} className="text-lg">
              {index + 1}. {item.name}:{" "}
              <span className="font-semibold">{item.formattedTvl}</span>
            </p>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StableTvl;
