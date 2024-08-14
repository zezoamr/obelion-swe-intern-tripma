"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './hero.module.css'
import DatePicker from '@/components/DatePicker'

export default function Hero({
  className,
  fromValue: initialFromValue = '',
  toValue: initialToValue = '',
  selectedDateRange: initialSelectedDateRange = null,
  adults: initialAdults = 1,
  minors: initialMinors = 0,
}) {
  const router = useRouter();

  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [fromValue, setFromValue] = useState(initialFromValue);
  const [toValue, setToValue] = useState(initialToValue);

  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(initialAdults);
  const [minors, setMinors] = useState(initialMinors);

  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(initialSelectedDateRange);

  const [airports, setAirports] = useState([]);


  //////////

  const handlePassengerChange = (type, operation) => {
    if (type === 'adults') {
      setAdults(prev => Math.max(1, operation === 'add' ? Number(prev) + 1 : Number(prev) - 1));
    } else {
      setMinors(prev => Math.max(0, operation === 'add' ? Number(prev) + 1 : Number(prev) - 1));
    }
  };

  const passengerSummary = `${adults} adult ${minors > 0 ? `, ${minors} minor` : ''}`;

  
  useEffect(() => {
    async function fetchAirports() {
      try {
        const response = await fetch('http://localhost:3000/api/Flights/airports',);
        if (!response.ok) {
          throw new Error('Failed to fetch airports');
        }
        const data = await response.json();
        setAirports(data);
      } catch (error) {
        console.error('Error fetching airports:', error);
      }
    }

    fetchAirports();
  }, []);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleInputClick = (setter) => () => {
    setter(prev => !prev);
  };

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

  const handleSearch = () => {
    const params = new URLSearchParams({
      from: fromValue,
      to: toValue,
      dateRange: selectedDateRange ? `${selectedDateRange.start.toISOString()},${selectedDateRange.end ? selectedDateRange.end.toISOString() : ''}` : '',
      adults: adults.toString(),
      minors: minors.toString()
    });

    router.push(`/search?${params.toString()}`, undefined, { shallow: false });
  };

  return (
      <div className={`${styles.main} ${className}`}>
        <p className={styles.title}>It's more than just a trip</p>

        <div className={styles.searchContainer}>
          
          <div className={styles.dropdownWrapper}>

          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule ="evenodd" clipRule="evenodd" d="M4.29285 15.8155C4.02797 15.919 3.91945 16.2356 4.06513 16.4799L5.81319 19.4108C6.06359 19.8306 6.58081 20.0079 7.0361 19.8299L23.9381 13.223C24.7279 12.9143 25.1179 12.0237 24.8092 11.234C24.4883 10.413 23.5436 10.0302 22.7417 10.3961L17.7432 12.6773L10.773 6.27125C10.4838 6.00546 10.0685 5.9276 9.70266 6.0706C9.08963 6.31023 8.85636 7.05604 9.22358 7.60227L13.6983 14.2584L6.85554 17.3571L4.72413 15.8669C4.59802 15.7787 4.43618 15.7594 4.29285 15.8155ZM25.6776 22.9521H5.14764V24.5313H25.6776V22.9521Z" fill="#6E7491"/>
          </svg>

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

          <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule ="evenodd" clipRule="evenodd" d="M7.50839 9.47885C7.23791 9.39096 6.95325 9.56698 6.91102 9.84824L6.40439 13.223C6.33182 13.7065 6.61938 14.1715 7.08429 14.3226L24.3436 19.9304C25.15 20.1925 26.0162 19.7511 26.2783 18.9446C26.5507 18.1063 26.0629 17.2113 25.2108 16.9859L19.8991 15.5805L18.571 6.20729C18.5159 5.81839 18.2441 5.49483 17.8705 5.37345C17.2446 5.17006 16.5913 5.59887 16.5289 6.2541L15.7688 14.2384L8.51258 12.2959L7.80926 9.7921C7.76765 9.64395 7.65474 9.5264 7.50839 9.47885ZM26.3445 22.9521H5.81445V24.5314H26.3445V22.9521Z" fill="#6E7491"/>
          </svg>

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

          <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.334 5.77778C10.334 5.34822 10.9198 5 11.334 5C11.7482 5 12.334 5.34822 12.334 5.77778V7.33333H10.334V5.77778Z" fill="#6E7491"/>
          <path d="M20.334 5.77778C20.334 5.34822 20.9198 5 21.334 5C21.7482 5 22.334 5.34822 22.334 5.77778V7.33333H20.334V5.77778Z" fill="#6E7491"/>
          <path fillRule ="evenodd" clipRule="evenodd" d="M10.334 7.33333H8.08398C7.66977 7.33333 7.33398 7.68156 7.33398 8.11111V25.2222C7.33398 25.6518 7.66977 26 8.08398 26H24.584C24.9982 26 25.334 25.6518 25.334 25.2222V8.11111C25.334 7.68156 24.9982 7.33333 24.584 7.33333H22.334H20.334H12.334H10.334ZM23.834 12H8.83398V24.4444H23.834V12Z" fill="#6E7491"/>
          <path d="M10.334 15.5C10.334 14.6716 11.0056 14 11.834 14C12.6624 14 13.334 14.6716 13.334 15.5C13.334 16.3284 12.6624 17 11.834 17C11.0056 17 10.334 16.3284 10.334 15.5Z" fill="#6E7491"/>
          <path d="M22.334 18.5C22.334 17.6716 21.6624 17 20.834 17C20.0056 17 19.334 17.6716 19.334 18.5C19.334 19.3284 20.0056 20 20.834 20C21.6624 20 22.334 19.3284 22.334 18.5Z" fill="#6E7491"/>
          </svg>

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
          
          <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        </div>

      </div>
  )
}
