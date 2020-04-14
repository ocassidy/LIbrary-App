import React from 'react';
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import './LoanDetailsBarChart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

export default function LoanDetailsBarChart(props) {
  const {
    data, chartTitle, barColourFill, yAxisDataKey, xAxisDataKey, barDataKey,
    xAxisDataLabel, yAxisDataLabel, setShowActiveLoans, showActiveLoans,
  } = props;

  return (
    <div className="container-fluid">
      <div className="text-center font-weight-bold m-2">{chartTitle}</div>
      <div className="mr-3 d-flex justify-content-end">
        <Button
          onClick={() => setShowActiveLoans(!showActiveLoans)}
          variant="light"
        >
          {showActiveLoans ? 'Show Only Active Loans' : 'Show All Loans'}
          <FontAwesomeIcon icon={faEdit} className="ml-2" />
        </Button>
      </div>
      <div className="d-flex justify-content-center">
        <ResponsiveContainer height={300}>
          <BarChart
            data={data}
            margin={{
              top: 25, right: 20, bottom: 25, left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="1 0" />
            <XAxis
              dataKey={xAxisDataKey}
              label={{ value: xAxisDataLabel, position: 'insideBottom', dy: 20 }}
            />
            <YAxis
              dataKey={yAxisDataKey}
              label={{
                value: yAxisDataLabel, position: 'insideLeft', angle: -90, dy: 60,
              }}
            />
            <Tooltip />
            <Bar dataKey={barDataKey} fill={barColourFill} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
