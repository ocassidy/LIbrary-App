import React from 'react';
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import './LoanDetailsBarChart.css';

export default function LoanDetailsBarChart(props) {
  const { bookAnalyticsList, chartTitle, barColourFill, yAxisDataKey, xAxisDataKey, barDataKey } = props;

  return (
    <div className="barChartContainer">
      <div className="barChartTitle">{chartTitle}</div>
      <ResponsiveContainer width="70%" height={300}>
        <BarChart
          data={bookAnalyticsList}
          margin={{
            top: 25, right: 20, bottom: 25, left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="1 0" />
          <XAxis dataKey={xAxisDataKey} label={{ value: 'Books', position: 'insideBottom', dy: 20 }} />
          <YAxis
            dataKey={yAxisDataKey}
            label={{
              value: 'Number of Loans', position: 'insideLeft', dx: -100,
            }}
          />
          <Tooltip />
          <Bar dataKey={barDataKey} fill={barColourFill} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
