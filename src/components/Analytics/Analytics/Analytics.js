import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import LoanDetailsBarChart from '../BarCharts/LoanDetailsBarChart';
import { getBookAnalytics } from '../../../redux/actions';
import QuickStats from '../QuickStats/QuickStats';
import './Analytics.css';

function Analytics(props) {
  const { bookAnalyticsList } = props;

  return (
    <div>
      {bookAnalyticsList
        ? (
          <div className="container-fluid">
            <div className="row no-gutters justify-content-center">
              <QuickStats data={bookAnalyticsList} />
              <div className="analyticsTogglesContainer col-auto m-2">
                <h3 className="m-3">Toggles:</h3>
                <div className="col-auto">
                  <Button
                    className="analyticsToggleButtons"
                    variant="light"
                  >
                    Show Book Analytics
                  </Button>
                  <Button
                    className="analyticsToggleButtons"
                    variant="light"
                  >
                    Show User Analytics
                  </Button>
                </div>
              </div>
            </div>
            <LoanDetailsBarChart
              chartTitle="All Loans"
              barColourFill="#80eb34"
              yAxisDataKey="numberOfLoans"
              xAxisDataKey="bookName"
              barDataKey="numberOfLoans"
              data={bookAnalyticsList.allLoanDetailsList}
            />

            <LoanDetailsBarChart
              chartTitle="All Active Loans"
              barColourFill="#329ea8"
              yAxisDataKey="numberOfLoans"
              xAxisDataKey="bookName"
              barDataKey="numberOfLoans"
              data={bookAnalyticsList.allActiveLoansDetailsList}
            />
          </div>
        ) : <div>Nothing retrieved for analytics</div>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  bookAnalyticsList: state.bookAnalytics.bookAnalyticsList,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBookAnalytics: () => {
    dispatch(getBookAnalytics());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
