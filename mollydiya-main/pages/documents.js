import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Repeat2 } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";

// --- MOCK ДАННЫЕ ДЛЯ ПРОВЕРКИ ---
const getUserDataAsync = async () => ({
  surname: "Касьян",
  name: "Михайло",
  patronymic: "Валерійович",
  birthDate: "11.08.2007",
  deviceNumber: "DEV-12345678",
  taxCardNumber: "TAX-901234567",
  passportNumber: "PAS-78901234",
  imageBase64: "https://via.placeholder.com/140x180.png?text=Photo",
});

// --- КАРТОЧКА ДОКУМЕНТА ---
function DocumentCard({ index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserDataAsync().then(setUserData);
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-full text-gray-600">
        Завантаження...
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm h-[480px] mx-auto perspective">
      <motion.div
        className={`relative w-full h-full rounded-3xl bg-white/10 backdrop-blur-[4px] p-6 flex flex-col overflow-hidden text-black border border-white/20 shadow-xl ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        transition={{ duration: 0.6 }}
      >
        {/* Передняя сторона */}
        {!isFlipped ? (
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">єДокумент</h2>
              <button onClick={() => setIsFlipped(true)}>
                <Repeat2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2">
              <Image
                src={userData.imageBase64}
                alt="Фото"
                width={140}
                height={180}
                className="rounded-xl border border-gray-300 object-cover"
              />
              <div className="text-sm">
                <p className="font-semibold">
                  {userData.surname} {userData.name}
                </p>
                <p className="text-gray-700">{userData.patronymic}</p>
                <p className="mt-2">Народився: {userData.birthDate}</p>
              </div>
            </div>

            <div className="text-[12px] text-gray-700 mt-3">
              <p>Номер пристрою: {userData.deviceNumber}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">єДокумент (зворот)</h2>
              <button onClick={() => setIsFlipped(false)}>
                <Repeat2 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-center items-center flex-1">
              <p className="text-gray-700">QR-код або інша інформація</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// --- СЛАЙДЕР ДОКУМЕНТІВ ---
function DocumentSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const documents = ["єДокумент", "ІПН", "Паспорт", "Додати"];
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) => (prev + 1) % documents.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) =>
        prev === 0 ? documents.length - 1 : prev - 1
      ),
  });

  return (
    <div className="relative w-full h-[520px] flex items-center justify-center" {...handlers}>
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <DocumentCard index={currentIndex} />
        </motion.div>
      </AnimatePresence>

      {/* Навигационные стрелки */}
      <button
        onClick={() =>
          setCurrentIndex((prev) =>
            prev === 0 ? documents.length - 1 : prev - 1
          )
        }
        className="absolute left-2 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev + 1) % documents.length)
        }
        className="absolute right-2 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>
    </div>
  );
}

// --- ГЛАВНАЯ СТРАНИЦА ---
export default function DocumentsPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#d7c7ff] via-[#f0eaff] to-[#fff8d7] overflow-hidden pb-[100px]">
      <div className="w-[90%] max-w-sm mx-auto">
        <DocumentSlider />
      </div>

      {/* Нижняя панель */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-black text-white h-[80px] pb-4 flex justify-around items-center text-[10px]">
        <button className="flex flex-col items-center">
          <Plus className="w-5 h-5" />
          <span>Документи</span>
        </button>
        <button className="flex flex-col items-center">
          <Repeat2 className="w-5 h-5" />
          <span>QR</span>
        </button>
      </nav>
    </main>
  );
}

