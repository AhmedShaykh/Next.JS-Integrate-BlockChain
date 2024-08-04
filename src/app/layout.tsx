import Web3ModalProvider from "@/Components/Provider";
import WalletGuard from "@/Components/WalletGuard";
import Navbar from "@/Components/Navbar";
import { config } from "@/config";
import { ThemeProvider } from "next-themes";
import { cookieToInitialState } from "wagmi";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.JS Integrate BlockChain",
  description: "Next.JS Integrate BlockChain (Smart Contract)"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Web3ModalProvider
            initialState={initialState}
          >
            <WalletGuard>
              <Navbar />
              {children}
            </WalletGuard>
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
};