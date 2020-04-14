import React from 'react';
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function CustomLineChart(props) {
  const {
    data, chartTitle, lineColourFill, yAxisDataKey, xAxisDataKey,
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
        <ResponsiveContainer height={250}>
          <LineChart
            data={data}
            margin={{
              top: 25, right: 20, bottom: 25, left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} label={{ value: xAxisDataLabel, position: 'insideBottom', dy: 15 }} />
            <YAxis
              dataKey={yAxisDataKey}
              label={{
                value: yAxisDataLabel, position: 'insideLeft', angle: -90, dy: 60,
              }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="numberOfLoans" stroke={lineColourFill} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
