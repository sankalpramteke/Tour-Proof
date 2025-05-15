import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css";

const Calendar = ({ listing, startDate, endDate, onDateChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: startDate ? new Date(startDate) : new Date(),
    endDate: endDate ? new Date(endDate) : new Date(),
    key: "selection"
  });
  
  // Disabled dates from listing availability
  const [disabledDates, setDisabledDates] = useState([]);
  
  useEffect(() => {
    // If listing has availability data, convert it to disabled dates
    if (listing && listing.availability) {
      const unavailableDates = [];
      
      // Parse listing unavailable dates
      if (Array.isArray(listing.availability.unavailableDates)) {
        listing.availability.unavailableDates.forEach(dateStr => {
          unavailableDates.push(new Date(dateStr));
        });
      }
      
      setDisabledDates(unavailableDates);
    }
  }, [listing]);
  
  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
    onDateChange(ranges.selection.startDate, ranges.selection.endDate);
  };
  
  return (
    <div className="calendar-wrapper shadow-sm border rounded">
      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        months={2}
        direction="horizontal"
        minDate={new Date()}
        disabledDates={disabledDates}
        rangeColors={["#007bff"]}
        showDateDisplay={true}
        showMonthAndYearPickers={true}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
      />
    </div>
  );
};

export default Calendar;