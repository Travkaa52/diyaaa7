import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
// Використовуємо dynamic import для QRCode, оскільки він, ймовірно, не потрібен на стороні сервера
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

// Імпортуємо фреймворк та залежності для анімації/свайпу:
import { motion, AnimatePresence, useAnimation } from "framer-motion"; 
import { useSwipeable } from "react-swipeable"; 

// ----------------------------------------------------------------------
// ЗОВНІШНІ ЗАЛЕЖНОСТІ (СИМУЛЯЦІЯ r(6823) -> d.is та r(5187) -> x.q)
// ----------------------------------------------------------------------

// Симуляція d.is: Отримує дані користувача
const getUserDataAsync = async () => {
  return { 
    key: "valid_key", 
    // Імітація даних з мінімізованого файлу (deviceNumber, taxCardNumber, passportNumber)
    deviceNumber: "DEV-12345678", 
    taxCardNumber: "9012345678", // 10 цифр для РНОКПП
    passportNumber: "78901234", // Номер ID-картки
    
    // ПІБ, розділене пробілами (як імпліцитно очікує код)
    name: "Михайло Касьян Валерійович", 
    surname: "Касьян",
    patronymic: "Валерійович",
    birthDate: "11.08.2007",
    imageBase64: "https://via.placeholder.com/140x180?text=Photo", // Замініть на ваш шлях до фото
    // Сигнатура (імітація SVG Path)
    signature: "M 10 15 C 20 25, 40 5, 40 15 C 60 25, 80 5, 90 15",
  }; 
}; 
const d = { is: getUserDataAsync }; // r(6823)
const x = { q: (key) => key === "valid_key" }; // r(5187) - Валідація ключа

// ----------------------------------------------------------------------
// 1. КОМПОНЕНТ DocumentCard (o)
// ----------------------------------------------------------------------

function DocumentCard({ index: s }) {
  const [isFlipped, setIsFlipped] = useState(false); // l
  const [isQRVisible, setIsQRVisible] = useState(false); // m
  const [userData, setUserData] = useState(null); // u
  const controls = useAnimation(); // p
  const [qrRefresh, setQrRefresh] = useState(0); 
  const [updateTime, setUpdateTime] = useState(""); 
  const [refreshCountdown, setRefreshCountdown] = useState(180);

  // j - функція отримання номера документа (відновлена з мінімізованого файлу)
  const documentNumber = (e) => {
    if (!userData) return "";
    switch (e) {
      case 0: return userData.deviceNumber; // єДокумент
      case 1: return userData.taxCardNumber; // Карта платника податків (РНОКПП)
      case 2: return userData.passportNumber; // Паспорт
      default: return "";
    }
  };
  const j = documentNumber(s); // Номер документа

  // Логіка часу оновлення
  useEffect(() => {
    const now = new Date();
    setUpdateTime(
      now.toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit" }) + 
      " | " + 
      now.toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" })
    );

    // Зворотний відлік QR
    const countdownInterval = setInterval(() => {
        setRefreshCountdown(prev => {
            if (prev <= 1) {
                // Час вийшов, оновлюємо QR та скидаємо лічильник
                setQrRefresh(r => r + 1);
                return 180;
            }
            return prev - 1;
        });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [qrRefresh]);

  // Отримання даних користувача (useEffect 1 в мінімізованому файлі)
  useEffect(() => {
    (async () => {
      let e = await d.is(); 
      if (e) {
        if (x.q(e.key)) { 
          setUserData(e);
        } else {
          console.error("Invalid key stored in user data");
        }
      }
    })();
  }, []);

  // Анімація перевороту (useEffect 2 в мінімізованому файлі)
  useEffect(() => {
    if (isFlipped) { 
      controls.start({ rotateY: 180 }); 
      setTimeout(() => setIsQRVisible(true), 300); // Затримка 300мс
    } else {
      setIsQRVisible(false); 
      controls.start({ rotateY: 0 }); 
    }
  }, [isFlipped, controls]);

  const qrData = JSON.stringify({
    surname: userData?.surname,
    name: userData?.name, // Використовуємо лише ім'я
    patronymic: userData?.patronymic,
    docType: s === 0 ? "edoc" : s === 1 ? "tax" : "passport",
    id: j,
    refresh: qrRefresh,
  });

  // Форматування зворотного відліку
  const formatCountdown = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // --------------------------------------------------
  // Спеціальний слайд для Додавання/Зміни (index 3)
  // --------------------------------------------------
  if (s === 3) {
    return (
      <div className="w-full h-full flex flex-col gap-4">
        {/* Кнопка Додати документ - (відновлена іконка Add) */}
        <button className="w-full flex-1 rounded-3xl bg-white/10 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 text-black">
          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
            {/* Іконка Add (+) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14"/></svg>
          </div>
          <p className="text-xl font-medium">Додати документ</p>
        </button>
        
        {/* Кнопка Змінити порядок документів - (відновлена іконка Edit) */}
        <button className="w-full flex-1 rounded-3xl bg-white/10 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 text-black">
          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
            {/* Іконка Edit (олівець) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5l4 4L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <p className="text-xl font-medium">
            Змінити порядок
            <br />
            документів
          </p>
        </button>
      </div>
    );
  }
  // --------------------------------------------------

  // --------------------------------------------------
  // Рендеринг основного документа (0, 1, 2)
  // --------------------------------------------------
  return (
    <div
      className="w-full aspect-[3/4] max-w-sm mx-auto perspective"
      onClick={() => setIsFlipped(!isFlipped)} 
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={controls}
        transition={{ duration: 0.6, animationDirection: "normal" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE (Лицьова сторона) */}
        <motion.div
          className="absolute w-full h-full backface-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFlipped ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-[2px] p-6 flex flex-col relative overflow-hidden text-black">
            
            {/* Градієнт для єДокумента та Паспорта (не для картки платника податків) */}
            {s !== 1 && ( 
              <div className="absolute inset-0 bg-gradient-to-br from-[#43A047]/10 via-transparent to-transparent pointer-events-none" />
            )}
            
            {/* Заголовок (відновлено з Fragment) */}
            <div className="flex flex-col mb-6">
              {s === 0 && (
                <h2 className="text-[22px] font-medium">єДокумент</h2>
              )}
              {s === 1 && (
                <Fragment>
                  <h2 className="text-[22px] font-medium">Карта платника</h2>
                  <h2 className="text-[22px] font-medium">податків</h2>
                </Fragment>
              )}
              {s === 2 && (
                <Fragment>
                  <h2 className="text-[22px] font-medium">Паспорт громадянина</h2>
                  <h2 className="text-[22px] font-medium">України</h2>
                </Fragment>
              )}
            </div>
            
            {/* Відображення даних або плейсхолдера */}
            {userData ? (
              <Fragment>
                {/* Карта платника податків (index 1) - відрізняється розміткою */}
                {s === 1 ? (
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <p className="text-[15px] text-black uppercase">РНОКПП</p>
                    </div>
                    <div className="space-y-3 mb-auto">
                      <div className="space-y-0.5">
                        {/* Розбиття ПІБ на окремі рядки */}
                        {userData.name.split(" ").map((namePart, index) => (
                           <p key={index} className="text-[17px] font-medium text-black leading-tight">{namePart}</p>
                        ))}
                      </div>
                      <div>
                        <p className="text-[16px] text-black">Дата народження</p>
                        <p className="text-[15px] text-black">{userData.birthDate}</p>
                      </div>
                    </div>
                    
                    {/* Рухомий рядок оновлення (Card 1) */}
                    <div className="relative w-[calc(100%+3rem)] -mx-6 overflow-hidden mt-auto mb-4 h-7">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#90EE90] to-[#87CEEB]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff10] to-transparent" />
                        </div>
                        <div className="whitespace-nowrap py-1 text-black text-sm absolute inset-0 flex items-center overflow-hidden">
                            <div className="animate-scroll">
                                <span>Документ оновлено о {updateTime} . Перевірено Державною податковою службою &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>Документ оновлено о {updateTime} . Перевірено Державною податковою службою &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-end justify-between mt-4">
                      <p className="text-[26px] font-medium text-black">{j}</p>
                      {/* Меню/налаштування кнопка (три крапки) */}
                      <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, index) => (<div key={index} className="w-1 h-1 rounded-full bg-white" />))}
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Інші документи (0: єДокумент, 2: Паспорт)
                  <Fragment>
                    <div className="flex gap-4">
                      <img
                        src={userData.imageBase64 || "/placeholder.svg"}
                        alt="Фото профілю"
                        className="w-[140px] h-[180px] object-cover rounded-2xl"
                      />
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="text-[15px] text-black font-semibold tracking-wider">Дата</p>
                          <p className="text-[15px] text-black font-semibold tracking-wider">народження:</p>
                          <p className="text-[15px] font-semibold text-black">{userData.birthDate}</p>
                        </div>
                        <div>
                          <p className="text-[15px] text-black font-semibold mb-1">
                            {s === 0 ? "РНОКПП:" : "Номер:"}
                          </p>
                          <p className="text-[15px] font-semibold text-black">{j}</p>
                        </div>
                        {s === 2 && userData?.signature && (
                          <svg width="100" height="30" className="mt-2">
                            <path d={userData.signature} stroke="black" strokeWidth="1.5" fill="none" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    {/* Рухомий рядок оновлення (Card 0 та 2) */}
                    <div className="relative w-[calc(100%+3rem)] -mx-6 overflow-hidden h-7 mt-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#90EE90] to-[#87CEEB]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff10] to-transparent" />
                        </div>
                        <div className="whitespace-nowrap py-1 text-black text-sm absolute inset-0 flex items-center overflow-hidden">
                            <div className="animate-scroll">
                                <span>Документ діє під час воєнного стану. Ой у лузі червона калина похилилася... Оновлено о {updateTime} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>Документ діє під час воєнного стану. Ой у лузі червона калина похилилася... Оновлено о {updateTime} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="space-y-0.5">
                        {/* Розбиття ПІБ на окремі рядки (згідно з мінімізованим файлом) */}
                        {userData.name.split(" ").map((namePart, index) => (
                           <p key={index} className="text-[26px] font-medium leading-tight text-black">{namePart}</p>
                        ))}
                      </div>
                      {/* Меню/налаштування кнопка (три крапки) */}
                      <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center self-end mb-1">
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, index) => (<div key={index} className="w-1 h-1 rounded-full bg-white" />))}
                        </div>
                      </button>
                    </div>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <div className="w-full h-full bg-gray-200/50 rounded-2xl flex items-center justify-center">
                <p className="text-gray-500">Дані не завантажено</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* BACK SIDE (Зворотна сторона з QR) */}
        <motion.div
          className="absolute w-full h-full backface-hidden rounded-3xl"
          style={{ transform: "rotateY(180deg)" }}
          initial={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          // Анімований колір фону для перевороту
          animate={{ backgroundColor: isFlipped ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.1)" }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center gap-6">
            {isQRVisible && ( // Відображається після затримки
              <Fragment>
                <p className="text-gray-600 text-sm mb-2">
                  Код діятиме ще {formatCountdown(refreshCountdown)} хв
                </p>
                {/* QR код */}
                <QRCode 
                    value={qrData} 
                    size={160} 
                    style={{ height: "auto", maxWidth: "100%", width: "180px" }}
                    viewBox={`0 0 256 256`} 
                />
                
                <p className="text-xs text-gray-500 mt-2">
                  Скануйте для перевірки дійсності
                </p>
                
                {/* Control buttons from minified file */}
                <div className="flex gap-4">
                  {/* Кнопка QR-код (єДокумент не має) */}
                  {s !== 0 && (
                     <div className="flex flex-col items-center">
                        <button className="p-3 bg-black rounded-xl text-white">
                          <div className="w-6 h-6 flex items-center justify-center">
                            {/* Іконка QR-коду (відновлено з мінімізованого файлу) */}
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 9h6m-6 6h6m6-6h6m-6 6h6M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm12 0h6v6h-6v-6z"/>
                            </svg>
                          </div>
                        </button>
                        <span className="text-xs mt-2 text-black">QR-код</span>
                      </div>
                  )}

                  {/* Кнопка Штрих-код */}
                  <div className="flex flex-col items-center">
                    <button className="p-3 bg-black rounded-xl text-white">
                      <div className="w-6 h-6 flex items-center justify-center">
                        {/* Іконка Штрих-коду (відновлено з мінімізованого файлу) */}
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M4 5h16M4 9h16M4 13h16M4 19h16"/>
                        </svg>
                      </div>
                    </button>
                    <span className="text-xs mt-2 text-black">Штрих-код</span>
                  </div>
                </div>
                <div className="bg-green-200 text-green-900 text-xs px-4 py-2 font-medium w-full text-center mt-4">
                    Документ оновлено {updateTime}
                </div>
              </Fragment>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. КОМПОНЕНТ DocumentSlider (u)
// ----------------------------------------------------------------------

function DocumentSlider() {
  const [currentIndex, setCurrentIndex] = useState(0); // e
  const [direction, setDirection] = useState(0); // l
  const documents = [0, 1, 2, 3]; // n - 4 слайди
  
  // Використання useSwipeable (h.QS)
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < documents.length - 1) {
        setDirection(1); // Напрямок входу: справа
        setCurrentIndex(prev => prev + 1); 
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setDirection(-1); // Напрямок входу: зліва
        setCurrentIndex(prev => prev - 1); 
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Варіанти анімації слайдів (variants з мінімізованого файлу)
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="flex flex-col items-center"> 
      <div className="relative w-full h-[70vh] overflow-hidden" {...handlers}>
        {/* AnimatePresence (m.M) */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full"
          >
            <DocumentCard index={currentIndex} key={currentIndex} /> 
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Пагінація (крапки) */}
      <div className="flex gap-2 mt-4">
        {documents.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === currentIndex ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}


// ----------------------------------------------------------------------
// 3. ГОЛОВНА СТОРІНКА (DocumentsPage)
// ----------------------------------------------------------------------

export default function DocumentsPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center bg-gradient-to-b 
      from-[#d7c7ff] via-[#f0eaff] to-[#fff8d7] overflow-hidden"
    >
        {/* Додаємо відступ зверху для позиціонування картки */}
        <div className="mt-12 w-[90%] max-w-sm mx-auto">
             <DocumentSlider />
        </div>


      {/* Bottom nav - Відновлено з використанням вбудованих SVG */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-black text-white h-[80px] pb-4 flex justify-around items-center text-[10px]">
        <Link
          href="/home"
          className="flex flex-col items-center gap-1 opacity-60"
        >
          {/* Іконка Стрічка (AlignLeft) */}
          <svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M15 12H3"></path>
            <path d="M17 18H3"></path>
            <path d="M21 6H3"></path>
          </svg>
          <span>Стрічка</span>
        </Link>

        <Link href="/documents" className="flex flex-col items-center gap-1">
          {/* Іконка Документи (FileText) */}
          <svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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
          {/* Іконка Сервіси (Zap) */}
          <svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
          </svg>
          <span>Сервіси</span>
        </Link>

        <Link
          href="/menu"
          className="flex flex-col items-center gap-1 opacity-60"
        >
          {/* Іконка Меню (User) */}
          <svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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

// Додаємо CSS для стилів, які не існують у чистому Tailwind
// Ці стилі потрібні для 3D-ефекту та анімації скролу
if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        .perspective {
            perspective: 1000px;
        }
        .backface-hidden {
            backface-visibility: hidden;
        }
        @keyframes scroll {
            0% {
                transform: translateX(100%);
            }
            100% {
                transform: translateX(-100%);
            }
        }
        .animate-scroll {
            display: flex;
            width: 200%; /* Подвоюємо для безшовного скролу */
            animation: scroll 15s linear infinite;
        }
        .animate-scroll span {
            width: 50%;
        }
    `;
    document.head.appendChild(style);
}
