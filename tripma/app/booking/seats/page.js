"use client";

import { useState, useCallback, useEffect } from "react";
import { useCart } from '@/providers/CartProvider'
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Airplane from './airplane';
import SeatSelector from './seatSelector';


export default function FlightSeatsDetails() {
  const { cartItems, passengerTotal, flightSeats, updateFlightSeats, passengersInfo } = useCart();
  const router = useRouter();

  const [currentFlightIndex, setCurrentFlightIndex] = useState((flightSeats && flightSeats.length && flightSeats.length !== 0) ? flightSeats.length - 1 : 0);
  // -1, 0  doesn't work but this does// useState((flightSeats && flightSeats.length && flightSeats.length !== 0) ? flightSeats.length - 1 : 0)
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);
  // console.log('aaaaaaaaa', currentPassengerIndex)
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Convert state to variables
  let currentFlightSeats = cartItems[0]?.seatsData || mockseatsData;
  let currentFlightDividerLocation = cartItems[0]?.dividerLocations || mockdividerLocations;

  // Initialize the variables
  if (currentFlightIndex > 0 && cartItems[currentFlightIndex]?.seatsData) {
    try {
      currentFlightSeats = JSON.parse(cartItems[currentFlightIndex].seatsData);
    } catch (error) {
      currentFlightSeats = cartItems[currentFlightIndex].seatsData;
    }
  } else if (cartItems[0]?.seatsData) {
    try {
      currentFlightSeats = JSON.parse(cartItems[0].seatsData);
    } catch (error) {
      currentFlightSeats = cartItems[0].seatsData;
    }
  }

  if (currentFlightIndex > 0 && cartItems[currentFlightIndex]?.dividerLocations) {
    try {
      currentFlightDividerLocation = JSON.parse(cartItems[currentFlightIndex].dividerLocations);
    } catch (error) {
      currentFlightDividerLocation = cartItems[currentFlightIndex].dividerLocations;
    }
  } else if (cartItems[0]?.dividerLocations) {
    currentFlightDividerLocation = cartItems[0].dividerLocations;
  }

  console.log('passengersInfo', passengersInfo[currentPassengerIndex], 'currentPassengerIndex', currentPassengerIndex);
  // console.log('passengersInfo', JSON.stringify(passengersInfo[0].passengerInfo.firstName))
  //console.log('currentFlightSeats', currentFlightSeats);
  //console.log('currentFlightDividerLocation', currentFlightDividerLocation);

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsLoading(false);
    }
  }, [cartItems]);

  
  useEffect(() => {
    if (currentFlightIndex >= cartItems.length && !isLoading) {
      router.push('/booking/payment');
    }
  }, [currentFlightIndex, cartItems.length, router, isLoading]);

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  }; 

  const handleOpenOverlay = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    handleSeatSelection(selectedSeat);
    updateFlightSeats(currentFlightIndex, currentPassengerIndex, selectedSeat);

    // Move to the next passenger or flight
    if (currentPassengerIndex + 1 < passengerTotal()) { 
      setCurrentPassengerIndex(currentPassengerIndex + 1);
    } else {
      setCurrentFlightIndex(currentFlightIndex + 1);
      setCurrentPassengerIndex(0);
    }

    setShowOverlay(false);
  };

  const handleUpgrade = (upgradeCost) => {
  if (!selectedSeat) return;

  let availableBusinessSeat = null;
  let rowIndex = -1;
  let seatIndex = -1;

  // Find the first available business class seat
  for (let i = 0; i < currentFlightSeats.length; i++) {
    for (let j = 0; j < currentFlightSeats[i].length; j++) {
      const seat = currentFlightSeats[i][j];
      const seatDisplay = `${i + 1}${String.fromCharCode(65 + j)}`;
      
      if (seat.available && 
          seat.class === 'business' && 
          !seat.upgraded &&
          !takenSeats.some(s => s.seatDisplay === seatDisplay)) {
        availableBusinessSeat = seat;
        rowIndex = i;
        seatIndex = j;
        break;
      }
    }
    if (availableBusinessSeat) break;
  }

  // Proceed if a business class seat is found and selected seat is not already business
  if (availableBusinessSeat && selectedSeat.class !== 'business') {
    const seatLetter = String.fromCharCode(65 + seatIndex);
    const seatDisplay = `${rowIndex + 1}${seatLetter}`;
    const newSelectedSeat = {
      row: rowIndex,
      seat: seatIndex,
      seatDisplay: seatDisplay,
      class: 'business',
      upgraded: true,
      upgradeCost: upgradeCost
    };

    console.log("Seat upgraded: ", newSelectedSeat);
    setSelectedSeat(newSelectedSeat);
    updateFlightSeats(currentFlightIndex, currentPassengerIndex, newSelectedSeat);
  }

  setShowOverlay(false);

  // Move to the next passenger or flight
  if (currentPassengerIndex + 1 < passengerTotal()) {
    setCurrentPassengerIndex(currentPassengerIndex + 1);
  } else {
    setCurrentFlightIndex(currentFlightIndex + 1);
    setCurrentPassengerIndex(0);
  }
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (currentFlightIndex >= cartItems.length) {
    return null;
  }

  const currentFlight = cartItems[currentFlightIndex];
  const takenSeats = flightSeats[currentFlightIndex] || []; 

  return (
    <>
      <div className={styles.container}>
        <Airplane
          seatsData={currentFlightSeats}
          dividerLocations={currentFlightDividerLocation}
          selectedSeat={selectedSeat}
          setSelectedSeat={handleSeatSelection}
          takenSeats={takenSeats}
        />
        <SeatSelector
          OpenOverlay={handleOpenOverlay}
          selectedSeat={selectedSeat}
          handleNavigation={handleSeatSelection}
          flight={currentFlight}
          passengerNumber={currentPassengerIndex + 1}
          flightNumber={currentFlightIndex + 1}
          totalFlights={cartItems.length}
          passengerName={passengersInfo[currentPassengerIndex].passengerInfo.firstName + ' ' + passengersInfo[currentPassengerIndex].passengerInfo.lastName}
        />
      </div>
      {showOverlay && (
        <Overlay
          currentseat={selectedSeat}
          onClose={handleCloseOverlay}
          onUpgrade={handleUpgrade}
          flight={currentFlight}
        />
      )}
    </>
  );
}

function Overlay({ onClose, onUpgrade, currentseat, flight }) {
  if (!currentseat) return null;
  if (currentseat.class === 'business') {
    onClose(currentseat);
  };
  
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <UpgradeSeatModal onClose={onClose} onUpgrade={onUpgrade} flight={flight}/>
      </div>
    </div>
  );
}

const UpgradeSeatModal = ({ onClose, onUpgrade, flight }) => {
  const upgradeCost = flight ? (flight.businessprice - flight.price) : 199;

  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Upgrade seat</h2>
      <p className={styles.description}>
        Upgrade your seat for only ${upgradeCost}, and enjoy 45 percent more leg room, and seats that recline 40 percent more than economy.
      </p>
      <div className={styles.buttonContainer}>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={() => onUpgrade(upgradeCost)} className={styles.upgradeButton}>
          Upgrade for ${upgradeCost}
        </button>
      </div>
    </div>
  );
};



const mockseatsData = [
  // 4 rows with 4 seats each
  [
    { available: false },
    { available: true, class: 'business' },
    { available: false },
    { available: true, class: 'business' }
  ],
  [
    { available: true, class: 'business' },
    { available: false },
    { available: true, class: 'business' },
    { available: false }
  ],
  [
    { available: true, class: 'business' },
    { available: true, class: 'business' },
    { available: true, class: 'business' },
    { available: true, class: 'business' }
  ],
  [
    { available: true, class: 'business' },
    { available: true, class: 'business' },
    { available: false },
    { available: true, class: 'business' }
  ],
  // 5 rows with 6 seats each
  [
    { available: true, class: 'economy' },
    { available: false },
    { available: true, class: 'economy' },
    { available: false },
    { available: true, class: 'economy' },
    { available: true, class: 'economy' }
  ],
  [
    { available: true, class: 'economy' },
    { available: true, class: 'economy' },
    { available: false },
    { available: false },
    { available: false },
    { available: false }
  ],
  [
    { available: false },
    { available: false },
    { available: true, class: 'economy' },
    { available: true, class: 'economy' },
    { available: false },
    { available: true, class: 'economy' }
  ],
  [
    { available: true, class: 'economy' },
    { available: true, class: 'economy' },
    { available: false },
    { available: true, class: 'economy' },
    { available: true, class: 'economy' },
    { available: true, class: 'economy' }
  ],
  [
    { available: true, class: 'economy' },
    { available: true, class: 'economy' },
    { available: false },
    { available: true, class: 'economy' },
    { available: true, class: 'economy' },
    { available: true, class: 'economy' }
  ]
];

const mockseatsData2 = [
  // 4 rows with 4 seats each
  [
    { available: false },
    { available: true, class: 'business' },
    { available: false },
    { available: true, class: 'business' }
  ],
  [
    { available: true, class: 'business' },
    { available: false },
    { available: true, class: 'business' },
    { available: false }
  ],
  [
    { available: true, class: 'business' },
    { available: true, class: 'business' },
    { available: true, class: 'business' },
    { available: true, class: 'business' }
  ],
  [
    { available: true, class: 'business' },
    { available: true, class: 'business' },
    { available: false },
    { available: true, class: 'business' }
  ],
  // 5 rows with 6 seats each
  [
    { available: true, class: 'economy' },
    { available: false },
    { available: true, class: 'economy' },
    { available: false },
    { available: true, class: 'economy' },
    { available: true, class: 'economy' }
  ],
  [
    { available: true, class: 'economy' },
    { available: true, class: 'economy' },
    { available: false },
    { available: false },
    { available: false },
    { available: false }
  ],
  [
    { available: true, class: 'economy' },
    { available: true, class: 'economy' },
    { available: false },
    { available: true, class: 'economy' },
    { available: true, class: 'economy' },
    { available: true, class: 'economy' }
  ]
];

const mockdividerLocations = [4, 8, 18];

