// pages/_app.js

import '../styles/globals.css'; 
import localFont from 'next/font/local';
import { UserDataProvider } from '../components/UserDataContext';
import React from 'react';

// 1. КОНФИГУРАЦИЯ ЛОКАЛЬНЫХ ШРИФТОВ e-Ukraine

// a) Основной шрифт (Regular) для body, используется как font-sans
const bodyFont = localFont({
  src: [
    {
      path: '../public/fonts/e-Ukraine-Regular.woff', 
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-body', // CSS-переменная для основного текста
});

// b) Шрифт для заголовков (Medium/SemiBold), используется как font-head
const headFont = localFont({
  src: [
    {
      path: '../public/fonts/e-UkraineHead-Medium.woff', 
      weight: '500', 
      style: 'normal',
    },
  ],
  variable: '--font-head', // CSS-переменная для заголовков
});


export default function App({ Component, pageProps }) {
  // 2. ГЛОБАЛЬНОЕ ПРИМЕНЕНИЕ
  // Применяем обе переменные шрифтов к корневому div, а font-sans будет использовать --font-body.
  return (
    <div className={`${bodyFont.variable} ${headFont.variable} font-sans`}>
      <UserDataProvider>
        <Component {...pageProps} />
      </UserDataProvider>
    </div>
  );
}
