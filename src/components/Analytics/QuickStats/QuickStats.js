import React from 'react';

export default function QuickStats(props) {
  const { data } = props;

  return (
    <div>
      {data
        ? (
          <div className="row justify-content-start align-content-center border border-dark rounded">
            <div className="col-12 h3">Quick Stats:</div>
            <div className="col-auto h5">
              Total Books:
              <span className="text-center ml-1">{data.totalNumOfBooks}</span>
            </div>
            <div className="col-auto h5">
              Total Users:
              <span className="text-center ml-1">{data.totalNumOfUsers}</span>
            </div>
            <div className="col-auto h5">
              Total Loans:
              <span className="text-center ml-1">{data.totalNumOfLoans}</span>
            </div>
            <div className="col-auto h5">
              Total Extensions:
              <span className="text-center ml-1">{data.totalNumberOfExtensions}</span>
            </div>
            <div className="col-auto h5">
              Total Fines:
              <span className="text-center ml-1">{data.totalNumOfFines}</span>
            </div>
            <div className="col-auto h5">
              Total Missing:
              <span className="text-center ml-1">{data.totalNumOfBooksMissing}</span>
            </div>
          </div>
        )
        : <div>Nothing retrieved for quick stats.</div>}
    </div>
  );
}
