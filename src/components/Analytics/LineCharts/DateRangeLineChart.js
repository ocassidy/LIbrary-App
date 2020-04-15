import React, { useEffect, useState } from 'react';
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import {
  Button, Form, FormLabel,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExchangeAlt, faSync } from '@fortawesome/free-solid-svg-icons';

export default function DateRangeLineChart(props) {
  const [stateStartDate, setStateStartDate] = useState('');
  const [stateEndDate, setStateEndDate] = useState('');
  const {
    data, chartTitle, lineColourFill, yAxisDataKey, xAxisDataKey,
    xAxisDataLabel, yAxisDataLabel, setShowActiveLoans, showActiveLoans,
    startDate, endDate, handleGetBookDateRangeAnalytics,
  } = props;

  useEffect(() => {
    if (startDate && endDate) {
      setStateStartDate(startDate);
      setStateEndDate(endDate);
    }
  }, [startDate, endDate]);

  return (
    <div className="container-fluid">
      <div className="text-center font-weight-bold m-2">{chartTitle}</div>
      <div className="row justify-content-end">
        <div className="col-auto mt-2 align-self-end">
          <Button
            onClick={() => setShowActiveLoans(!showActiveLoans)}
            variant="light"
          >
            {showActiveLoans ? 'Show Only Active Loans' : 'Show All Loans'}
            <FontAwesomeIcon icon={faEdit} className="ml-2" />
          </Button>
        </div>
      </div>
      <Form
        onSubmit={(e) => handleGetBookDateRangeAnalytics(e, stateStartDate, stateEndDate)}
      >
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-3 col-lg-auto mt-2">
            <FormLabel>Start Date:</FormLabel>
            <Form.Control
              value={stateStartDate || ''}
              type="date"
              placeholder="Username or Email"
              required
              onChange={(e) => setStateStartDate(e.target.value)}
            />
          </div>
          <div className="col-sm-12 col-md-auto col-lg-auto mt-2">
            <FormLabel>End Date:</FormLabel>
            <Form.Control
              value={stateEndDate || ''}
              type="date"
              placeholder="Username or Email"
              required
              onChange={(e) => setStateEndDate(e.target.value)}
            />
          </div>
          <div className="col-sm-12 col-md-auto col-lg-auto align-self-end mt-2">
            <Button
              type="submit"
              variant="light"
            >
              Change Range
              <FontAwesomeIcon icon={faExchangeAlt} className="ml-2" />
            </Button>
          </div>
          <div className="col-sm-12 col-md-auto col-lg-auto align-self-end mt-2">
            <Button
              onClick={(e) => {
                handleGetBookDateRangeAnalytics(e, '2020-01-01', '2020-12-30');
                setStateStartDate(startDate);
                setStateEndDate(endDate);
              }}
              variant="light"
            >
              Reset
              <FontAwesomeIcon icon={faSync} className="ml-2" />
            </Button>
          </div>
        </div>
      </Form>
      <div className="d-flex justify-content-center">
        {data && data.length > 0
          ? (
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
          )
          : <div className="h4 m-4">No data found for date range. Please try again.</div>}
      </div>
    </div>
  );
}
