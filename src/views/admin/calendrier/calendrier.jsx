import React from 'react';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Calendrier = () => {
  const [date, setDate] = useState(new Date());

  // List of well-known holidays
  const holidays = [
    { date: '2024-01-01', name: "New Year's Day" },
    { date: '2024-05-27', name: 'Memorial Day' },
    { date: '2024-07-04', name: 'Independence Day' },
    { date: '2024-09-02', name: 'Labor Day' },
    { date: '2024-10-31', name: 'Halloween' },
    { date: '2024-11-11', name: 'Veterans Day' },
    { date: '2024-12-25', name: 'Christmas Day' },
    // Add more holidays as needed
  ];

  const isHoliday = (checkDate) => {
    const formattedCheckDate = moment(checkDate).format('YYYY-MM-DD');
    return holidays.some((holiday) => holiday.date === formattedCheckDate);
  };

  const tileContent = ({ date, view }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const holiday = holidays.find((h) => h.date === formattedDate);

    if (view === 'month' && holiday) {
      return (
        <div className="holiday-marker">
          <span style={{ color: 'red' }}>H</span>
          <br />
          {holiday.name}
        </div>
      );
    }
    return null;
  };

  return (
    <div className='mt-6'>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        localizer={localizer}
        style={{
          height: 700,
        }}
      />
    </div>
  );
};

export default Calendrier;
