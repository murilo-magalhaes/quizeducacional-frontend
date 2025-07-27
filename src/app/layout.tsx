'use client';

import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
import './globals.css';
import React from 'react';
import AppToastContext from '@/context/AppToastContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-container">
          <AppToastContext>
            <h1 className="title">Quiz Educacional</h1>
            {children}
          </AppToastContext>
        </div>
      </body>
    </html>
  );
}
