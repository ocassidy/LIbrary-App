import React, { useEffect, useState } from 'react';
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import './LoanDetailsBarChart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExchangeAlt, faSync } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, FormLabel } from 'react-bootstrap';

export default function LoanDetailsBarChart(props) {
  const [stateNumOfLoans, setStateNumOfLoans] = useState(1);
  const {
    data, chartTitle, barColourFill, yAxisDataKey, xAxisDataKey, barDataKey,
    xAxisDataLabel, yAxisDataLabel, setShowActiveLoans, showActiveLoans,
    handleGetUserAnalytics, numOfLoans, numOfLoansForm,
  } = props;

  useEffect(() => {
    if (numOfLoans) {
      setStateNumOfLoans(numOfLoans);
    }
  }, [numOfLoans]);

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
      {numOfLoansForm
        ? (
          <Form
            onSubmit={(e) => handleGetUserAnalytics(e, stateNumOfLoans)}
          >
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-3 col-lg-auto mt-2">
                <FormLabel>Number of Loans:</FormLabel>
                <Form.Control
                  value={stateNumOfLoans || ''}
                  type="number"
                  placeholder="Number of Loans..."
                  required
                  onChange={(e) => setStateNumOfLoans(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-auto col-lg-auto align-self-end mt-2">
                <Button
                  type="submit"
                  variant="light"
                >
                  Change Number
                  <FontAwesomeIcon icon={faExchangeAlt} className="ml-2" />
                </Button>
              </div>
              <div className="col-sm-12 col-md-auto col-lg-auto align-self-end mt-2">
                <Button
                  onClick={(e) => {
                    handleGetUserAnalytics(e, 1);
                    setStateNumOfLoans(1);
                  }}
                  variant="light"
                >
                  Reset
                  <FontAwesomeIcon icon={faSync} className="ml-2" />
                </Button>
              </div>
            </div>
          </Form>
        )
        : null}
      <div className="d-flex justify-content-center">
        {data && data.length > 0
          ? (
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
          )
          : <div className="h4 m-4">No data found users with loans equal to or above {stateNumOfLoans}. Please try again.</div>}
      </div>
    </div>
  );
}
