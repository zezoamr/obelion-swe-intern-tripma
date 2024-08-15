'use client'
import { createContext, useContext } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

const initialState = {
    adultCount: 1,
    minorCount: 0,
    cartItems: [],
    passengersInfo: [],
    paymentData: {},
    passengerDoneCount: () => {},
    updateCart: () => {},
    updatePassengersInfo: () => {},
    updatePaymentData: () => {},
    updateAdultsAndMinors: () => {},
    passengerTotal: () => {},
    flightSeats: [],
    PaymentResponse: {},
    updateflightSeats: () => {}, 
    resetFlightSeats: () => {},
    clearRequestData : () => {},
    clearEverything : () => {},
}

const CartContext = createContext(initialState)

export const useCart = () => useContext(CartContext)

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useLocalStorage('cartItems', [])
    const [passengersInfo, setPassengersInfo] = useLocalStorage('passengersInfo', [])
    const [paymentData, setPaymentData] = useLocalStorage('paymentData', {})
    const [adultCount, setAdultCount] = useLocalStorage('adultCount', 1)
    const [minorCount, setMinorCount] = useLocalStorage('minorCount', 0)
    const [flightSeats, setFlightSeats] = useLocalStorage('flightSeats', [])
    const [PaymentResponse, setPaymentResponse] = useLocalStorage('PaymentResponse', {})

    const updateCart = (items, keepExisting = false) => {
        setCartItems(keepExisting ? [...cartItems, ...items] : items)
    }

    const updatePassengersInfo = (data, keepExisting = false) => {
        setPassengersInfo(keepExisting 
            ? [...passengersInfo, ...(Array.isArray(data) ? data : [data])]
            : (Array.isArray(data) ? data : [data]))
    }

    const updatePaymentData = (data, keepExisting = false) => {
        setPaymentData(keepExisting
            ? { ...paymentData, ...(Array.isArray(data) ? data[0] : data) }
            : (Array.isArray(data) ? data[0] : data))
    }

    const updateAdultsAndMinors = (adults, minors) => {
        setAdultCount(adults)
        setMinorCount(minors)
    }

    const passengerDoneCount = () => passengersInfo.length

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

    const clearRequestData = () => {
        setCartItems([])
        setPassengersInfo([])
        setPaymentData({})
        setAdultCount(1)
        setMinorCount(0)
        setFlightSeats([])
    }

    const clearEverything = () => {
        setCartItems([])
        setPassengersInfo([])
        setPaymentData({})
        setAdultCount(1)
        setMinorCount(0)
        setFlightSeats([])
        PaymentResponse({})
    }
    

    const value = {
        cartItems,
        passengersInfo,
        paymentData,
        adultCount,
        minorCount,
        updateCart,
        updatePassengersInfo,
        updatePaymentData,
        updateAdultsAndMinors,
        passengerDoneCount,
        passengerTotal,
        flightSeats,
        updateFlightSeats,
        resetFlightSeats,
        clearRequestData,
        clearEverything,
        PaymentResponse,
        setPaymentResponse
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}