import React, { useState } from 'react';
import LoanDetailsBarChart from '../BarCharts/LoanDetailsBarChart';
import LoansDateRangeLineChart from '../LineCharts/LoansDateRangeLineChart';

export default function BookAnalytics(props) {
  const [showAllActiveLoans, setShowAllActiveLoans] = useState(true);
  const [showActiveAuthorLoans, setShowActiveAuthorLoans] = useState(true);
  const [showActiveGenreLoans, setShowActiveGenreLoans] = useState(true);
  const [showActiveEditionLoans, setShowActiveEditionLoans] = useState(true);
  const [showDateRangeActive, setShowDateRangeActive] = useState(true);
  const {
    bookAnalyticsList,
    bookDateRangeList,
    handleGetBookDateRangeAnalytics,
    returnsDateRangeList,
    handleGetReturnDateRangeAnalytics,
  } = props;

  return (
    <div className="container-fluid">
      {bookAnalyticsList
        ? (
          <div className="row no-gutters justify-content-center m-2">
            <div className="col-12">
              {showAllActiveLoans
              && bookAnalyticsList.allLoanDetailsList
              && bookAnalyticsList.allLoanDetailsList.length > 0
                ? (
                  <LoanDetailsBarChart
                    chartTitle="All Loans"
                    barColourFill="#FAD35B"
                    yAxisDataKey="numberOfLoans"
                    xAxisDataKey="bookName"
                    xAxisDataLabel="Books"
                    yAxisDataLabel="Number Of Loans"
                    barDataKey="numberOfLoans"
                    setShowActiveLoans={setShowAllActiveLoans}
                    showActiveLoans={showAllActiveLoans}
                    showActiveLoansButton
                    data={bookAnalyticsList.allLoanDetailsList}
                  />
                )
                : (
                  <LoanDetailsBarChart
                    chartTitle="All Active Loans"
                    barColourFill="#FAD35B"
                    yAxisDataKey="numberOfLoans"
                    xAxisDataKey="bookName"
                    xAxisDataLabel="Books"
                    yAxisDataLabel="Number Of Loans"
                    barDataKey="numberOfLoans"
                    setShowActiveLoans={setShowAllActiveLoans}
                    showActiveLoans={showAllActiveLoans}
                    showActiveLoansButton
                    data={bookAnalyticsList.allActiveLoansDetailsList}
                  />
                )}

              {showActiveAuthorLoans
              && bookAnalyticsList.numOfLoansByAuthor
              && bookAnalyticsList.numOfLoansByAuthor.length > 0
                ? (
                  <LoanDetailsBarChart
                    chartTitle="Total Number of Loans by Author"
                    barColourFill="#9AD978"
                    yAxisDataKey="numberOfLoans"
                    xAxisDataKey="bookAuthor"
                    xAxisDataLabel="Author"
                    yAxisDataLabel="Number Of Loans"
                    barDataKey="numberOfLoans"
                    setShowActiveLoans={setShowActiveAuthorLoans}
                    showActiveLoans={showActiveAuthorLoans}
                    showActiveLoansButton
                    data={bookAnalyticsList.numOfLoansByAuthor}
                  />
                )
                : (
                  <LoanDetailsBarChart
                    chartTitle="Number of Active Loans by Author"
                    barColourFill="#9AD978"
                    yAxisDataKey="numberOfLoans"
                    xAxisDataKey="bookAuthor"
                    xAxisDataLabel="Author"
                    yAxisDataLabel="Number Of Loans"
                    barDataKey="numberOfLoans"
                    setShowActiveLoans={setShowActiveAuthorLoans}
                    showActiveLoans={showActiveAuthorLoans}
                    showActiveLoansButton
                    data={bookAnalyticsList.numOfActiveLoansByAuthor}
                  />
                )}

              {showActiveGenreLoans
              && bookAnalyticsList.numOfLoansByGenre
              && bookAnalyticsList.numOfLoansByGenre.length > 0
                ? (
                  <LoanDetailsBarChart
                    chartTitle="Total Number of Loans by Genre"
                    barColourFill="#47CFB4"
                    yAxisDataKey="numberOfLoans"
                    xAxisDataKey="bookGenre"
                    xAxisDataLabel="Genre"
                    yAxisDataLabel="Number Of Loans"
                    barDataKey="numberOfLoans"
                    setShowActiveLoans={setShowActiveGenreLoans}
                    showActiveLoans={showActiveGenreLoans}
                    showActiveLoansButton
                    data={bookAnalyticsList.numOfLoansByGenre}
                  />
                ) : (
                  <LoanDetailsBarChart
                    chartTitle="Number of Active Loans by Genre"
                    barColourFill="#47CFB4"
                    yAxisDataKey="numberOfLoans"
                    xAxisDataKey="bookGenre"
                    xAxisDataLabel="Genre"
                    yAxisDataLabel="Number Of Loans"
                    barDataKey="numberOfLoans"
                    setShowActiveLoans={setShowActiveGenreLoans}
                    showActiveLoans={showActiveGenreLoans}
                    showActiveLoansButton
                    data={bookAnalyticsList.numOfActiveLoansByGenre}
                  />
                )}

              {showActiveEditionLoans
              && bookAnalyticsList.numOfLoansByEdition
              && bookAnalyticsList.numOfLoansByEdition.length > 0
                ? (
                  <LoanDetailsBarChart
                    chartTitle="Total Number of Loans by Edition"
                    barColourFill="#67B7D7"
                    yAxisDataKey="numberOfLoans"
                    xAxisDataKey="bookEdition"
                    xAxisDataLabel="Edition"
                    yAxisDataLabel="Number Of Loans"
                    barDataKey="numberOfLoans"
                    setShowActiveLoans={setShowActiveEditionLoans}
                    showActiveLoans={showActiveEditionLoans}
                    showActiveLoansButton
                    data={bookAnalyticsList.numOfLoansByEdition}
                  />
                ) : (
                  <LoanDetailsBarChart
                    chartTitle="Number of Active Loans by Edition"
                    barColourFill="#67B7D7"
                    yAxisDataKey="numberOfLoans"
                    xAxisDataKey="bookEdition"
                    xAxisDataLabel="Edition"
                    yAxisDataLabel="Number Of Loans"
                    barDataKey="numberOfLoans"
                    setShowActiveLoans={setShowActiveEditionLoans}
                    showActiveLoans={showActiveEditionLoans}
                    showActiveLoansButton
                    data={bookAnalyticsList.numOfActiveLoansByEdition}
                  />
                )}

              {showDateRangeActive
              && bookDateRangeList.getLoansInDateRange
              && bookDateRangeList.getLoansInDateRange.length > 0
                ? (
                  <LoansDateRangeLineChart
                    startDate="2020-01-01"
                    endDate="2020-12-30"
                    chartTitle="Number of Book Loans In Date Range"
                    lineColourFill="#B494C5"
                    yAxisDataKey="numberOfLoans"
                    xAxisDataKey="dateWithdrawn"
                    xAxisDataLabel="Date Withdrawn"
                    yAxisDataLabel="Number Of Loans"
                    setShowActiveLoans={setShowDateRangeActive}
                    showActiveLoans={showDateRangeActive}
                    data={bookDateRangeList.getLoansInDateRange}
                    showActiveLoansButton
                    handleGetRangeAnalytics={handleGetBookDateRangeAnalytics}
                  />
                ) : (
                  <LoansDateRangeLineChart
                    startDate="2020-01-01"
                    endDate="2020-12-30"
                    chartTitle="Number of Active Book Loans In Date Range"
                    lineColourFill="#B494C5"
                    yAxisDataKey="numberOfLoans"
                    xAxisDataKey="dateWithdrawn"
                    xAxisDataLabel="Date Withdrawn"
                    yAxisDataLabel="Number Of Loans"
                    setShowActiveLoans={setShowDateRangeActive}
                    showActiveLoans={showDateRangeActive}
                    data={bookDateRangeList.getActiveLoansInDateRange}
                    showActiveLoansButton
                    handleGetRangeAnalytics={handleGetBookDateRangeAnalytics}
                  />
                )}

              {returnsDateRangeList.returnsInDateRange
              && returnsDateRangeList.returnsInDateRange.length > 0
                ? (
                  <LoansDateRangeLineChart
                    startDate="2020-01-01"
                    endDate="2020-12-30"
                    chartTitle="Number of Books Returned In Date Range"
                    lineColourFill="#D5758A"
                    yAxisDataKey="numberReturned"
                    xAxisDataKey="dateReturned"
                    xAxisDataLabel="Date Returned"
                    yAxisDataLabel="Number Of Returns"
                    data={returnsDateRangeList.returnsInDateRange}
                    handleGetRangeAnalytics={handleGetReturnDateRangeAnalytics}
                    returnRange
                  />
                ) : null}
            </div>
          </div>
        ) : <div>Nothing retrieved for analytics</div>}
    </div>
  );
}
