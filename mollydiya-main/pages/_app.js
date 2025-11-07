// pages/_app.js

// 🔴 ИСПРАВЛЕНИЕ: Псевдоним '@/' (alias) не был настроен.
// Меняем импорт с '@/' на относительный '../' для корректной работы.
import '../styles/globals.css'; 

import { Inter } from 'next/font/google';
import { UserDataProvider } from '../components/UserDataContext'; // Импорт нового провайдера
import React from 'react';

// Конфигурация шрифта Inter
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});


export default function App({ Component, pageProps }) {
  return (
    // Применяем переменные шрифта Tailwind
    <div className={`${inter.variable} font-sans`}>
      {/* Оборачиваем все страницы в провайдер данных пользователя */}
      <UserDataProvider>
        <Component {...pageProps} />
      </UserDataProvider>
    </div>
  );
}
