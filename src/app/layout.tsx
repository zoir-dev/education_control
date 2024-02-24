import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Education Control",
  description: "Education control admin panel",
  icons: {
    icon: {
      url: "/logo.png",
      type: "icon",
      sizes: "32x32",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </head>
      <body className="h-screen">
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
