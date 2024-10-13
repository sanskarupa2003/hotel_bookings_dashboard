import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SparklineChart = ({ data, visitorType }) => {
  const chartData = data.map(item => parseInt(item[visitorType]));
  const total = chartData.reduce((sum, value) => sum + value, 0);

  const options = {
    chart: {
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0
    },
    title: {
      text: total.toString(),
      offsetX: 0,
      style: {
        fontSize: '24px',
      }
    },
    subtitle: {
      text: `Total ${visitorType}`,
      offsetX: 0,
      style: {
        fontSize: '14px',
      }
    }
  };

  const series = [{
    name: visitorType,
    data: chartData
  }];

  return (
    <ReactApexChart options={options} series={series} type="area" height={160} />
  );
};

export default SparklineChart;