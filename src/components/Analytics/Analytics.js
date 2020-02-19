import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../Shared/NavBar';
import BarChartsAnalytics from './BarCharts/BarChartsAnalytics';

function Analytics() {
  return (
    <div>
      <NavBar />
      <BarChartsAnalytics />
    </div>
  );
}

export default connect(null, null)(Analytics);
