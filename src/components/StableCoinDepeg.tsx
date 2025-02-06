import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";

// CSS pour l'animation de clignotement
const styles = {
  dotClignote: {
    animation: "clignoter 1s infinite",
  },
};

// Définir une animation de clignotement en CSS
const cssStyles = `
  @keyframes clignoter {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .dot-clignote {
    fill: red !important;
    animation: clignoter 1s infinite;
  }
`;

const SKIP_STABLE = ["Zunami ETH", "Rai Reflex Index"];

const StableCoinGraph = ({ data }) => {
  if (!data || !data.peggedAssets) {
    return <p className="text-center text-white">Aucune donnée disponible</p>;
  }

  const chartData = data.peggedAssets
    .filter((item) => item.price)
    .filter((item) => item.name && !SKIP_STABLE.includes(item.name))
    .map((item) => ({
      name: item.name,
      tvl: item.tvl,
      price: item.price,
    }));

  const totalTokens = chartData.length;
  const tolerance = 0.01;
  const depeggedTokens = chartData.filter(
    (item) => item.price < 1 - tolerance || item.price > 1 + tolerance
  ).length;

  return (
    <div className="w-full h-[500px] p-4 rounded-lg shadow-lg">
      <style>{cssStyles}</style>


      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 40, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600" />
          <XAxis dataKey="name" tick={false} />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#82ca9d"
            className="text-white"
            domain={["auto", "auto"]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", color: "#fff" }}
          />
          <Line
            yAxisId="right"
            dataKey="price"
            stroke="none"
            dot={(props) => {
              const { cx, cy, value, index } = props;
              const item = chartData[index];
              const isDepegged =
                item.price < 1 - tolerance || item.price > 1 + tolerance;
              return (
                <circle
                  key={`dot-${item.name}-${index}`}
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={isDepegged ? "red" : "#82ca9d"}
                  className={isDepegged ? "dot-clignote" : ""}
                />
              );
            }}
            legendType="square"
          />
          <Brush
            dataKey="name"
            height={30}
            stroke="#8884d8"
            travellerWidth={10}
            margin={{ top: 10 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="text-center mb-4 text-white">
        <p>
          Tokens dépegés : {depeggedTokens} / {totalTokens}
        </p>
      </div>
    </div>
  );
};

export default StableCoinGraph;
