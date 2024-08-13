'use client'
import { createContext, useState, useContext, useEffect } from 'react'

const initialState = {
    adultCount: 10,
    minorCount: 0,
    cartItems: [],
    passengersInfo: [],
    paymentData: {},
    SeatsInfo: [],
    passengerDoneCount: () => {},
    SeatsDoneCount: () => {},
    updateCart: () => {},
    updatePassengersInfo: () => {},
    updatePassengerInfoSeats: () => {},
    updatePaymentData: () => {},
    updateAdultsAndMinors: () => {},
    updateSeatsInfo: () => {},
    passengerTotal: () => {},
}

const CartContext = createContext(initialState)

export const useCart = () => useContext(CartContext)

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [passengersInfo, setPassengersInfo] = useState([])
    const [paymentData, setPaymentData] = useState({})
    const [adultCount, setAdultCount] = useState(1)
    const [minorCount, setMinorCount] = useState(0)
    const [SeatsInfo, setSeatsInfo] = useState([])


    useEffect(() => {
        try {
          // Initialize state from localStorage
            const storedCartItems = localStorage.getItem('cartItems');
            const storedPassengersInfo = localStorage.getItem('passengersInfo');
            const storedPaymentData = localStorage.getItem('paymentData');
            const storedAdultCount = localStorage.getItem('adultCount');
            const storedMinorCount = localStorage.getItem('minorCount');
            const storedSeatsInfo = localStorage.getItem('SeatsInfo');
        
            if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
            if (storedPassengersInfo) setPassengersInfo(JSON.parse(storedPassengersInfo));
            if (storedPaymentData) setPaymentData(JSON.parse(storedPaymentData));
            if (storedAdultCount) setAdultCount(parseInt(storedAdultCount));
            if (storedMinorCount) setMinorCount(parseInt(storedMinorCount));
            if (storedSeatsInfo) setSeatsInfo(JSON.parse(storedSeatsInfo));
        } catch (error) {
            console.error('Error initializing state from localStorage:', error);
        }
      }, []);

    useEffect(() => {
        // Update localStorage when state changes
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        localStorage.setItem('passengersInfo', JSON.stringify(passengersInfo))
        localStorage.setItem('paymentData', JSON.stringify(paymentData))
        localStorage.setItem('adultCount', adultCount.toString())
        localStorage.setItem('minorCount', minorCount.toString())
        localStorage.setItem('SeatsInfo', JSON.stringify(SeatsInfo))
    }, [cartItems, passengersInfo, paymentData, adultCount, minorCount, SeatsInfo])

    const updateCart = (items, keepExisting = false) => {
        if (keepExisting) {
            setCartItems((prevItems) => [...prevItems, ...items])
        } else {
            setCartItems(items)
        }
    }

    const updatePassengersInfo = (data, keepExisting = false) => {
        if (keepExisting) {
            setPassengersInfo((prevData) => [...prevData, ...(Array.isArray(data) ? data : [data])])
        } else {
            setPassengersInfo(Array.isArray(data) ? data : [data])
        }
    }

    const updatePassengerInfoSeats = (data) => {
        setSeatsInfo((prevData) => [...prevData, ...(Array.isArray(data) ? data : [data])])
    }

    const updatePaymentData = (data, keepExisting = false) => {
        if (keepExisting) {
            setPaymentData((prevData) => ({ ...prevData, ...(Array.isArray(data) ? data[0] : data) }))
        } else {
            setPaymentData(Array.isArray(data) ? data[0] : data)
        }
    }

    const updateAdultsAndMinors = (adults, minors) => {
        setAdultCount(adults)
        setMinorCount(minors)
    }

    const updateSeatsInfo = (data, keepExisting = false) => {
        if (keepExisting) {
            setSeatsInfo((prevData) => [...prevData, ...(Array.isArray(data) ? data : [data])])
        } else {
            setSeatsInfo(Array.isArray(data) ? data : [data])
        }
    }

    const passengerDoneCount = () => {
        return passengersInfo.length
    }

    const SeatsDoneCount = () => {
        return SeatsInfo.length
    }

    const passengerTotal = () => {
        return Number(adultCount) + Number(minorCount)
    }

    const value = {
        cartItems,
        passengersInfo,
        paymentData,
        adultCount,
        minorCount,
        SeatsInfo,
        updateCart,
        updatePassengersInfo,
        updatePassengerInfoSeats,
        updatePaymentData,
        updateAdultsAndMinors,
        updateSeatsInfo,
        passengerDoneCount,
        SeatsDoneCount,
        passengerTotal
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
