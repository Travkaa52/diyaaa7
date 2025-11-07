// pages/documents.js (Обновленный)

import React, { useState } from 'react';
import Link from 'next/link';
// 💡 Импортируем хук для получения данных
import { useUserData } from '../components/UserDataContext'; 
import { useRouter } from 'next/router';

// Компонент, имитирующий макет ID-карты
const IDCard = ({ isFlipped }) => {
    // 💡 Получаем актуальные данные из контекста
    const { userData } = useUserData(); 

    const transformStyle = {
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
        transform: isFlipped ? 'rotateY(180deg)' : 'none',
    };
    
    return (
        <div className="relative w-full h-full" style={transformStyle}>
          
          {/* ЛИЦЕВА СТОРОНА (Front) */}
          <div
            className="absolute w-full h-full backface-hidden"
            style={{ opacity: isFlipped ? 0 : 1 }}
          >
            <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-[3px] p-6 flex flex-col relative overflow-hidden shadow-2xl border border-white/20">
              
              {/* Верхняя часть с градиентом-рамкой */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C8A8C]/20 via-transparent to-transparent pointer-events-none opacity-50"></div>

              {/* Тип документа */}
              <div className="flex flex-col mb-6">
                <h2 className="text-[22px] font-semibold text-gray-900">Паспорт громадянина України</h2>
                <p className="text-sm text-gray-700">ID-картка</p>
              </div>

              {/* Основные данные (СЕТКА) */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-black flex-grow">
                
                {/* 0. ФОТОГРАФИЯ */}
                <div className="row-span-3">
                    <img 
                        src={userData.photoUrl} // <-- ИСПОЛЬЗУЕМ ДАННЫЕ ИЗ КОНТЕКСТА
                        alt="User Photo" 
                        className="w-full h-32 object-cover rounded-lg shadow-inner mb-4" 
                    />
                </div>

                {/* 1. Прізвище */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Прізвище</p>
                  <p className="font-medium text-lg text-gray-900">{userData.surname}</p> 
                </div>
                
                {/* 2. Ім'я */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Ім’я</p>
                  <p className="font-medium text-lg text-gray-900">{userData.name}</p> 
                </div>

                {/* 3. По батькові (на всю ширину) */}
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">По батькові</p>
                  <p className="font-medium text-gray-900">{userData.patronymic}</p> 
                </div>
                
                {/* 4. Дата народження */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Дата народження</p>
                  <p className="font-medium text-gray-900">{userData.dob}</p> 
                </div>
                
                {/* ... (остальной код документа) ... */}
                
              </div>

              {/* QR-код и срок действия внизу */}
              <div className="mt-6 flex justify-between items-end">
                {/* Имитация QR-кода */}
                <div className="w-16 h-16 bg-[#212121] flex items-center justify-center rounded-lg shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#68C5E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-qr-code w-6 h-6">
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
                
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Дійсний до</p>
                    {/* Примечание: validity пока оставим статичным, если не добавлено в форму */}
                    <p className="font-medium text-sm text-gray-900">01.01.2030</p> 
                </div>
              </div>
            </div>
          </div>

          {/* ... (код для ЗВОРОТНА СТОРОНА) ... */}
          
        </div>
      );
};

export default function DocumentsPage() {
    const [isFlipped, setIsFlipped] = useState(false);
    // ... (остальной код страницы DocumentsPage без изменений) ...

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#7AC7C0] via-[#B8D7EA] to-[#C5B6E0] pb-16">
            <div className="p-6 pt-24">
                <div className="flex flex-col items-center">
                    {/* Основной контейнер, который реагирует на клик для перелистывания */}
                    <div
                        className="relative w-full h-[70vh] overflow-hidden"
                        onClick={() => setIsFlipped(!isFlipped)} 
                    >
                        <div className="absolute w-full h-full" style={{ zIndex: 1, opacity: 1, transform: 'none' }}>
                            <div className="w-full aspect-[3/4] max-w-sm mx-auto perspective">
                                <IDCard isFlipped={isFlipped} />
                            </div>
                        </div>
                    </div>

                    {/* ... (Индикатор слайдера и Нижняя навигация) ... */}

                </div>
            </div>
            {/* Нижняя навигация */}
            <nav className="fixed bottom-0 left-0 right-0 z-10">
              <div className="flex justify-around items-center bg-black text-white h-[80px] pb-[20px] text-[10px]">
                {/* Стрічка */}
                <Link href="/home" className="flex flex-col items-center gap-1 w-1/4 opacity-60">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-left text-white"><path d="M15 12H3"></path><path d="M17 18H3"></path><path d="M21 6H3"></path></svg>
                  <span>Стрічка</span>
                </Link>
                {/* Документи (Активный) */}
                <Link href="/documents" className="flex flex-col items-center gap-1 w-1/4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-white"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                  <span>Документи</span>
                </Link>
                {/* Сервіси */}
                <Link href="/services" className="flex flex-col items-center gap-1 w-1/4 opacity-60">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-white"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                  <span>Сервіси</span>
                </Link>
                {/* Меню */}
                <Link href="/menu" className="flex flex-col items-center gap-1 w-1/4 opacity-60">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span>Меню</span>
                </Link>
              </div>
            </nav>
        </main>
    );
}
