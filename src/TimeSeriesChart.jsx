import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TimeSeriesChart = ({ data }) => {
  const aggregatedData = data.reduce((acc, item) => {
    const date = new Date(
      parseInt(item.arrival_date_year),
      getMonthIndex(item.arrival_date_month),
      parseInt(item.arrival_date_day_of_month)
    ).getTime();
    
    const visitors = parseInt(item.adults) + parseInt(item.children) + parseInt(item.babies);
    
    if (acc[date]) {
      acc[date] += visitors;
    } else {
      acc[date] = visitors;
    }
    return acc;
  }, {});

  const chartData = Object.entries(aggregatedData).map(([date, visitors]) => ({
    x: parseInt(date),
    y: visitors
  })).sort((a, b) => a.x - b.x);

  const options = {
    chart: {
      id: 'visitors-timeseries',
      type: 'area',
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'Visitors Over Time',
      align: 'left'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    yaxis: {
      title: {
        text: 'Number of Visitors'
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: false,
    }
  };

  return (
    <ReactApexChart options={options} series={[{name: 'Visitors', data: chartData}]} type="area" height={350} />
  );
};

const getMonthIndex = (monthName) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months.indexOf(monthName);
};

export default TimeSeriesChart;