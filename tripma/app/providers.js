'use client';
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Banner from "@/components/banner";
import SignupOverlay from "@/components/SignupOverlay";
import CartProvider from './CartProvider';
import Footer from '@/components/footer';

export default function Provider ({ children, session }) {
    const pathname = usePathname();
    const [showSignup, setShowSignup] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);

    const toggleSignup = (signIn) => {
        setIsSignIn(signIn);
        setShowSignup(!showSignup);
    };

    // Add the routes where you want to disable the Navbar
    const routesWithoutNavbar = []//['/booking/seats', 'booking/pickSeats'];
    // Check if the current route should have the Navbar
    const showNavbar = !routesWithoutNavbar.includes(pathname);
   
    return (
        <SessionProvider session={session}>
            <CartProvider>
            {showNavbar && <Banner />}
            {showNavbar && <Navbar onSignupClick={() => toggleSignup(false)} onSignInClick={() => toggleSignup(true)} />}
            
                {children}
            
            {showSignup && <SignupOverlay onClose={() => setShowSignup(false)} isSignIn={isSignIn} />}
            {showNavbar && <Footer/>}
            </CartProvider>
        </SessionProvider>
    )
}