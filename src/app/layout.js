import "./globals.css";

export const metadata = {
  title: "Ruchi Makeover | Beauty Parlor in Moradabad",
  description:
    "Professional bridal makeup, skin care, lehenga & jewelry rental in Moradabad. Book your appointment today!",
  keywords:
    "beauty parlor moradabad, bridal makeup, ruchi makeover, skin care, lehenga rental, makeup artist moradabad",
};

import BackgroundAnimations from "./components/BackgroundAnimations";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BackgroundAnimations />
        {children}
      </body>
    </html>
  );
}
