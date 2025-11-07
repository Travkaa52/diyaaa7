import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import QRCode from "react-qr-code";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useUserData } from "../components/UserDataContext";

// ----------------------------------------------------------------------
// Зверніть увагу: Ці заглушки необхідні для відтворення логіки з мінімізованого файлу.
// Якщо у вас є файли `../utils/user-data` та `../utils/key-validation`,
// замініть їх на справжні імпорти.
// ----------------------------------------------------------------------

// --- Placeholder for utility functions (based on minified logic) ---
// Припускаємо, що ця функція отримує дані користувача зі сховища
const is = async () => { 
  // Заглушка, повертає тестові дані для відображення документа
  return { 
    key: "valid_key", 
    deviceNumber: "DEV12345", 
    taxCardNumber: "TAX67890", 
    passportNumber: "PAS13579",
    name: "Михайло Валерійович Касьян",
    birthDate: "11.08.2007",
    // Замініть на свій шлях до фото
    imageBase64: "/default-avatar.png", 
    surname: "Касьян",
    patronymic: "Валерійович"
  }; 
}; 
// Припускаємо, що ця функція валідує ключ
const q = (key) => key === "valid_key"; 
// ----------------------------------------------------------------------


// --- Component DocumentCard (o) - Картка окремого документа ---
function DocumentCard({ index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [userData, setUserData] = useState(null); 
  const controls = useAnimation();
  const [qrRefresh, setQrRefresh] = useState(0); // Оновлення QR
  const [updateTime, setUpdateTime] = useState(""); // Час оновлення

  // Логіка оновлення часу та QR коду
  useEffect(() => {
    const now = new Date();
    setUpdateTime(
      now.toLocaleString("uk-UA", {
        day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
      })
    );
    const interval = setInterval(() => setQrRefresh((r) => r + 1), 180000); // Оновлення QR кожні 3 хв
    return () => clearInterval(interval);
  }, [qrRefresh]);


  // Логіка отримання номера документа залежно від індексу
  const getDocumentNumber = (s) => {
    if (!userData) return "";
    switch (s) {
      case 0: return userData.deviceNumber; // єДокумент
      case 1: return userData.taxCardNumber; // Карта платника податків
      case 2: return userData.passportNumber; // Паспорт
      default: return "";
    }
  };
  const documentNumber = getDocumentNumber(index);

  // 1. Отримання даних користувача (з мінімізованого файлу)
  useEffect(() => {
    (async () => {
      let key = await is();
      if (key) {
        if (q(key.key)) {
          setUserData(key);
        } else {
          console.error("Invalid key stored in user data");
        }
      }
    })();
  }, []);

  // 2. Анімація перевороту (з мінімізованого файлу)
  useEffect(() => {
    if (isFlipped) {
      controls.start({ rotateY: 180 });
      setTimeout(() => setIsQRVisible(true), 300);
    } else {
      setIsQRVisible(false);
      controls.start({ rotateY: 0 });
    }
  }, [isFlipped, controls]);

  const qrData = JSON.stringify({
    surname: userData?.surname,
    name: userData?.name,
    patronymic: userData?.patronymic,
    docType: index === 0 ? "edoc" : index === 1 ? "tax" : "passport",
    id: documentNumber,
    refresh: qrRefresh,
  });

  // --------------------------------------------------
  // Спеціальний слайд для Додавання/Зміни (index 3)
  // --------------------------------------------------
  if (index === 3) {
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <button className="w-full flex-1 rounded-3xl bg-white/10 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 text-black">
          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
            {/* Icon Add */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14"/></svg>
          </div>
          <p className="text-xl font-medium">Додати документ</p>
        </button>
        <button className="w-full flex-1 rounded-3xl bg-white/10 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 text-black">
          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
            {/* Icon Edit */}
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
            
            {/* Градієнт для єДокумента */}
            {index !== 1 && ( 
              <div className="absolute inset-0 bg-gradient-to-br from-[#43A047]/10 via-transparent to-transparent pointer-events-none" />
            )}
            
            {/* Заголовок */}
            <div className="flex flex-col mb-6">
              {index === 0 && (
                <h2 className="text-[22px] font-medium">єДокумент</h2>
              )}
              {index === 1 && (
                <Fragment>
                  <h2 className="text-[22px] font-medium">Карта платника</h2>
                  <h2 className="text-[22px] font-medium">податків</h2>
                </Fragment>
              )}
              {index === 2 && (
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
                {index === 1 ? (
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <p className="text-[15px] uppercase">РНОКПП</p>
                    </div>
                    <div className="space-y-3 mb-auto">
                      <div className="space-y-0.5">
                        {userData.name.split(" ").map((namePart, s) => (
                          <p key={s} className="text-[17px] font-medium leading-tight">
                            {namePart}
                          </p>
                        ))}
                      </div>
                      <div>
                        <p className="text-[16px]">Дата народження</p>
                        <p className="text-[15px]">{userData.birthDate}</p>
                      </div>
                    </div>
                    
                    {/* Рухомий рядок оновлення */}
                    <div className="relative w-[calc(100%+3rem)] -mx-6 overflow-hidden mt-auto mb-4 h-7">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#90EE90] to-[#87CEEB]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff10] to-transparent" />
                        </div>
                        <div className="whitespace-nowrap py-1 text-sm absolute inset-0 flex items-center overflow-hidden">
                            <div className="animate-scroll">
                                <span>Документ оновлено о {updateTime} . Перевірено Державною податковою службою &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-end justify-between mt-4">
                      <p className="text-[26px] font-medium">{documentNumber}</p>
                      <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, s) => (<div key={s} className="w-1 h-1 rounded-full bg-white" />))}
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
                          <p className="text-[15px] font-semibold tracking-wider">Дата</p>
                          <p className="text-[15px] font-semibold tracking-wider">народження:</p>
                          <p className="text-[15px] font-semibold">{userData.birthDate}</p>
                        </div>
                        <div>
                          <p className="text-[15px] font-semibold mb-1">
                            {index === 0 ? "РНОКПП:" : "Номер:"}
                          </p>
                          <p className="text-[15px] font-semibold">{documentNumber}</p>
                        </div>
                        {index === 2 && userData?.signature && (
                          <svg width="100" height="30" className="mt-2">
                            <path d={userData.signature} stroke="black" strokeWidth="1.5" fill="none" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    {/* Рухомий рядок оновлення */}
                    <div className="relative w-[calc(100%+3rem)] -mx-6 overflow-hidden h-7 mt-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#90EE90] to-[#87CEEB]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff10] to-transparent" />
                        </div>
                        <div className="whitespace-nowrap py-1 text-sm absolute inset-0 flex items-center overflow-hidden">
                            <div className="animate-scroll">
                                <span>Документ діє під час воєнного стану. Ой у лузі червона калина похилилася... Оновлено о {updateTime} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="space-y-0.5">
                        {userData.name.split(" ").map((namePart, s) => (
                          <p key={s} className="text-[26px] font-medium leading-tight">
                            {namePart}
                          </p>
                        ))}
                      </div>
                      <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center self-end mb-1">
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, s) => (<div key={s} className="w-1 h-1 rounded-full bg-white" />))}
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
          animate={{ backgroundColor: isFlipped ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.1)" }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center gap-6">
            {isQRVisible && (
              <Fragment>
                <p className="text-gray-600 text-sm mb-2">
                  Код діятиме ще 2:59 хв
                </p>
                {/* Використовуємо реальний QR код на основі даних */}
                <QRCode value={qrData} size={160} />
                
                <p className="text-xs text-gray-500 mt-2">
                  Скануйте для перевірки дійсності
                </p>
                
                {/* Control buttons from minified file */}
                {0 !== index && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <button className="p-3 bg-black rounded-xl text-white">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                            <path
                              d="M3 9h6m-6 6h6m6-6h6m-6 6h6M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm12 0h6v6h-6v-6z"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>
                      <span className="text-xs mt-2 text-black">QR-код</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <button className="p-3 bg-black rounded-xl text-white">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                            <path
                              d="M4 5h16M4 9h16M4 13h16M4 19h16"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </button>
                      <span className="text-xs mt-2 text-black">Штрих-код</span>
                    </div>
                  </div>
                )}
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


// --- Component DocumentSlider (u) - Слайдер документів ---
function DocumentSlider() {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [direction, setDirection] = useState(0); 
  const documents = [0, 1, 2, 3]; // Індекси: 0, 1, 2, 3 (Додати/Змінити)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < documents.length - 1) {
        setDirection(1);
        setCurrentIndex(prev => prev + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setDirection(-1);
        setCurrentIndex(prev => prev - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

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
    // !!! ВИПРАВЛЕННЯ: Додаємо відступ зверху та обмежуємо ширину тут
    <div className="flex flex-col items-center mt-20 w-[90%] max-w-sm mx-auto"> 
      {/* !!! ВИПРАВЛЕННЯ: Використовуємо висоту 70vh з мінімізованого файлу */}
      <div className="relative w-full h-[70vh] overflow-hidden" {...handlers}>
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


// --- Main component DocumentsPage (обгортка) ---
export default function DocumentsPage() {
    // Тут залишаємо тільки загальну обгортку та навігацію

  return (
    <main
      className="min-h-screen flex flex-col items-center bg-gradient-to-b 
      from-[#d7c7ff] via-[#f0eaff] to-[#fff8d7] overflow-hidden"
    >
      {/* СЛАЙДЕР ВЖЕ МІСТИТЬ mt-20 ТА max-w-sm */}
      <DocumentSlider />

      {/* Bottom nav (залишається без змін) */}
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
            className="lucide lucide-user"
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
