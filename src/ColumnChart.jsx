import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = ({ data }) => {
  const countryData = data.reduce((acc, item) => {
    const visitors = parseInt(item.adults) + parseInt(item.children) + parseInt(item.babies);
    acc[item.country] = (acc[item.country] || 0) + visitors;
    return acc;
  }, {});

  const sortedData = Object.entries(countryData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: sortedData.map(item => item[0]),
      title: {
        text: 'Countries'
      }
    },
    yaxis: {
      title: {
        text: 'Number of Visitors'
      }
    },
    title: {
      text: 'Top 10 Countries by Number of Visitors',
      align: 'center'
    }
  };

  const series = [{
    name: 'Visitors',
    data: sortedData.map(item => item[1])
  }];

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};

export default ColumnChart;