'use client'
import { createContext, useContext } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

const initialState = {
    adultCount: 1,
    minorCount: 0,
    cartItems: [],
    passengersInfo: [],
    paymentData: {},
    // SeatsInfo: [],
    passengerDoneCount: () => {},
    // SeatsDoneCount: () => {},
    updateCart: () => {},
    updatePassengersInfo: () => {},
    // updatePassengerInfoSeats: () => {},
    updatePaymentData: () => {},
    updateAdultsAndMinors: () => {},

    // updateSeatsInfo: () => {},

    passengerTotal: () => {},

    flightSeats: [],
    updateflightSeats: () => {}, 
    resetFlightSeats: () => {},
}

const CartContext = createContext(initialState)

export const useCart = () => useContext(CartContext)

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useLocalStorage('cartItems', [])
    const [passengersInfo, setPassengersInfo] = useLocalStorage('passengersInfo', [])
    const [paymentData, setPaymentData] = useLocalStorage('paymentData', {})
    const [adultCount, setAdultCount] = useLocalStorage('adultCount', 1)
    const [minorCount, setMinorCount] = useLocalStorage('minorCount', 0)
    const [SeatsInfo, setSeatsInfo] = useLocalStorage('SeatsInfo', [])
    const [flightSeats, setFlightSeats] = useLocalStorage('flightSeats', [])

    const updateCart = (items, keepExisting = false) => {
        setCartItems(keepExisting ? [...cartItems, ...items] : items)
    }

    const updatePassengersInfo = (data, keepExisting = false) => {
        setPassengersInfo(keepExisting 
            ? [...passengersInfo, ...(Array.isArray(data) ? data : [data])]
            : (Array.isArray(data) ? data : [data]))
    }

    // const updatePassengerInfoSeats = (data, keepExisting = false) => {
    //     if(keepExisting) setSeatsInfo([...SeatsInfo, ...(Array.isArray(data) ? data : [data])])
    //     else setSeatsInfo((Array.isArray(data) ? data : [data]))
    // }

    const updatePaymentData = (data, keepExisting = false) => {
        setPaymentData(keepExisting
            ? { ...paymentData, ...(Array.isArray(data) ? data[0] : data) }
            : (Array.isArray(data) ? data[0] : data))
    }

    const updateAdultsAndMinors = (adults, minors) => {
        setAdultCount(adults)
        setMinorCount(minors)
    }

    // const updateSeatsInfo = (data, keepExisting = false) => {
    //     setSeatsInfo(keepExisting
    //         ? [...SeatsInfo, ...(Array.isArray(data) ? data : [data])]
    //         : (Array.isArray(data) ? data : [data]))
    // }

    const passengerDoneCount = () => passengersInfo.length

    // const SeatsDoneCount = () => SeatsInfo.length

    const passengerTotal = () => Number(adultCount) + Number(minorCount)

    const updateFlightSeats = (flightIndex, passengerIndex, seatData) => {
        setFlightSeats(prevFlightSeats => {
            const newFlightSeats = [...prevFlightSeats]
            if (!newFlightSeats[flightIndex]) {
            newFlightSeats[flightIndex] = []
            }
            newFlightSeats[flightIndex][passengerIndex] = seatData
            return newFlightSeats
        })
    }

    const resetFlightSeats = () => {
        setFlightSeats([])
    }

    const value = {
        cartItems,
        passengersInfo,
        paymentData,
        adultCount,
        minorCount,
        // SeatsInfo,
        updateCart,
        updatePassengersInfo,
        // updatePassengerInfoSeats,
        updatePaymentData,
        updateAdultsAndMinors,
        // updateSeatsInfo,
        passengerDoneCount,
        // SeatsDoneCount,
        passengerTotal,
        flightSeats,
        updateFlightSeats,
        resetFlightSeats,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}