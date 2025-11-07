import React, { useEffect, useState, Fragment, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useSwipeable } from "react-swipeable";

// Симуляция данных
const getUserDataAsync = async () => ({
  key: "valid_key",
  deviceNumber: "DEV-12345678",
  taxCardNumber: "TAX-901234567",
  passportNumber: "PAS-78901234",
  name: "Михайло",
  surname: "Касьян",
  patronymic: "Валерійович",
  birthDate: "11.08.2007",
  imageBase64: "https://via.placeholder.com/140x180.png?text=Photo",
});
const d = { is: getUserDataAsync };
const x = { q: (key) => key === "valid_key" };

// ========================== CARD ===============================
function DocumentCard({ index: s }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const controls = useAnimation();
  const [qrRefresh, setQrRefresh] = useState(0);
  const [refreshCountdown, setRefreshCountdown] = useState(180);

  const documentNumber = (e) => {
    if (!userData) return "";
    return e === 0
      ? userData.deviceNumber
      : e === 1
      ? userData.taxCardNumber
      : e === 2
      ? userData.passportNumber
      : "";
  };
  const j = documentNumber(s);

  useEffect(() => {
    (async () => {
      const e = await d.is();
      if (e && x.q(e.key)) setUserData(e);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          setQrRefresh((r) => r + 1);
          return 180;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isFlipped) {
      controls.start({ rotateY: 180 });
      setTimeout(() => setIsQRVisible(true), 300);
    } else {
      setIsQRVisible(false);
      controls.start({ rotateY: 0 });
    }
  }, [isFlipped, controls]);

  const qrData = useMemo(
    () =>
      JSON.stringify({
        surname: userData?.surname,
        name: userData?.name,
        patronymic: userData?.patronymic,
        docType: s === 0 ? "edoc" : s === 1 ? "tax" : "passport",
        id: j,
        refresh: qrRefresh,
      }),
    [userData, s, j, qrRefresh]
  );

  const formatCountdown = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (s === 3) {
    return (
      <div className="w-full h-full flex flex-col gap-4 justify-around p-4">
        <button className="w-full flex-1 rounded-3xl bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-black p-4">
          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5v14" />
            </svg>
          </div>
          <p className="text-xl font-medium text-center">Додати документ</p>
        </button>

        <button className="w-full flex-1 rounded-3xl bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-black p-4">
          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5l4 4L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <p className="text-xl font-medium text-center">
            Змінити порядок
            <br /> документів
          </p>
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-full aspect-[3/4] max-w-sm mx-auto perspective cursor-pointer select-none"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={controls}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <motion.div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-sm p-4 sm:p-6 flex flex-col relative overflow-hidden text-black">
            {userData ? (
              <Fragment>
                <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
                  <img
                    src={userData.imageBase64}
                    alt="Фото профиля"
                    className="w-[100px] h-[130px] sm:w-[140px] sm:h-[180px] object-cover rounded-2xl"
                  />
                  <div className="flex flex-col gap-2 sm:gap-4">
                    <p className="text-[14px] sm:text-[15px] font-semibold">
                      Дата народження: <br />
                      {userData.birthDate}
                    </p>
                    <p className="text-[14px] sm:text-[15px] font-semibold">
                      Номер: {j}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center sm:text-left space-y-0.5">
                  <p className="text-[22px] sm:text-[26px] font-medium">{userData.surname}</p>
                  <p className="text-[22px] sm:text-[26px] font-medium">{userData.name}</p>
                  <p className="text-[22px] sm:text-[26px] font-medium">{userData.patronymic}</p>
                </div>
              </Fragment>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">Дані не завантажено</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute w-full h-full backface-hidden rounded-3xl"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center gap-6 bg-white/90">
            {isQRVisible && (
              <Fragment>
                <p className="text-gray-600 text-sm mb-2">
                  Код діятиме ще {formatCountdown(refreshCountdown)} хв
                </p>
                <QRCode
                  value={qrData}
                  size={140}
                  style={{ height: "auto", width: "160px" }}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Скануйте для перевірки дійсності
                </p>
              </Fragment>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ========================== SLIDER ===============================
function DocumentSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const documents = [0, 1, 2, 3];

  const handlers = useSwipeable({
    onSwipedLeft: () => currentIndex < documents.length - 1 && setCurrentIndex(currentIndex + 1),
    onSwipedRight: () => currentIndex > 0 && setCurrentIndex(currentIndex - 1),
    trackMouse: true,
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center overflow-hidden"
        {...handlers}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -1000, opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <DocumentCard index={currentIndex} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2 mt-4 sm:mt-6">
        {documents.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ========================== PAGE ===============================
export default function DocumentsPage() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .perspective { perspective: 1000px; }
      .backface-hidden { backface-visibility: hidden; }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#d7c7ff] via-[#f0eaff] to-[#fff8d7] overflow-hidden pb-[90px] pt-4 sm:pt-10">
      <div className="w-full flex justify-center px-4">
        <DocumentSlider />
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-black text-white h-[80px] flex justify-around items-center text-[10px] sm:text-xs">
        <Link href="/home" className="flex flex-col items-center gap-1 opacity-60">
          <span>Стрічка</span>
        </Link>
        <Link href="/documents" className="flex flex-col items-center gap-1">
          <span>Документи</span>
        </Link>
        <Link href="/services" className="flex flex-col items-center gap-1 opacity-60">
          <span>Сервіси</span>
        </Link>
        <Link href="/menu" className="flex flex-col items-center gap-1 opacity-60">
          <span>Меню</span>
        </Link>
      </nav>
    </main>
  );
}

