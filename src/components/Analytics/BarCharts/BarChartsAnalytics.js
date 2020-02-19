import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { API_BASE_URL } from '../../../constants/constants';
import './BarChartAnalytics.css';

export default function BarChartsAnalytics(props) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const postLogin = async () => {
      await axios.get(`${API_BASE_URL}/analytics/all-book-loan-details`, {
        cancelToken: source.token,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      })
        .then((response) => {
          setTableData(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            return toastr.error('Failed to connect to server, please try again later', 'Error');
          }
          throw error;
        });

      return () => {
        source.cancel();
      };
    };

    postLogin();
  }, []);

  console.log(tableData);
  return (
    <div>
      <ResponsiveContainer width="75%" height={300}>
        <BarChart
          data={tableData}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 1" />
          <XAxis dataKey="bookName" label={{ value: 'Books', position: 'insideBottom', dy: 15 }} />
          <YAxis
            dataKey="numberOfLoans"
            label={{
              value: 'Number of Loans', angle: -90, position: 'insideLeft', dx: -100,
            }}
          />
          <Tooltip />
          <Bar dataKey="numberOfLoans" fill="#80eb34" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
