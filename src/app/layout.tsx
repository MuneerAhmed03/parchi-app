import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WebSocketProvider } from "@/context/RoomContext";
import { GameContextProvider } from "@/context/GameContext";
import HelpModal from "@/components/HelpModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const pencilFont = localFont({
  src: "/fonts/pencil.ttf",
  variable: "--font-pencil",
  weight: "100 300 500 900",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Parchi App",
  description: "A sticky notes application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`
          ${pencilFont.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <GameContextProvider>
          <WebSocketProvider>
            {children}
            
          </WebSocketProvider>
        </GameContextProvider>
      </body>
    </html>
  );
}
