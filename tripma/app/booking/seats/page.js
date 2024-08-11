"use client";

import { useState } from 'react';

import styles from './page.module.css';

import Airplane from '@/components/airplane';
import SeatSelector from '@/components/seat-selector';

const seatsData = [
    // 4 rows with 4 seats each
    [
      { available: true, class: 'business' },
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
      { available: true, class: 'economy' },
      { available: true, class: 'economy' },
      { available: true, class: 'economy' },
      { available: true, class: 'economy' }
    ],
    [
      { available: true, class: 'economy' },
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
      { available: true, class: 'economy' },
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
    ],
    [
      { available: true, class: 'economy' },
      { available: true, class: 'economy' },
      { available: true, class: 'economy' },
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
    ],
    [
      { available: true, class: 'economy' },
      { available: true, class: 'economy' },
      { available: true, class: 'economy' },
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
      { available: true, class: 'economy' },
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
      { available: true, class: 'economy' },
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
      { available: true, class: 'economy' },
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
    ],
    [
      { available: true, class: 'economy' },
      { available: true, class: 'economy' },
      { available: false },
      { available: true, class: 'economy' },
      { available: true, class: 'economy' },
      { available: true, class: 'economy' }
    ],
  ];

  const dividerLocations = [4, 8, 18]

export default function FlightSeatsDetails() {

  const [showOverlay, setShowOverlay] = useState(false);
  const toggleOverlay = () => setShowOverlay((prev) => !prev);

  const handleUpgrade = () => {
    // Handle the upgrade seat process
    //check if there is available business seat 
    // todo  add 'and already picked seat is economy'
    if ((seatsData.flat().some((seat) => seat.available && seat.class === 'business') ) ) {
      //if yes, upgrade
      console.log('Upgrade seat');
    } else {
        //if not, skip
        console.log('no upgrade available');
    }

    // close modal 
    toggleOverlay();
    //todo then navigate to payment page if appropraite

  };

    return (
        <>
        <div className={styles.container}>
          <Airplane seatsData={seatsData} dividerLocations={dividerLocations} />
          <SeatSelector toggleOverlay={toggleOverlay}/>
        </div>
        {showOverlay && <Overlay onClose={toggleOverlay} onUpgrade={handleUpgrade} />}
        </>
    );
};

function Overlay({ onClose, onUpgrade }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <UpgradeSeatModal onClose={onClose} onUpgrade={onUpgrade}/>
      </div>
    </div>
  );
}

const UpgradeSeatModal = ({ onClose, onUpgrade }) => {
  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Upgrade seat</h2>
      <p className={styles.description}>
        Upgrade your seat for only $199, and enjoy 45 percent more leg room, and seats that recline 40 percent more than economy.
      </p>
      <div className={styles.buttonContainer}>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={onUpgrade} className={styles.upgradeButton}>
          Upgrade for $199
        </button>
      </div>
    </div>
  );
};



// const seatsData = [
//   [true, true, true, true,],
//   [true, false, true, false, ],
//   [true, true, true, true, ],
//   [true, false, true, false,],
//   [true, true, true, true, ],
//   [false, false, false, false, false, true],
//   [true, true, true, true, true, true],
//   [true, false, true, false, true, false],
//   [true, true, true, true, true, false],
//   [true, false, true, false, true, true],
//   [true, true, true, true, true, false],
//   [false, false, false, false, false, true],
// ];

// const airplaneSections = [
//   {
//     title: 'Section A',
//     seats: [
//       [
//         { available: true, class: 'business' },
//         { available: true, class: 'economy' },
//         { available: false },
//         { available: true, class: 'economy' }
//       ],
//       [
//         { available: true, class: 'economy' },
//         { available: false },
//         { available: true, class: 'economy' },
//         { available: false }
//       ],
//       [
//         { available: true, class: 'business' },
//         { available: true, class: 'economy' },
//         { available: true, class: 'economy' },
//         { available: true, class: 'business' }
//       ],
//       [
//         { available: true, class: 'economy' },
//         { available: true, class: 'economy' },
//         { available: false },
//         { available: true, class: 'economy' }
//       ]
//     ]
//   },
//   {
//     title: 'Section B',
//     seats: [
//       [
//         { available: true, class: 'economy' },
//         { available: false },
//         { available: true, class: 'economy' },
//         { available: false },
//         { available: true, class: 'economy' },
//         { available: true, class: 'economy' }
//       ],
//       [
//         { available: true, class: 'business' },
//         { available: true, class: 'economy' },
//         { available: true, class: 'economy' },
//         { available: true, class: 'business' },
//         { available: true, class: 'economy' },
//         { available: true, class: 'economy' }
//       ],
//       [
//         { available: true, class: 'economy' },
//         { available: false },
//         { available: true, class: 'economy' },
//         { available: true, class: 'economy' },
//         { available: false },
//         { available: true, class: 'business' }
//       ],
//       [
//         { available: true, class: 'economy' },
//         { available: true, class: 'economy' },
//         { available: false },
//         { available: true, class: 'economy' },
//         { available: true, class: 'business' },
//         { available: true, class: 'economy' }
//       ],
//       [
//         { available: true, class: 'business' },
//         { available: true, class: 'economy' },
//         { available: true, class: 'economy' },
//         { available: true, class: 'business' },
//         { available: true, class: 'economy' },
//         { available: true, class: 'economy' }
//       ]
//     ]
//   }
// ];