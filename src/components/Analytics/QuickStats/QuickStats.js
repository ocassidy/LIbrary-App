import React from 'react';

export default function QuickStats(props) {
  const { data } = props;

  return (
    <div className="border border-dark rounded">
      <div className="m-3 h3">Quick Stats:</div>
      {data
        ? (
          <div className="row no-gutters m-2 justify-content-center">
            <div className="col-auto m-1 h5">
              Total books:
              <div className="text-center m-1">{data.totalNumOfBooks}</div>
            </div>
            <div className="col-auto m-1 h5">
              Total users:
              <div className="text-center m-1">{data.totalNumOfUsers}</div>
            </div>
            <div className="col-auto m-1 h5">
              Total loans:
              <div className="text-center m-1">{data.totalNumOfLoans}</div>
            </div>
            <div className="col-auto m-1 h5">
              Total Fines:
              <div className="text-center m-1">{data.totalNumOfFines}</div>
            </div>
            <div className="col-auto m-1 h5">
              Total Missing:
              <div className="text-center m-1">{data.totalNumOfBooksMissing}</div>
            </div>
          </div>
        )
        : <div>Nothing retrieved for quick stats.</div>}
    </div>
  );
}
