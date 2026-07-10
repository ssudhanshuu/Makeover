import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Makeovers | Premium Beauty & Cosmetics Store",
  description:
    "Discover your perfect look with Makeovers. Shop premium skincare, makeup, haircare, and fragrances from top brands. Free shipping on orders over ₹999.",
  keywords: "beauty, cosmetics, skincare, makeup, haircare, fragrance, premium beauty products",
  openGraph: {
    title: "Makeovers | Premium Beauty & Cosmetics Store",
    description: "Your destination for premium beauty products.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
