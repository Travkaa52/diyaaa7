import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Ця сторінка буде доступна за адресою http://localhost:3000/nezlamnist
export default function NezlamnistPage() {
  return (
    <>
      {/* Налаштування тегів <head> для цієї сторінки */}
      <Head>
        <title>Незламність | Дія</title>
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </Head>

      {/* Основний вміст сторінки (конвертований <body>) */}
      <main className="min-h-[100dvh] max-h-[100dvh] bg-gradient-to-b from-[#7AC7C0] via-[#B8D7EA] to-[#C5B6E0] pb-[120px] pt-14 overflow-y-auto">
        <div className="px-5 flex flex-col gap-6">
          {/* Заголовок та кнопка оновлення локації */}
          <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-bold">Незламність</h1>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground rounded-full w-10 h-10 bg-white">
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
                className="lucide lucide-navigation h-5 w-5"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
            </button>
          </div>

          {/* Блок карти (Placeholder) */}
          <div className="w-full aspect-square rounded-3xl bg-white/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
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
                className="lucide lucide-map-pin w-12 h-12 text-black"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </div>

          {/* Найближчі точки */}
          <div className="space-y-4">
            <h2 className="text-2xl font-medium">Найближчі точки</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-[32px] divide-y divide-gray-200">
              
              {/* Пункт незламності 1 */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Пункт незламності</h3>
                    <p className="text-gray-600">вул. Хрещатик, 36</p>
                  </div>
                </div>
              </div>

              {/* Укриття */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-3 h-3 bg-black rounded-sm rotate-45"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Укриття</h3>
                    <p className="text-gray-600">вул. Володимирська, 15</p>
                  </div>
                </div>
              </div>

              {/* Пункт незламності 2 */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Пункт незламності</h3>
                    <p className="text-gray-600">вул. Грушевського, 12/2</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Навігаційна панель */}
        <nav className="fixed bottom-0 left-0 right-0">
          <div className="flex justify-around items-center bg-black text-white h-[80px] pb-[20px] text-[10px]">
            {/* Link 1: Стрічка */}
            <Link className="flex flex-col items-center gap-1 w-1/4" href="/home">
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
                className="lucide lucide-align-left text-white"
              >
                <path d="M15 12H3"></path>
                <path d="M17 18H3"></path>
                <path d="M21 6H3"></path>
              </svg>
              <span>Стрічка</span>
            </Link>

            {/* Link 2: Документи */}
            <Link className="flex flex-col items-center gap-1 w-1/4" href="/documents">
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
                className="lucide lucide-file-text text-white"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              <span>Документи</span>
            </Link>

            {/* Link 3: Сервіси */}
            <Link className="flex flex-col items-center gap-1 w-1/4" href="/services">
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
                className="lucide lucide-zap text-white"
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
              </svg>
              <span>Сервіси</span>
            </Link>

            {/* Link 4: Меню */}
            <Link className="flex flex-col items-center gap-1 w-1/4" href="/menu">
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
                className="lucide lucide-user text-white"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Меню</span>
            </Link>
          </div>
        </nav>
      </main>
    </>
  );
}