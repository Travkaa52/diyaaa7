import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Ця сторінка буде доступна за адресою http://localhost:3000/documents
export default function DocumentsPage() {
  return (
    <>
      {/* Налаштування тегів <head> для цієї сторінки.
        Це важливо для заголовка та іконок, які мають бути у папці public. 
      */}
      <Head>
        <title>Документи | Дія</title>
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </Head>

      {/* Код із <body>, конвертований у JSX. 
        'class' -> 'className', SVG-атрибути -> camelCase.
        Теги <a> у навігації замінені на компонент <Link> з Next.js.
        Шляхи в <Link> виправлені: /mollydiya/home -> /home
      */}
      <main className="min-h-screen bg-gradient-to-b from-[#7AC7C0] via-[#B8D7EA] to-[#C5B6E0] pb-16">
        <div className="p-6 pt-24">
          <div className="flex flex-col items-center">
            {/* Тут був компонент, який Next.js використовує для динаміки,
              тому ми залишаємо його структуру статичною для відображення HTML.
            */}
            <div className="relative w-full h-[70vh] overflow-hidden">
              <div className="absolute w-full h-full" style={{ zIndex: 1, opacity: 1, transform: 'none' }}>
                <div className="w-full aspect-[3/4] max-w-sm mx-auto perspective">
                  <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="absolute w-full h-full backface-hidden" style={{ opacity: 1 }}>
                      <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-[2px] p-6 flex flex-col relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#43A047]/10 via-transparent to-transparent pointer-events-none"></div>
                        <div className="flex flex-col mb-6">
                          <h2 className="text-[22px] font-medium text-black">єДокумент</h2>
                        </div>
                        <div className="w-full h-full bg-gray-200/50 rounded-2xl flex items-center justify-center">
                          <p className="text-gray-500">Дані не завантажено</p>
                        </div>
                      </div>
                    </div>
                    {/* Задня сторона документа */}
                    <div className="absolute w-full h-full backface-hidden rounded-3xl" style={{ transform: 'rotateY(180deg)', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <div className="w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center gap-6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <div className="w-2 h-2 rounded-full transition-colors duration-300 bg-white"></div>
              <div className="w-2 h-2 rounded-full transition-colors duration-300 bg-white/30"></div>
              <div className="w-2 h-2 rounded-full transition-colors duration-300 bg-white/30"></div>
              <div className="w-2 h-2 rounded-full transition-colors duration-300 bg-white/30"></div>
            </div>
          </div>
        </div>

        {/* Навігаційна панель */}
        <nav className="fixed bottom-0 left-0 right-0">
          <div className="flex justify-around items-center bg-black text-white h-[80px] pb-[20px] text-[10px]">
            {/* Link 1: Стрічка */}
            <Link className="flex flex-col items-center gap-1 w-1/4" href="/home">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-left text-white">
                <path d="M15 12H3"></path>
                <path d="M17 18H3"></path>
                <path d="M21 6H3"></path>
              </svg>
              <span>Стрічка</span>
            </Link>

            {/* Link 2: Документи (Активна сторінка) */}
            <Link className="flex flex-col items-center gap-1 w-1/4" href="/documents">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-white">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-white">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
              </svg>
              <span>Сервіси</span>
            </Link>

            {/* Link 4: Меню */}
            <Link className="flex flex-col items-center gap-1 w-1/4" href="/menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-white">
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