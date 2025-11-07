import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Компонент, який імітує макет ID-картки
const IDCard = ({ isFlipped }) => (
  <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s' }}>
    {/* ЛИЦЕВА СТОРОНА (Front) */}
    <div
      className="absolute w-full h-full backface-hidden"
      style={{ opacity: isFlipped ? 0 : 1, transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
    >
      <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-[2px] p-6 flex flex-col relative overflow-hidden shadow-2xl">
        {/* Градієнтна рамка */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#43A047]/20 via-transparent to-transparent pointer-events-none"></div>

        {/* Заголовок документа */}
        <div className="flex flex-col mb-6">
          <h2 className="text-[22px] font-semibold text-black">Паспорт громадянина України</h2>
          <p className="text-sm text-black/80">ID-картка</p>
        </div>

        {/* Основні дані */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-black/90 flex-grow">
          <div>
            <p className="text-xs text-gray-700 uppercase">Прізвище</p>
            <p className="font-medium text-lg">КОРИСТУВАЧ</p>
          </div>
          <div>
            <p className="text-xs text-gray-700 uppercase">Ім’я</p>
            <p className="font-medium text-lg">ГЕНЕРАТИВНИЙ</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-700 uppercase">По батькові</p>
            <p className="font-medium">АНДРІЙОВИЧ</p>
          </div>
          <div>
            <p className="text-xs text-gray-700 uppercase">Дата народження</p>
            <p className="font-medium">01.01.1990</p>
          </div>
          <div>
            <p className="text-xs text-gray-700 uppercase">Стать</p>
            <p className="font-medium">Ч</p>
          </div>
          <div>
            <p className="text-xs text-gray-700 uppercase">Місце народження</p>
            <p className="font-medium">Київ, Україна</p>
          </div>
          <div>
            <p className="text-xs text-gray-700 uppercase">Номер запису</p>
            <p className="font-medium">12345678-00001</p>
          </div>
        </div>

        {/* QR-код внизу */}
        <div className="mt-4 flex justify-between items-end">
          <div className="w-16 h-16 bg-black flex items-center justify-center rounded-lg">
            {/* Символ QR-коду */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-qr-code w-6 h-6">
                <rect width="5" height="5" x="3" y="3" rx="1"></rect>
                <rect width="5" height="5" x="16" y="3" rx="1"></rect>
                <rect width="5" height="5" x="3" y="16" rx="1"></rect>
                <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
                <path d="M21 21v.01"></path>
                <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
                <path d="M3 12h.01"></path>
                <path d="M12 3h.01"></path>
                <path d="M12 16v.01"></path>
                <path d="M16 12h1"></path>
                <path d="M21 12v.01"></path>
                <path d="M12 21v-1"></path>
            </svg>
          </div>
          <p className="text-xs text-black/60">Дійсний до: 01.01.2030</p>
        </div>
      </div>
    </div>

    {/* ЗВОРОТНА СТОРОНА (Back) */}
    <div
      className="absolute w-full h-full backface-hidden rounded-3xl"
      style={{
        transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(2px)',
        transition: 'transform 0.6s'
      }}
    >
      <div className="w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center gap-6">
        <h3 className="text-xl font-medium text-black/80">Оборотна сторона</h3>
        <p className="text-black/60 text-center">Тут може бути додаткова інформація про реєстрацію або водійські права.</p>
      </div>
    </div>
  </div>
);

export default function DocumentsPage() {
  const [activeIndex, setActiveIndex] = useState(0); // Імітує перемикання між документами
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter(); // Використовується для коректного роутингу в Next.js

  const documents = [
    { title: 'Паспорт', Component: IDCard },
    // Тут можуть бути інші документи
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#7AC7C0] via-[#B8D7EA] to-[#C5B6E0] pb-16">
      <div className="p-6 pt-24">
        <div className="flex flex-col items-center">
          {/* Слайдер / Основний контейнер документа */}
          <div
            className="relative w-full h-[70vh] overflow-hidden"
            onClick={() => setIsFlipped(!isFlipped)} // Перегортання при натисканні
          >
            <div className="absolute w-full h-full" style={{ zIndex: 1, opacity: 1, transform: 'none' }}>
              <div className="w-full aspect-[3/4] max-w-sm mx-auto perspective">
                <IDCard isFlipped={isFlipped} />
              </div>
            </div>
          </div>

          {/* Індикатор слайдера */}
          <div className="flex gap-2 mt-6">
            {documents.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-white' : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Нижня навігація (Footer) */}
      <nav className="fixed bottom-0 left-0 right-0">
        <div className="flex justify-around items-center bg-black text-white h-[80px] pb-[20px] text-[10px]">
          <Link href="/home" className="flex flex-col items-center gap-1 w-1/4">
            {/* SVG для Стрічка */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-left text-white"><path d="M15 12H3"></path><path d="M17 18H3"></path><path d="M21 6H3"></path></svg>
            <span>Стрічка</span>
          </Link>
          <Link href="/documents" className="flex flex-col items-center gap-1 w-1/4">
            {/* SVG для Документи (Активний) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-white"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
            <span>Документи</span>
          </Link>
          <Link href="/services" className="flex flex-col items-center gap-1 w-1/4">
            {/* SVG для Сервіси */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-white"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
            <span>Сервіси</span>
          </Link>
          <Link href="/menu" className="flex flex-col items-center gap-1 w-1/4">
            {/* SVG для Меню */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Меню</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
