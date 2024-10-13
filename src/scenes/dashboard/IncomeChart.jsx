import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    id: "Ingresos",
    color: "hsl(207, 70%, 50%)",
    data: [
      { x: "Enero", y: 5000 },
      { x: "Febrero", y: 6000 },
      { x: "Marzo", y: 7000 },
      { x: "Abril", y: 8000 },
    ],
  },
];

function IncomeChart() {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Mes",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Ingresos",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
}

export default IncomeChart;
