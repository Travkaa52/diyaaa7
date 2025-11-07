import React, { useEffect, useState } from "react";
import Link from "next/link";
// Видалено: import QRCode from "react-qr-code";
// Видалено: import { motion, AnimatePresence } from "framer-motion";
// Видалено: import { useSwipeable } from "react-swipeable";

// ----------------------------------------------------------------------
// МОК (ЗАГЛУШКА) ДЛЯ ЗОВНІШНІХ ЗАЛЕЖНОСТЕЙ
// ----------------------------------------------------------------------

// 1. Мок для useUserData (імітуємо дані)
const useUserData = () => ({
  userData: {
    surname: "Касьян",
    name: "Михайло",
    patronymic: "Валерійович",
    dob: "11.08.2007",
    idNumber: "013792783",
    photoUrl: "/default-avatar.png",
  }
});

// 2. Мок для QRCode (замінюємо на простий div)
const QRCodeMock = ({ value, size }) => (
  <div 
    style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      backgroundColor: '#f0f0f0', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '10px',
      borderRadius: '8px'
    }}
    className="text-xs text-center text-gray-700 break-words"
  >
    QR-код:
    <br/>
    {value.substring(0, 50)}...
  </div>
);

// 3. Мок для анімації (AnimatePresence та motion видалені, використовується звичайний div)

// 4. Мок для useSwipeable (видалено, свайпи не працюватимуть)


export default function DocumentsPage() {
  const { userData } = useUserData();
  const [updateTime, setUpdateTime] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [qrRefresh, setQrRefresh] = useState(0);
  const documents = [
    { id: 1, title: "Паспорт громадянина України", type: "passport" },
    { id: 2, title: "еДокумент", type: "edoc" },
  ];

  // час оновлення
  useEffect(() => {
    const now = new Date();
    setUpdateTime(
      now.toLocaleString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [qrRefresh]);

  // оновлення QR кожні 3 хв
  useEffect(() => {
    // Інтервал працює і без QRCode, просто оновлює час
    const interval = setInterval(() => setQrRefresh((r) => r + 1), 180000);
    return () => clearInterval(interval);
  }, []);

  // Ручна функція для свайпів (замість useSwipeable)
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % documents.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + documents.length) % documents.length);

  // Спрощені обробники touch-подій (для імітації свайпів)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50 

  const onTouchStart = (e) => {
    setTouchEnd(null) // завжди скидаємо кінцеву точку
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  }


  const doc = documents[activeIndex];
  const qrData = JSON.stringify({
    surname: userData?.surname,
    name: userData?.name,
    patronymic: userData?.patronymic,
    docType: doc.type,
    id: userData?.idNumber || "013792783",
    refresh: qrRefresh,
  });

  // Використовуємо key для примусового перерендерингу та імітації переходу
  const cardKey = `${activeIndex}-${isFlipped}`; 

  return (
    <main
      className="min-h-screen flex flex-col items-center bg-gradient-to-b 
      from-[#d7c7ff] via-[#f0eaff] to-[#fff8d7] overflow-hidden"
    >
      <div
        // Замість {...handlers}, використовуємо onTouch
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="mt-20 w-[90%] max-w-sm perspective cursor-pointer"
        onClick={() => setIsFlipped((f) => !f)}
      >
        {/* AnimatePresence та motion ВИДАЛЕНО - використовуємо звичайний div */}
        <div
          key={cardKey} 
          className="relative w-full h-[420px] transition-transform duration-600 ease-in-out" // Додаємо CSS-перехід 
          style={{ transform: `rotateY(${isFlipped ? 180 : 0}deg)`, transformStyle: 'preserve-3d' }}
        >
          
          {/* FRONT */}
          <div 
            className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden backface-hidden"
            style={{ transform: 'rotateY(0deg)', display: isFlipped ? 'none' : 'block' }} // Умовний рендеринг для фліпу
          >
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-900">
                {doc.title}
              </h2>
              <div className="flex mt-4 gap-4">
                <img
                  src={userData?.photoUrl || "/default-avatar.png"}
                  alt="User Photo"
                  className="w-24 h-28 object-cover rounded-xl border border-gray-300"
                />
                <div className="flex flex-col justify-between text-sm">
                  <p>
                    <span className="font-medium text-gray-700">
                      Дата народження:
                    </span>
                    <br />
                    {userData?.dob || "11.08.2007"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Номер:
                    </span>
                    <br />
                    {userData?.idNumber || "013792783"}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 50"
                    className="w-16 h-10 text-gray-600 mt-1"
                  >
                    <path
                      d="M10 35 Q 40 10, 70 35 T 90 35"
                      stroke="black"
                      strokeWidth="2"
                      fill="transparent"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-green-200 text-green-900 text-xs px-4 py-2 font-medium text-center">
              Документ оновлено {updateTime}
            </div>
            <div className="p-5">
              <p className="font-bold text-lg text-gray-900 leading-tight">
                {userData?.surname || "Касьян"}
                <br />
                {userData?.name || "Михайло"}
                <br />
                {userData?.patronymic || "Валерійович"}
              </p>
            </div>
          </div>
          

          {/* BACK */}
          <div 
            className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-gray-200 flex flex-col items-center justify-center backface-hidden"
            style={{ transform: 'rotateY(180deg)', display: isFlipped ? 'flex' : 'none' }} // Умовний рендеринг для фліпу
          >
            <p className="text-gray-600 text-sm mb-2">
              Код діятиме ще 2:59 хв
            </p>
            {/* Використовуємо мок-компонент */}
            <QRCodeMock value={qrData} size={160} />
            <p className="text-xs text-gray-500 mt-2">
              Скануйте для перевірки дійсності
            </p>
            <div className="bg-green-200 text-green-900 text-xs px-4 py-2 font-medium w-full text-center mt-4">
              Документ оновлено {updateTime}
            </div>
          </div>
          
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex gap-2 mt-4">
        {documents.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              i === activeIndex ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(i)} // Додаємо клік для перемикання
          />
        ))}
      </div>

      {/* Bottom nav */}
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
            className="w-6 h-6" // Прибрано клас lucide
          >
            <path d="M15 12H3"></path>
            <path d="M17 18H3"></path>
            <path d="M21 6H3"></path>
          </svg>
          <span>Стрічка</span>
        </Link>

        <Link href="/documents" className="flex flex-col items-center gap-1">
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
            className="w-6 h-6" // Прибрано клас lucide
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
            className="w-6 h-6" // Прибрано клас lucide
          >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
          </svg>
          <span>Сервіси</span>
        </Link>

        <Link
          href="/menu"
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
            className="w-6 h-6" // Прибрано клас lucide
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Меню</span>
        </Link>
      </nav>
    </main>
  );
}
