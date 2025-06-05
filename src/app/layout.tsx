import NavBar from "@/components/navBar";
import type { Metadata } from "next";
import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { UserContextProvider } from "@/app/context/userContext";

export const metadata: Metadata = {
  title: "Final Project",
  description: "Kevin Hernández, Oregon State University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <UserContextProvider>
            <NavBar />
            <main>
              {children}
            </main>
          </UserContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
