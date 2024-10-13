import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const data = [
  { month: 'Enero', ventas: 120 },
  { month: 'Febrero', ventas: 80 },
  { month: 'Marzo', ventas: 130 },
  { month: 'Abril', ventas: 90 },

  { month: 'Mayo', ventas: 120 },
  { month: 'Junio', ventas: 80 },
  { month: 'Julio', ventas: 130 },
  { month: 'Agosto', ventas: 90 },

  { month: 'Septiembre', ventas: 120 },
  { month: 'Octubre', ventas: 80 },
  { month: 'Noviembre', ventas: 130 },
  { month: 'Diciembre', ventas: 90 },
];

function Stats() {
  return (
    <div style={{ height: 370, width: '110%' }}>  
      <ResponsiveBar
        data={data}
        keys={['ventas']}
        indexBy="month"
        margin={{ top: 50, right: 50, bottom: 100, left: 60 }}  
        padding={0.3}  
        colors={{ scheme: 'nivo' }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,  
          legend: 'Mes',
          legendPosition: 'middle',
          legendOffset: 50,  
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Ventas',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}  
        labelSkipHeight={12}  
        labelTextColor={{ from: 'color', modifiers: [['darker', 10]] }}
      />
    </div>
  );
}

export default Stats;
