import React, { useState } from 'react';
import LoanDetailsBarChart from '../BarCharts/LoanDetailsBarChart';

export default function UserAnalytics(props) {
  const [showAllActiveLoans, setShowAllActiveLoans] = useState(true);
  const { userAnalyticsList, handleGetUserAnalytics } = props;

  return (
    <div className="container-fluid">
      {userAnalyticsList
        ? (
          <div className="row no-gutters justify-content-center m-2">
            {userAnalyticsList
            && userAnalyticsList.getNumOfUserLoans
            && userAnalyticsList.getNumOfUserLoans.length > 0
              ? (
                <div className="col-12">
                  {showAllActiveLoans
                    ? (
                      <LoanDetailsBarChart
                        chartTitle="All Users By Number Of Loans"
                        barColourFill="#80eb34"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="username"
                        xAxisDataLabel="User"
                        yAxisDataLabel="Number Of Loans"
                        barDataKey="numberOfLoans"
                        setShowActiveLoans={setShowAllActiveLoans}
                        showActiveLoans={showAllActiveLoans}
                        data={userAnalyticsList.getNumOfUserLoans}
                        handleGetUserAnalytics={handleGetUserAnalytics}
                        numOfLoans={1}
                        numOfLoansForm
                      />
                    )
                    : (
                      <LoanDetailsBarChart
                        chartTitle="All Users By Number Of Active Loans"
                        barColourFill="#80eb34"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="username"
                        xAxisDataLabel="User"
                        yAxisDataLabel="Number Of Loans"
                        barDataKey="numberOfLoans"
                        setShowActiveLoans={setShowAllActiveLoans}
                        showActiveLoans={showAllActiveLoans}
                        data={userAnalyticsList.getNumOfActiveUserLoans}
                        handleGetUserAnalytics={handleGetUserAnalytics}
                        numOfLoans={1}
                        numOfLoansForm
                      />
                    )}
                </div>
              ) : null}
          </div>
        ) : <div>Nothing retrieved for analytics</div>}
    </div>
  );
}
