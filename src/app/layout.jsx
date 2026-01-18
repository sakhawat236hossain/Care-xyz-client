// src/app/layout.jsx
import React from "react";
// import "../globals.css"; 

import AuthProvider from "@/providers/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}