
import "./globals.css";

import Provider from '@/providers/providers';

export const metadata = {
  title: "Tripma",
  description: "Travel app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Provider>
            {children}
      </Provider>
      </body>
    </html>
  );
}