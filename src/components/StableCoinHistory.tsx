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

const cssStyles = `
  @keyframes clignoter {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
  .dot-clignote {
    fill: red !important;
    animation: clignoter 1s infinite;
  }
  .custom-tooltip {
    max-height: 300px; /* Hauteur maximale pour activer le scroll */
    overflow-y: auto; /* Ajoute le défilement vertical */
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    pointer-events: none; /* Empêche l'interaction avec le Tooltip */
  }
`;

const CustomTooltip = ({ payload, label }) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="custom-tooltip">
      <p>{`Date: ${label}`}</p>
      {payload.map((entry, index) => (
        <p key={index}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const StableCoinHistoryGraph = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-white">Aucune donnée disponible</p>;
  }

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const stablecoinNames = Object.keys(data[1].prices);

  const filteredData = data.filter((entry) => {
    const entryDate = new Date(entry.date * 1000);
    return entryDate >= oneYearAgo;
  });

  const chartData = filteredData.map((entry) => {
    const formattedEntry = {
      date: new Date(entry.date * 1000).toLocaleDateString(),
    };
    stablecoinNames.forEach((coin) => {
      formattedEntry[coin] = entry.prices[coin];
    });
    return formattedEntry;
  });

  return (
    <div className="w-full h-[500px] p-4 rounded-lg shadow-lg">
      <style>{cssStyles}</style>

      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 40, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600" />
          <XAxis dataKey="date" tick={false} angle={-45} textAnchor="end" />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fill: "#fff" }}
            yAxisId="right"
            orientation="right"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#8884d8", strokeWidth: 2 }} wrapperStyle={{ zIndex: 1000 }} /> 

          {stablecoinNames.map((coin, index) => (
            <Line
              key={coin}
              yAxisId="right"
              type="monotone"
              dataKey={coin}
              stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
              strokeWidth={2}
            />
          ))}
          <Brush dataKey="date" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StableCoinHistoryGraph;
