import React, { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useUserData } from "../components/UserDataContext";

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
    const interval = setInterval(() => setQrRefresh((r) => r + 1), 180000);
    return () => clearInterval(interval);
  }, []);

  // свайпи
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveIndex((prev) => (prev + 1) % documents.length),
    onSwipedRight: () =>
      setActiveIndex((prev) => (prev - 1 + documents.length) % documents.length),
  });

  const doc = documents[activeIndex];
  const qrData = JSON.stringify({
    surname: userData?.surname,
    name: userData?.name,
    patronymic: userData?.patronymic,
    docType: doc.type,
    id: userData?.idNumber || "013792783",
    refresh: qrRefresh,
  });

  return (
    <main
      className="min-h-screen flex flex-col items-center bg-gradient-to-b 
      from-[#d7c7ff] via-[#f0eaff] to-[#fff8d7] overflow-hidden"
    >
      <div
        {...handlers}
        // Забезпечуємо, що "перевернутий" стан коректно відображається
        className="mt-20 w-[90%] max-w-sm perspective cursor-pointer"
        onClick={() => setIsFlipped((f) => !f)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeIndex}-${isFlipped}`}
            // Оптимізація: Прибираємо початковий rotateY та opacity, щоб документ з'явився одразу.
            // Замість цього, використовуємо лише transform для анімації перевороту.
            // Якщо isFlipped - робимо початковий поворот для зворотної сторони.
            initial={{ rotateY: isFlipped ? 180 : 0, opacity: 0 }}
            animate={{ rotateY: isFlipped ? 180 : 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 0 : 180, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[420px] will-change-transform" // will-change-transform для оптимізації
            style={{ 
              transformStyle: 'preserve-3d', 
              backfaceVisibility: isFlipped ? 'visible' : 'hidden' 
            }}
          >
            {/* FRONT */}
            <motion.div
              // Відображаємо тільки коли не перевернуто. Додаємо absolute, щоб фронт і бек були в одній площині.
              className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
              animate={{ rotateY: isFlipped ? -180 : 0, opacity: isFlipped ? 0 : 1 }}
              transition={{ duration: 0.6 }}
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
            </motion.div>

            {/* BACK */}
            <motion.div
              className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-gray-200 flex flex-col items-center justify-center"
              style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }} // Початковий поворот для зворотної сторони
              animate={{ rotateY: isFlipped ? 0 : 180, opacity: isFlipped ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-600 text-sm mb-2">
                Код діятиме ще 2:59 хв
              </p>
              <QRCode value={qrData} size={160} />
              <p className="text-xs text-gray-500 mt-2">
                Скануйте для перевірки дійсності
              </p>
              <div className="bg-green-200 text-green-900 text-xs px-4 py-2 font-medium w-full text-center mt-4">
                Документ оновлено {updateTime}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex gap-2 mt-4">
        {documents.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === activeIndex ? "bg-black" : "bg-gray-300"
            }`}
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
