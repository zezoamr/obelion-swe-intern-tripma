'use client';
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "@/layoutComponents/navbar";
import Banner from "@/layoutComponents/banner";
import Footer from '@/layoutComponents/footer';

import CartProvider from './CartProvider';

import SignupOverlay from "@/layoutComponents/SignupOverlay";

export default function Provider ({ children, session }) {
    const pathname = usePathname();
    const [showSignup, setShowSignup] = useState(false);
    const [showBanner, setShowBanner] = useState(true);
    const [isSignIn, setIsSignIn] = useState(false);

    const toggleSignup = (signIn) => {
        setIsSignIn(signIn);
        setShowSignup(!showSignup);
    };

    const CloseBanner = () => {
        setShowBanner(false);
    }
    // Add the routes where you want to disable the Navbar
    const routesWithoutNavbar = ['/booking/seats',]//[ 'booking/pickSeats'];
    // Check if the current route should have the Navbar
    const showNavbar = !routesWithoutNavbar.includes(pathname);
   
    return (
        <SessionProvider session={session}>
            <CartProvider>
            {showNavbar && showBanner && <Banner CloseBanner={CloseBanner} />}
            {showNavbar && <Navbar onSignupClick={() => toggleSignup(false)} onSignInClick={() => toggleSignup(true)} />}
            
                {children}
            
            {showSignup && <SignupOverlay onClose={() => setShowSignup(false)} isSignIn={isSignIn} />}
            {showNavbar && <Footer/>}
            </CartProvider>
        </SessionProvider>
    )
}