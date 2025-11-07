import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// --- Placeholder for useUserData ---
// Заглушка для отримання даних користувача. Замініть на ваш реальний імпорт та логіку.
const useUserData = () => ({
    userData: {
        name: "Михайло",
        surname: "Касьян",
        photoUrl: "/user-avatar.png", // Замініть на реальний шлях
    }
});

// --- Reusable Menu Item Component ---
// Компонент, який відповідає за стиль та перехід кожного пункту меню.
const MenuItem = ({ icon, title, description, href, isActive = false }) => (
  <Link 
    href={href} 
    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
      isActive ? 'bg-white/90 shadow-md' : 'bg-white/50 hover:bg-white/70'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-full ${isActive ? 'bg-[#5B6D7A]' : 'bg-gray-700'} text-white`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className={`text-base font-medium ${isActive ? 'text-gray-900' : 'text-gray-800'}`}>
          {title}
        </span>
        {description && (
          <span className="text-xs text-gray-500">{description}</span>
        )}
      </div>
    </div>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-gray-400"
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  </Link>
);


// --- User Profile Card Component ---
const UserCard = ({ userData }) => (
    <div className="flex items-center gap-4 p-4 bg-white/70 rounded-2xl backdrop-blur-sm shadow-lg mb-8">
        <img
            src={userData?.photoUrl || "/default-avatar.png"}
            alt="User Avatar"
            className="w-14 h-14 rounded-full object-cover border-2 border-white"
        />
        <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">
                {userData?.name} {userData?.surname}
            </span>
            <span className="text-sm text-gray-600">
                Персональні дані
            </span>
        </div>
        <Link href="/profile" className="ml-auto p-2 text-gray-700 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5l4 4L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </Link>
    </div>
);


// Ця сторінка буде доступна за адресою http://localhost:3000/menu
export default function MenuPage() {
  const { userData } = useUserData();
  
  // Список елементів меню
  const mainMenuItems = [
    { title: "Страхування", description: "ОСЦПВ", href: "/insurance", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    { title: "Авто", description: "Водійське, техпаспорт", href: "/auto", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M22 12h-4"/><path d="M6 12H2"/><path d="M12 6V2"/><path d="M12 22v-4"/></svg> },
    { title: "Послуги", description: "Податкові, штрафи", href: "/services", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v6a2 2 0 0 0 2 2h6"/></svg> },
  ];

  const secondaryMenuItems = [
    { title: "Налаштування", href: "/settings", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.22a2 2 0 0 1-1.41 1.41l-.64.64a2 2 0 0 1-2.83 0l-.64-.64a2 2 0 0 1-1.41-1.41V4a2 2 0 0 0-2-2H2v.44a2 2 0 0 1 1.41 1.41l.64.64a2 2 0 0 1 0 2.83l-.64.64A2 2 0 0 1 2 9.78v.44a2 2 0 0 0 2 2h.22a2 2 0 0 1 1.41 1.41l.64.64a2 2 0 0 1 2.83 0l.64-.64a2 2 0 0 1 1.41-1.41V12a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.22a2 2 0 0 1 1.41-1.41l.64-.64a2 2 0 0 1 2.83 0l.64.64a2 2 0 0 1 1.41 1.41V12a2 2 0 0 0 2 2h2v-.44a2 2 0 0 1-1.41-1.41l-.64-.64a2 2 0 0 1 0-2.83l.64-.64a2 2 0 0 1 1.41-1.41V4a2 2 0 0 0-2-2h-.44a2 2 0 0 1-1.41-1.41l-.64-.64A2 2 0 0 1 15.78 2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg> },
    { title: "Про Дію", href: "/about", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
    { title: "Вийти", href: "/logout", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg> },
  ];

  return (
    <>
      {/* Налаштування тегів <head> для цієї сторінки */}
      <Head>
        <title>Меню | Дія</title>
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </Head>

      {/* Основний вміст сторінки */}
      <main className="min-h-[100dvh] bg-gradient-to-b from-[#7AC7C0] via-[#B8D7EA] to-[#C5B6E0] pb-[120px] pt-14 overflow-y-auto">
        <div className="max-w-md mx-auto px-4">
            
            {/* 1. Картка користувача */}
            <UserCard userData={userData} />

            {/* 2. Основні пункти меню */}
            <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Меню</h2>
                <div className="flex flex-col gap-3">
                    {mainMenuItems.map((item, index) => (
                        <MenuItem 
                            key={index} 
                            {...item} 
                            isActive={item.href === '/services'} // Приклад активації
                        />
                    ))}
                </div>
            </section>

            {/* 3. Додаткові пункти меню */}
            <section>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Додатково</h2>
                <div className="flex flex-col gap-3">
                    {secondaryMenuItems.map((item, index) => (
                        <MenuItem 
                            key={index} 
                            {...item} 
                        />
                    ))}
                </div>
            </section>
        </div>
      </main>

      {/* Фіксована нижня навігація (дублюється з documents.js) */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-black text-white h-[80px] pb-4 flex justify-around items-center text-[10px]">
        <Link
          href="/home"
          className="flex flex-col items-center gap-1 opacity-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-align-left"
          >
            <path d="M15 12H3"></path>
            <path d="M17 18H3"></path>
            <path d="M21 6H3"></path>
          </svg>
          <span>Стрічка</span>
        </Link>

        <Link href="/documents" className="flex flex-col items-center gap-1 opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-file-text"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            <path d="M10 9H8"></path>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
          </svg>
          <span>Документи</span>
        </Link>

        <Link
          href="/services"
          className="flex flex-col items-center gap-1 opacity-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-zap"
          >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
          </svg>
          <span>Сервіси</span>
        </Link>

        <Link
          href="/menu"
          className="flex flex-col items-center gap-1" // Активний стан
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Меню</span>
        </Link>
      </nav>
    </>
  );
}
