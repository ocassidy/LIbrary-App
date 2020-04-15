import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import toastr from 'toastr';
import LoanDetailsBarChart from '../BarCharts/LoanDetailsBarChart';
import { getBookAnalytics, getBookDateRangeAnalytics } from '../../../redux/actions';
import QuickStats from '../QuickStats/QuickStats';
import DateRangeLineChart from '../LineCharts/DateRangeLineChart';

function Analytics(props) {
  const [showBookAnalytics, setShowBookAnalytics] = useState(false);
  const [showUserAnalytics, setShowUserAnalytics] = useState(false);
  const [showAllActiveAuthorLoans, setShowAllActiveAuthorLoans] = useState(true);
  const [showActiveAuthorLoans, setShowActiveAuthorLoans] = useState(true);
  const [showActiveGenreLoans, setShowActiveGenreLoans] = useState(true);
  const [showActiveEditionLoans, setShowActiveEditionLoans] = useState(true);
  const [showDateRangeActive, setShowDateRangeActive] = useState(true);
  const { bookAnalyticsList, bookDateRangeList, handleGetBookDateRangeAnalytics } = props;

  return (
    <div className="container-fluid">
      {bookAnalyticsList
        ? (
          <div className="row no-gutters justify-content-center m-2">
            <div className="col-sm-12 col-md-4 col-lg-5 border border-dark rounded m-2">
              <div className="h3 m-3">Toggles:</div>
              <div className="row no-gutters m-3 justify-content-center">
                <div className="col-auto mr-2 mb-2">
                  <Button
                    variant="light"
                    onClick={() => {
                      setShowBookAnalytics(!showBookAnalytics);
                      setShowUserAnalytics(false);
                    }}
                  >
                    Show Book Analytics
                  </Button>
                </div>
                <div className="col-auto mr-2 mb-2">
                  <Button
                    variant="light"
                  >
                    Show User Analytics
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-5 m-2">
              <QuickStats data={bookAnalyticsList} />
            </div>

            {showBookAnalytics
            && bookAnalyticsList.allLoanDetailsList
            && bookAnalyticsList.allLoanDetailsList.length > 0
              ? (
                <div className="col-12">
                  {showAllActiveAuthorLoans
                    ? (
                      <LoanDetailsBarChart
                        chartTitle="All Loans"
                        barColourFill="#80eb34"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="bookName"
                        xAxisDataLabel="Books"
                        yAxisDataLabel="Number Of Loans"
                        barDataKey="numberOfLoans"
                        setShowActiveLoans={setShowAllActiveAuthorLoans}
                        showActiveLoans={showAllActiveAuthorLoans}
                        data={bookAnalyticsList.allLoanDetailsList}
                      />
                    )
                    : (
                      <LoanDetailsBarChart
                        chartTitle="All Active Loans"
                        barColourFill="#329ea8"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="bookName"
                        xAxisDataLabel="Books"
                        yAxisDataLabel="Number Of Loans"
                        barDataKey="numberOfLoans"
                        setShowActiveLoans={setShowAllActiveAuthorLoans}
                        showActiveLoans={showAllActiveAuthorLoans}
                        data={bookAnalyticsList.allActiveLoansDetailsList}
                      />
                    )}

                  {showActiveAuthorLoans
                  && bookAnalyticsList.numOfLoansByAuthor
                  && bookAnalyticsList.numOfLoansByAuthor.length > 0
                    ? (
                      <LoanDetailsBarChart
                        chartTitle="Total Number of Loans by Author"
                        barColourFill="#329ea8"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="bookAuthor"
                        xAxisDataLabel="Author"
                        yAxisDataLabel="Number Of Loans"
                        barDataKey="numberOfLoans"
                        setShowActiveLoans={setShowActiveAuthorLoans}
                        showActiveLoans={showActiveAuthorLoans}
                        data={bookAnalyticsList.numOfLoansByAuthor}
                      />
                    )
                    : (
                      <LoanDetailsBarChart
                        chartTitle="Number of Active Loans by Author"
                        barColourFill="#329ea8"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="bookAuthor"
                        xAxisDataLabel="Author"
                        yAxisDataLabel="Number Of Loans"
                        barDataKey="numberOfLoans"
                        setShowActiveLoans={setShowActiveAuthorLoans}
                        showActiveLoans={showActiveAuthorLoans}
                        data={bookAnalyticsList.numOfActiveLoansByAuthor}
                      />
                    )}

                  {showActiveGenreLoans
                  && bookAnalyticsList.numOfLoansByGenre
                  && bookAnalyticsList.numOfLoansByGenre.length > 0
                    ? (
                      <LoanDetailsBarChart
                        chartTitle="Total Number of Loans by Genre"
                        barColourFill="#329ea8"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="bookGenre"
                        xAxisDataLabel="Genre"
                        yAxisDataLabel="Number Of Loans"
                        barDataKey="numberOfLoans"
                        setShowActiveLoans={setShowActiveGenreLoans}
                        showActiveLoans={showActiveGenreLoans}
                        data={bookAnalyticsList.numOfLoansByGenre}
                      />
                    ) : (
                      <LoanDetailsBarChart
                        chartTitle="Number of Active Loans by Genre"
                        barColourFill="#329ea8"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="bookGenre"
                        xAxisDataLabel="Genre"
                        yAxisDataLabel="Number Of Loans"
                        barDataKey="numberOfLoans"
                        setShowActiveLoans={setShowActiveGenreLoans}
                        showActiveLoans={showActiveGenreLoans}
                        data={bookAnalyticsList.numOfActiveLoansByGenre}
                      />
                    )}

                  {showActiveEditionLoans
                  && bookAnalyticsList.numOfLoansByEdition
                  && bookAnalyticsList.numOfLoansByEdition.length > 0
                    ? (
                      <LoanDetailsBarChart
                        chartTitle="Total Number of Loans by Edition"
                        barColourFill="#329ea8"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="bookEdition"
                        xAxisDataLabel="Edition"
                        yAxisDataLabel="Number Of Loans"
                        barDataKey="numberOfLoans"
                        setShowActiveLoans={setShowActiveEditionLoans}
                        showActiveLoans={showActiveEditionLoans}
                        data={bookAnalyticsList.numOfLoansByEdition}
                      />
                    ) : (
                      <LoanDetailsBarChart
                        chartTitle="Number of Active Loans by Edition"
                        barColourFill="#329ea8"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="bookEdition"
                        xAxisDataLabel="Edition"
                        yAxisDataLabel="Number Of Loans"
                        barDataKey="numberOfLoans"
                        setShowActiveLoans={setShowActiveEditionLoans}
                        showActiveLoans={showActiveEditionLoans}
                        data={bookAnalyticsList.numOfActiveLoansByEdition}
                      />
                    )}

                  {showDateRangeActive
                  && bookDateRangeList.getLoansInDateRange
                  && bookDateRangeList.getLoansInDateRange.length > 0
                    ? (
                      <DateRangeLineChart
                        startDate="2020-01-01"
                        endDate="2020-12-30"
                        chartTitle="Range of Book Loans In Date Range"
                        lineColourFill="#329ea8"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="dateWithdrawn"
                        xAxisDataLabel="Date Withdrawn"
                        yAxisDataLabel="Number Of Loans"
                        setShowActiveLoans={setShowDateRangeActive}
                        showActiveLoans={showDateRangeActive}
                        data={bookDateRangeList.getLoansInDateRange}
                        handleGetBookDateRangeAnalytics={handleGetBookDateRangeAnalytics}
                      />
                    ) : (
                      <DateRangeLineChart
                        startDate="2020-01-01"
                        endDate="2020-12-30"
                        chartTitle="Range of Active Book Loans In Date Range"
                        lineColourFill="#329ea8"
                        yAxisDataKey="numberOfLoans"
                        xAxisDataKey="dateWithdrawn"
                        xAxisDataLabel="Date Withdrawn"
                        yAxisDataLabel="Number Of Loans"
                        setShowActiveLoans={setShowDateRangeActive}
                        showActiveLoans={showDateRangeActive}
                        data={bookDateRangeList.getActiveLoansInDateRange}
                        handleGetBookDateRangeAnalytics={handleGetBookDateRangeAnalytics}
                      />
                    )}
                </div>
              ) : null}
          </div>
        ) : <div>Nothing retrieved for analytics</div>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  bookAnalyticsList: state.bookAnalytics.bookAnalyticsList,
  bookDateRangeList: state.bookAnalytics.bookDateRangeList,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBookAnalytics: () => {
    dispatch(getBookAnalytics());
  },
  handleGetBookDateRangeAnalytics: (e, startDate, endDate) => {
    e.preventDefault();

    if (moment(endDate).isBefore(startDate)) {
      return toastr.error(`End date of ${moment(endDate).format('DD-MM-YYYY')} 
      cannot be before start date of ${moment(startDate).format('DD-MM-YYYY')}.`,
      'Error');
    }

    return dispatch(getBookDateRangeAnalytics(startDate, endDate));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
