import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardHeader, CardContent } from './Card';
import TimeSeriesChart from './TimeSeriesChart';
import ColumnChart from './ColumnChart';
import SparklineChart from './SparklineChart';
import './Dashboard.css';
// Import the JSON file
import jsonData from './hotel_bookings_1000.json';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState([new Date(2015, 0, 1), new Date(2015, 11, 31)]);
  const [bookingData, setBookingData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load the JSON file
    try {
      setAllData(jsonData);
    } catch (err) {
      console.error("Error loading JSON data:", err);
      setError("An error occurred while loading data");
    }
  }, []);

  useEffect(() => {
    try {
      filterData();
    } catch (err) {
      console.error("Error in filterData:", err);
      setError("An error occurred while filtering data");
    }
  }, [dateRange, allData]);

  const filterData = () => {
    console.log("Filtering data. All data length:", allData.length);
    const [start, end] = dateRange;
    const filteredData = allData.filter(booking => {
      const bookingDate = new Date(
        parseInt(booking.arrival_date_year),
        getMonthIndex(booking.arrival_date_month),
        parseInt(booking.arrival_date_day_of_month)
      );
      return bookingDate >= start && bookingDate <= end;
    });
    console.log("Filtered data length:", filteredData.length);
    setBookingData(filteredData);
  };

  const getMonthIndex = (monthName) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(monthName);
  };

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (allData.length === 0) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hotel Bookings Dashboard</h1>
      <DatePicker
        selectsRange={true}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={(update) => {
          setDateRange(update);
        }}
        className="mb-4"
      />
      <h3 className="text-2xl font-bold mb-4">Data exists form July 1st to August 9th</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card>
          <CardHeader>Number of Visitors per Day</CardHeader>
          <CardContent>
            <TimeSeriesChart data={bookingData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Number of Visitors per Country</CardHeader>
          <CardContent>
            <ColumnChart data={bookingData} />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card>
          <CardHeader>Total Adult Visitors</CardHeader>
          <CardContent>
            <SparklineChart data={bookingData} visitorType="adults" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Total Children Visitors</CardHeader>
          <CardContent>
            <SparklineChart data={bookingData} visitorType="children" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
