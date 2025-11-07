// pages/_app.js (обновленный)

import '@/styles/globals.css';
import { Inter } from 'next/font/google'; 
import { UserDataProvider } from '../components/UserDataContext'; // <-- ИМПОРТ ПРОВАЙДЕРА

// ... (Ваш код конфигурации шрифта) ...

const inter = Inter({
  subsets: ['latin', 'cyrillic'], 
  variable: '--font-inter',
});


export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} font-sans`}>
      {/* 💡 Оборачиваем все страницы в провайдер данных */}
      <UserDataProvider> 
        <Component {...pageProps} />
      </UserDataProvider>
    </div>
  );
}
