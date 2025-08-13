import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "./components/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Basin Bright Windows",
  description: "Professional window cleaning with crystal-clear results.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />

  {children}

  <footer className="mt-12 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Basin Bright Windows
  </footer>
</body>
    </html>
  );
}
