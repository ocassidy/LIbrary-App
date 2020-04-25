import React, { useState } from 'react';
import LoanDetailsBarChart from '../BarCharts/LoanDetailsBarChart';

export default function UserAnalytics(props) {
  const [showAllActiveLoans, setShowAllActiveLoans] = useState(true);
  const {
    userLoansAnalyticsList,
    handleGetUserLoansAnalytics,
    userReturnsAnalyticsList,
    handleGetUserReturnsAnalytics,
  } = props;

  return (
    <div className="container-fluid">
      {userLoansAnalyticsList
        ? (
          <div className="row no-gutters justify-content-center m-2">
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
                    showActiveLoansButton
                    data={userLoansAnalyticsList.getNumOfUserLoans}
                    handleGetUserAnalytics={handleGetUserLoansAnalytics}
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
                    showActiveLoansButton
                    data={userLoansAnalyticsList.getNumOfActiveUserLoans}
                    handleGetUserAnalytics={handleGetUserLoansAnalytics}
                    numOfLoans={1}
                    numOfLoansForm
                  />
                )}
            </div>

            <div className="col-12">
              <LoanDetailsBarChart
                chartTitle="All Users By Number Of Returns"
                barColourFill="#80eb34"
                yAxisDataKey="numberOfReturns"
                xAxisDataKey="username"
                xAxisDataLabel="User"
                yAxisDataLabel="Number Of Returns"
                barDataKey="numberOfReturns"
                showActiveLoansButton={false}
                data={userReturnsAnalyticsList.getNumOfUserReturns}
                handleGetUserAnalytics={handleGetUserReturnsAnalytics}
                numOfLoans={1}
                numOfLoansForm
              />
            </div>
          </div>
        ) : <div>Nothing retrieved for user analytics</div>}
    </div>
  );
}
