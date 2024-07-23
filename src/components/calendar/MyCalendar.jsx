import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  // List of well-known holidays
  const holidays = [
    { date: '2024-01-01', name: 'New Year\'s Day' },
    { date: '2024-05-27', name: 'Memorial Day' },
    { date: '2024-07-04', name: 'Independence Day' },
    { date: '2024-09-02', name: 'Labor Day' },
    { date: '2024-10-31', name: 'Halloween' },
    { date: '2024-11-11', name: 'Veterans Day' },
    { date: '2024-12-25', name: 'Christmas Day' },
    // Add more holidays as needed
  ];

  const isHoliday = (checkDate) => {
    const formattedCheckDate = checkDate.toISOString().split('T')[0];
    return holidays.some((holiday) => holiday.date === formattedCheckDate);
  };

  const tileContent = ({ date }) => {
    if (isHoliday(date)) {
      return <span className="holiday-marker">H</span>;
    }
    return null;
  };

  return (
    <div>
      <Calendar onChange={setDate} value={date} tileContent={tileContent} />
    </div>
  );
};

export default MyCalendar;