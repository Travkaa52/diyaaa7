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
        // Устанавливаем перспективу для 3D эффекта
        transformStyle: 'preserve-3d', 
        transition: 'transform 0.6s',
        transform: isFlipped ? 'rotateY(180deg)' : 'none',
    };

    // Предполагаемые данные для обратной стороны (для демонстрации)
    const backData = {
        issueDate: userData.issueDate || '10.05.2023',
        issuingAuthority: userData.issuingAuthority || '2310',
        rnokpp: userData.rnokpp || '3500123456',
        birthPlace: userData.birthPlace || 'КИЇВ, УКРАЇНА',
        mrz: 'IDUKR' + userData.surname.toUpperCase() + '<<' + userData.name.toUpperCase() + '<<<<<<<<<<', // Пример МЗЗ
    };
    
    return (
        <div className="relative w-full h-full" style={transformStyle}>
          
          {/* ЛИЦЕВА СТОРОНА (Front) */}
          <div
            className="absolute w-full h-full backface-hidden"
            // Чтобы лицевая сторона исчезала при перевороте
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

                {/* 5. Стать */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Стать</p>
                  <p className="font-medium text-gray-900">{userData.gender === 'M' ? 'Чоловіча' : 'Жіноча'}</p> 
                </div>

                {/* 6. Громадянство (на всю ширину) */}
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Громадянство</p>
                  <p className="font-medium text-gray-900">Україна</p> 
                </div>
                
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
                    {/* Используем статичное значение, как и было */}
                    <p className="font-medium text-sm text-gray-900">01.01.2030</p> 
                </div>
              </div>
            </div>
          </div>

          {/* ЗВОРОТНА СТОРОНА (Back) */}
          {/* Смещаем на 180 градусов, чтобы она отображалась сзади */}
          <div
            className="absolute w-full h-full backface-hidden"
            style={{ 
                transform: 'rotateY(180deg)', 
                opacity: isFlipped ? 1 : 0 
            }}
          >
            <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-[3px] p-6 flex flex-col relative overflow-hidden shadow-2xl border border-white/20">
                
                {/* Верхняя часть с градиентом-рамкой */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1C8A8C]/20 via-transparent to-transparent pointer-events-none opacity-50"></div>

                {/* Основные данные обратной стороны (СЕТКА) */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-black flex-grow pt-4">
                    
                    {/* 1. Номер запису в реєстрі */}
                    <div className="col-span-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Номер запису в реєстрі</p>
                        <p className="font-medium text-gray-900">{userData.recordNumber || '000000000'}</p> 
                    </div>

                    {/* 2. Дата видачі */}
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Дата видачі</p>
                        <p className="font-medium text-gray-900">{backData.issueDate}</p> 
                    </div>

                    {/* 3. Орган, що видав */}
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Орган, що видав</p>
                        <p className="font-medium text-gray-900">{backData.issuingAuthority}</p> 
                    </div>

                    {/* 4. РНОКПП (податковий номер) */}
                    <div className="col-span-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">РНОКПП</p>
                        <p className="font-medium text-gray-900 text-lg tracking-widest">{backData.rnokpp}</p> 
                    </div>
                    
                    {/* 5. Місце народження */}
                    <div className="col-span-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Місце народження</p>
                        <p className="font-medium text-gray-900">{backData.birthPlace}</p> 
                    </div>
                    
                    {/* 6. Номер документа (внизу) */}
                    <div className="col-span-2 mt-auto">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Номер документа</p>
                        <p className="font-semibold text-xl text-[#1C8A8C] tracking-widest">{userData.documentNumber || '000000000'}</p>
                    </div>

                </div>

                {/* Машиносчитувана зона (МЗЗ) в самом низу */}
                <div className="mt-4 bg-gray-900/90 text-white p-2 rounded-lg text-[10px] font-mono overflow-hidden whitespace-nowrap">
                    {/* Пример стандартной МЗЗ для ID-картки */}
                    <p className="tracking-widest truncate">{backData.mrz}</p>
                    <p className="tracking-widest truncate">9901017M2701017UKR<<<<<<<<<<<</p>
                </div>
            </div>
          </div>
        </div>
      );
};

export default function DocumentsPage() {
    const [isFlipped, setIsFlipped] = useState(false);
    
    // 💡 Примечание: Убедитесь, что `UserDataContext` предоставляет все необходимые поля
    // (photoUrl, surname, name, patronymic, dob, gender, issueDate, issuingAuthority, rnokpp, birthPlace, documentNumber)
    
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#7AC7C0] via-[#B8D7EA] to-[#C5B6E0] pb-16">
            <div className="p-6 pt-24">
                <div className="flex flex-col items-center">
                    {/* Основной контейнер, который реагирует на клик для перелистывания */}
                    <div
                        className="relative w-full h-[70vh] overflow-hidden"
                        // Добавляем небольшой виброотклик при клике, если это мобильное приложение
                        onClick={() => {
                            if (window.navigator.vibrate) {
                                window.navigator.vibrate(50);
                            }
                            setIsFlipped(!isFlipped);
                        }} 
                    >
                        <div className="absolute w-full h-full" style={{ zIndex: 1, opacity: 1, transform: 'none' }}>
                            {/* Добавляем perspective для лучшего 3D-эффекта */}
                            <div className="w-full aspect-[3/4] max-w-sm mx-auto perspective [perspective:1000px]">
                                <IDCard isFlipped={isFlipped} />
                            </div>
                        </div>
                    </div>

                    {/* Индикатор слайдера (для UX) */}
                    <div className="mt-4 flex gap-2">
                        <div className={`w-8 h-1 rounded-full ${!isFlipped ? 'bg-gray-800' : 'bg-gray-400'}`}></div>
                        <div className={`w-8 h-1 rounded-full ${isFlipped ? 'bg-gray-800' : 'bg-gray-400'}`}></div>
                    </div>

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

