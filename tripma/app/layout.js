"use client";

import { useState } from 'react';
import "./globals.css";
import Navbar from "@/components/navbar";
import Banner from "@/components/banner";
import SignupOverlay from "@/components/SignupOverlay";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const [showSignup, setShowSignup] = useState(false);

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <html lang="en">
      <body>
        <Banner />
        <Navbar onSignupClick={toggleSignup} />
        {children}
        {showSignup && <SignupOverlay onClose={toggleSignup} />}
        
      </body>
    </html>
  );
}