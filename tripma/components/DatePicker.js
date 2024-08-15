"use client";

import { useState } from 'react';
import styles from './DatePicker.module.css';

const DatePicker = ({
    initialStartDate = new Date(),
    initialEndDate = new Date(),
    initialMonth = new Date(),
    onClose,
    initialTripType = 'roundTrip'
    }) => {
    const [selectedRange, setSelectedRange] = useState({ 
        start: initialStartDate ? new Date(initialStartDate.getFullYear(), initialStartDate.getMonth(), initialStartDate.getDate(), 12, 0, 0) : null, 
        end: initialEndDate ? new Date(initialEndDate.getFullYear(), initialEndDate.getMonth(), initialEndDate.getDate(), 12, 0, 0) : null
    });
    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const [tripType, setTripType] = useState(initialTripType);
    const [clearDate, setClearDate] = useState(false);
    const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12, 0, 0);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const renderCalendar = (date) => {
        const month = date.getMonth();
        const year = date.getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
    
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div key={`empty-${i}`} className={styles.emptyDay} />
            );
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month, i);
            const isSelected = (selectedRange.start && currentDate.getTime() === selectedRange.start.getTime()) || 
                            (selectedRange.end && currentDate.getTime() === selectedRange.end.getTime()) ||
                            (tripType === 'oneWay' && selectedRange.start && currentDate.getTime() === selectedRange.start.getTime());
            
            const isDisabled = currentDate < minDate;
            
            days.push(
                <div 
                key={i}
                className={`${styles.day} ${isSelected ? styles.selectedDay : ''} ${isDisabled ? styles.disabledDay : ''}`}
                onClick={() => !isDisabled && handleDateClick(currentDate)}
                >
                {i}
                </div>
            );
        }
    
        return days;
    };

    // CHANGE: Modified handleDateClick function to adjust dates to noon
    const handleDateClick = (date) => {
        setClearDate(false);
        let newRange;
        // Create a new date object set to noon on the selected day
        // This prevents issues with timezone conversions
        const adjustedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
        
        if (tripType === 'oneWay' || (selectedRange.start && selectedRange.end)) {
            newRange = { start: adjustedDate, end: null };
        } else {
            if (adjustedDate < selectedRange.start) {
                newRange = { start: adjustedDate, end: selectedRange.start };
            } else {
                newRange = { start: selectedRange.start, end: adjustedDate };
            }
        }
        setSelectedRange(newRange);
    };
    
    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };
    
    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };
    
    const handleTripTypeChange = (event) => {
        setTripType(event.target.value);
        if (event.target.value === 'oneWay') {
        setSelectedRange({ start: selectedRange.start, end: null });
        }
    };
    
    const handleDoneClick = () => {
        if (clearDate) {
            onClose("");
        } else {
            onClose(selectedRange);
        }
    };

    const handleClearDate = () => {
        setClearDate(true);
        setSelectedRange({ start: null, end: null });
    };

    return (
        <div className={styles.datePickerContainer}>
        <div className={styles.header}>
            <div className={styles.tripTypeContainer}>
            <input 
                type="radio" 
                id="roundTrip" 
                name="tripType" 
                value="roundTrip"
                checked={tripType === 'roundTrip'}
                onChange={handleTripTypeChange}
            />
            <label htmlFor="roundTrip">Round trip</label>
            <input 
                type="radio" 
                id="oneWay" 
                name="tripType" 
                value="oneWay"
                checked={tripType === 'oneWay'}
                onChange={handleTripTypeChange}
            />
            <label htmlFor="oneWay">One way</label>
            </div>
            <div className={styles.selectedRangeContainer}>
                <div className={styles.selectedRange}>
                    {selectedRange.start 
                        ? `${selectedRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        ${selectedRange.end && tripType === 'roundTrip' 
                            ? ` - ${selectedRange.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                            : ''}`
                        : 'No date selected'}
                </div>
                <button className={styles.doneButton} onClick={handleClearDate}>
                    Clear Date
                </button>
                <button className={styles.doneButton} onClick={handleDoneClick}>
                    Done
                </button>
            </div>
        </div>
        
        <div className={styles.calendarsContainer}>
            <button onClick={handlePrevMonth} className={styles.navButton}>{'<'}</button>

            {[0, 1].map((offset) => {
            const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
            return (
                <div key={offset} className={styles.calendarMonth}>
                <div className={styles.monthHeader}>
                    <span className={styles.monthYear}>
                    {months[monthDate.getMonth()]} {monthDate.getFullYear()}
                    </span>
                </div>
                <div className={styles.calendarGrid}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className={styles.dayLabel}>{day}</div>
                    ))}
                    {renderCalendar(monthDate)}
                </div>
                </div>
            );
            })}
            <button onClick={handleNextMonth} className={styles.navButton}>{'>'}</button>
        </div>
        </div>
    );
    };

export default DatePicker;