"use client";

import { useState } from 'react';
import styles from './hero.module.css'
import DatePicker from '@/components/DatePicker'

export default function Hero() {

  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [minors, setMinors] = useState(0);

  const handlePassengerChange = (type, operation) => {
    if (type === 'adults') {
      setAdults(prev => Math.max(1, operation === 'add' ? prev + 1 : prev - 1));
    } else {
      setMinors(prev => Math.max(0, operation === 'add' ? prev + 1 : prev - 1));
    }
  };

  const passengerSummary = `${adults} adult ${minors > 0 ? `, ${minors} minor` : ''}`;

  const airports = ['NRT', 'PVG', 'STL', 'ATL', 'MSP', 'SFO', 'JFK', 'LAX'];

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleInputClick = (setter) => () => {
    setter(prev => !prev);
  };

  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleDatePickerClose = (range) => {
    setSelectedDateRange(range);
    setShowDatepicker(false);
  };

  const formatDateRange = (range) => {
    if (!range) return 'Select date';
    const start = range.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!range.end) return start;
    const end = range.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${start} - ${end}`;
  };

  return (
      <div className={styles.main}>
        <p className={styles.title}>It's more than just a trip</p>

        <div className={styles.searchContainer}>
          
          <div className={styles.dropdownWrapper}>
          <input 
            type="text"
            className={styles.searchInput}
            placeholder="From where?"
            value={fromValue}
            onChange={handleInputChange(setFromValue)}
            onClick={handleInputClick(setFromDropdownOpen)}
          />
            {fromDropdownOpen && (
              <div className={styles.dropdown}>
                {airports.map((airport) => (
                  <div 
                    key={airport} 
                    className={styles.dropdownItem}
                    onClick={() => {
                      setFromValue(airport);
                      setFromDropdownOpen(false);
                    }}
                  >
                    {airport}
                  </div>
                ))}
              </div>
            )}
          </div>


          <div className={styles.divider}> </div>

          <div className={styles.dropdownWrapper}>
          <input 
            type="text"
            className={styles.searchInput}
            placeholder="Where to?"
            value={toValue}
            onChange={handleInputChange(setToValue)}
            onClick={handleInputClick(setToDropdownOpen)}
          />
            {toDropdownOpen && (
              <div className={styles.dropdown}>
                {airports.map((airport) => (
                  <div 
                    key={airport} 
                    className={styles.dropdownItem}
                    onClick={() => {
                      setToValue(airport);
                      setToDropdownOpen(false);
                    }}
                  >
                    {airport}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.divider}> </div>
          
          <div className={styles.datepicker}>
            <input
              type="text"
              readOnly
              className={styles.TextInput}
              value={formatDateRange(selectedDateRange)}
              onClick={() => setShowDatepicker(true)}
            />
            {showDatepicker && (
              <DatePicker onClose={handleDatePickerClose} />
            )}
          </div>

          <div className={styles.divider}> </div>

          <div className={styles.passengerDropdownWrapper}>
          <button 
            className={styles.passengerDropdownButton}
            onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
          >
            <span className={styles.passengerIcon}>
              <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="11.5" r="4" fill="#6E7491"/>
              <path d="M10 24.5C8.89543 24.5 7.97435 23.5907 8.24685 22.5202C9.12788 19.0595 12.265 16.5 16 16.5C19.735 16.5 22.8721 19.0595 23.7531 22.5202C24.0257 23.5907 23.1046 24.5 22 24.5H10Z" fill="#6E7491"/>
              </svg>
            </span> {passengerSummary}
          </button>
          {isPassengerDropdownOpen && (
            <div className={styles.passengerDropdown}>
              <div className={styles.passengerType}>
                <div className={styles.passengerTitle}>Adults:</div>
                <div className={styles.passengerIncrementer}>
                  <button onClick={() => handlePassengerChange('adults', 'subtract')}>-</button>
                  <div className={styles.passengerCount}>{adults}</div>
                  <button onClick={() => handlePassengerChange('adults', 'add')}>+</button>
                </div>
              </div>
              
              <div className={styles.passengerType}>
                <div className={styles.passengerTitle}>Minors:</div>
                <div className={styles.passengerIncrementer}>
                  <button onClick={() => handlePassengerChange('minors', 'subtract')}>-</button>
                  <div className={styles.passengerCount}>{minors}</div>
                  <button onClick={() => handlePassengerChange('minors', 'add')}>+</button>
                </div>
              </div>
            </div>
          )}
        </div>
          
          <button className={styles.searchButton}>Search</button>
        </div>

      </div>
  )
}

/*

<div className={styles.passengerType}>
                <div>Minors:</div>
                <button onClick={() => handlePassengerChange('minors', 'subtract')}>-</button>
                <div>{minors}</div>
                <button onClick={() => handlePassengerChange('minors', 'add')}>+</button>
              </div>
<div className={styles.dropdownWrapper}>
            <div 
              className={styles.dropdownButton}
              onClick={() => setToDropdownOpen(!toDropdownOpen)}
            >
              {toValue || "Where to?"}
            </div>
            {toDropdownOpen && (
              <div className={styles.dropdown}>
                {airports.map((airport) => (
                  <div 
                    key={airport} 
                    className={styles.dropdownItem}
                    onClick={() => {
                      setToValue(airport);
                      setToDropdownOpen(false);
                    }}
                  >
                    {airport}
                  </div>
                ))}
              </div>
            )}
          </div>
          */