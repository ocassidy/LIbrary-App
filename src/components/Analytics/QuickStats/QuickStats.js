import React from 'react';
import './QuickStats.css';

export default function QuickStats(props) {
  const { data } = props;

  return (
    <div className="quickStatsContainer col-auto m-2">
      <h3 className="m-3">Quick Stats:</h3>
      {data
        ? (
          <div className="row no-gutters m-2">
            <h5 className="col-auto m-2">
              Total books:
              <div className="text-center m-1">{data.totalNumOfBooks}</div>
            </h5>
            <h5 className="col-auto m-2">
              Total users:
              <div className="text-center m-1">{data.totalNumOfUsers}</div>
            </h5>
            <h5 className="col-auto m-2">
              Total loans:
              <div className="text-center m-1">{data.totalNumOfLoans}</div>
            </h5>
            <h5 className="col-auto m-2">
              Total Fines:
              <div className="text-center m-1">{data.totalNumOfFines}</div>
            </h5>
            <h5 className="col-auto m-2">
              Total Missing:
              <div className="text-center m-1">{data.totalNumOfBooksMissing}</div>
            </h5>
          </div>
        )
        : <div>Nothing retrieved for quick stats.</div>}
    </div>
  );
}
