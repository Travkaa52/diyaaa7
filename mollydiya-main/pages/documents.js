import React, { useEffect, useState, Fragment, useMemo } from "react";
import Link from "next/link";
// Используем dynamic import для QRCode, чтобы избежать SSR проблем (как в оригинальном файле)
import dynamic from 'next/dynamic'; 
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

import { motion, AnimatePresence, useAnimation } from "framer-motion"; 
import { useSwipeable } from "react-swipeable"; 

// ----------------------------------------------------------------------
// 1. ИМИТАЦИЯ ДАННЫХ И СТИЛЕЙ
// ----------------------------------------------------------------------

// Имитация асинхронной функции получения данных (как d.is и x.q)
const getUserDataAsync = async () => {
  return { 
    key: "valid_key_for_check", 
    deviceNumber: "DEV-12345678", 
    taxCardNumber: "TAX-901234567", 
    passportNumber: "PAS-78901234",
    name: "Михайло",
    surname: "Касьян",
    patronymic: "Валерійович",
    birthDate: "11.08.2007",
    imageBase64: "https://via.placeholder.com/140x180?text=Photo", 
  }; 
}; 

// Определения типов документов
const DOC_TYPES = [
    { title: "єДокумент", type: "edoc", numberKey: "deviceNumber", verificationText: "Перевірено Державною фіскальною службою" },
    { title: "Карта платника податків", type: "tax", numberKey: "taxCardNumber", verificationText: "Перевірено Державною податковою службою" },
    { title: "Паспорт громадянина України", type: "passport", numberKey: "passportNumber", verificationText: "Перевірено Державною міграційною службою" },
];

// Стиль для скрытия обратной стороны, ключевой для 3D-переворота
const backfaceHiddenStyle = { 
  backfaceVisibility: 'hidden', 
  WebkitBackfaceVisibility: 'hidden' 
};

// Функция форматирования таймера
const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// ----------------------------------------------------------------------
// 2. КОМПОНЕНТ DocumentCard (Карточка Документа)
// ----------------------------------------------------------------------

const DocumentCard = ({ index }) => {
    const doc = DOC_TYPES[index];
    const [isFlipped, setIsFlipped] = useState(false);
    const [userData, setUserData] = useState(null);
    
    // Состояние таймера и счетчика QR-кода
    const [qrRefreshCount, setQrRefreshCount] = useState(0);
    const [countdown, setCountdown] = useState(180); // Интервал 180 секунд (3 минуты)
    const [updateTime] = useState(new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }));
    
    const controls = useAnimation();

    // Загрузка данных пользователя
    useEffect(() => {
        (async () => {
            const data = await getUserDataAsync();
            // В реальном коде здесь была бы проверка ключа (x.q(e.key))
            if (data) {
                setUserData(data);
            }
        })();
    }, []);

    // Логика переворота (вызывается по клику)
    const handleFlip = () => {
        setIsFlipped(prev => !prev);
        // Запуск анимации с использованием framer-motion
        controls.start({ rotateY: isFlipped ? 0 : 180 });
    };

    // Логика таймера QR-кода (самый важный аспект безопасности)
    useEffect(() => {
        if (index >= DOC_TYPES.length || !userData) return;

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    setQrRefreshCount(c => c + 1); // Обновляем счетчик для нового QR-кода
                    return 180; // Сброс таймера
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [index, userData]);

    // Данные для QR-кода
    const qrData = useMemo(() => {
        if (!userData) return "";
        return JSON.stringify({
            surname: userData.surname,
            name: userData.name,
            docType: doc.type,
            id: userData[doc.numberKey],
            refresh: qrRefreshCount, // Включаем счетчик для обновления
        });
    }, [userData, doc, qrRefreshCount]);


    // Слайд для добавления/изменения документов (index 3)
    if (index >= DOC_TYPES.length) {
        return (
            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-3xl w-full h-[550px] text-center shadow-lg mx-4">
                <h2 className="text-xl font-bold mb-6 text-gray-700">Опції документів</h2>
                <button className="bg-white text-blue-600 border border-blue-600 py-3 px-6 rounded-xl mb-4 w-4/5 shadow">
                    Додати документ
                </button>
                <button className="bg-white text-blue-600 border border-blue-600 py-3 px-6 rounded-xl w-4/5 shadow">
                    Змінити порядок документів
                </button>
            </div>
        );
    }

    if (!userData) return <div className="p-5 text-center">Завантаження даних...</div>;
    
    return (
        <motion.div
            className="w-full h-[550px] relative cursor-pointer px-4"
            onClick={handleFlip}
            style={{ perspective: 1000 }} // Создаем перспективу для 3D
        >
            <motion.div
                className="absolute w-full h-full rounded-3xl shadow-2xl bg-white"
                animate={controls}
                initial={{ rotateY: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }} // Включаем 3D-стилизацию
            >
                {/* ЛИЦЕВАЯ СТОРОНА */}
                <div
                    className="absolute w-full h-full rounded-3xl p-5 bg-white"
                    style={backfaceHiddenStyle}
                >
                    <h1 className="text-xl font-bold mb-4">{doc.title}</h1>
                    <div className="flex gap-4 items-start">
                        <img 
                            src={userData.imageBase64} 
                            alt="Photo" 
                            className="w-[100px] h-[130px] rounded-lg object-cover border border-gray-300" 
                        />
                        <div className="pt-2">
                            <p className="text-lg font-semibold">{userData.surname}</p>
                            <p className="text-lg font-semibold">{userData.name}</p>
                            <p className="text-lg font-semibold">{userData.patronymic}</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <p className="text-sm text-gray-500">Дата народження: <span className="text-base text-black font-medium">{userData.birthDate}</span></p>
                        <p className="text-sm text-gray-500 mt-2">Номер документа:</p>
                        <p className="text-xl font-mono text-black font-semibold">{userData[doc.numberKey]}</p>
                    </div>

                    {/* Бегущая строка (анимированный тикер, как в оригинале) */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#e8ffe0] flex items-center overflow-hidden rounded-b-3xl">
                        <p className="whitespace-nowrap animate-scroll text-sm text-green-800 px-4">
                            Документ оновлено о {updateTime} | {doc.verificationText} | Документ оновлено о {updateTime}
                        </p>
                        {/* Примечание: CSS для @keyframes scroll должен быть добавлен глобально */}
                    </div>
                </div>

                {/* ОБРАТНАЯ СТОРОНА (QR-код и проверка) */}
                <div
                    className="absolute w-full h-full rounded-3xl p-5 flex flex-col items-center justify-center bg-[#f0f3f6]"
                    style={{ ...backfaceHiddenStyle, transform: 'rotateY(180deg)' }}
                >
                    <p className="text-sm text-gray-600 mb-4 font-mono">Код діятиме ще {formatCountdown(countdown)} хв</p>
                    <div className="p-2 bg-white rounded-xl shadow-lg">
                        {/* Компонент QR-кода */}
                        {isFlipped && <QRCode value={qrData} size={200} level="H" />} 
                    </div>
                    <p className="text-xs text-green-700 mt-4 font-medium">Для перевірки дійсності документа</p>
                </div>
            </motion.div>
        </motion.div>
    );
};


// ----------------------------------------------------------------------
// 3. КОМПОНЕНТ DocumentSlider (Слайдер Документов)
// ----------------------------------------------------------------------

const slideVariants = {
    // Пользовательское значение direction передается сюда
    enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0.8 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? "-100%" : "100%", opacity: 0.8 }),
};

const DocumentSlider = () => {
    // Включаем 3 документа + 1 слайд опций
    const documents = [...DOC_TYPES, {}]; 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // 1: свайп влево, -1: свайп вправо

    // Хук для обработки свайпов
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

    return (
        <div className="flex flex-col items-center">
            {/* Область слайдера с обработчиками свайпов */}
            <div 
                className="relative w-full h-[600px] overflow-hidden" 
                {...handlers}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            // Используем spring-анимацию, как в framer-motion по умолчанию
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            opacity: { duration: 0.2 },
                        }}
                        className="absolute w-full h-full"
                    >
                        <DocumentCard index={currentIndex} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Пагинация (точки) */}
            <div className="flex space-x-2 mt-4">
                {documents.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentIndex ? 'bg-black' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// 4. ГЛАВНЫЙ КОМПОНЕНТ DocumentsPage
// ----------------------------------------------------------------------

export default function DocumentsPage() {

    // Вставка ключевых стилей для 3D и анимации (как в вашем оригинальном файле)
    useEffect(() => {
        // Код из оригинального файла для вставки стилей
        const style = document.createElement('style');
        style.innerHTML = `
            /* Ключ для 3D-переворота */
            .backface-hidden { 
                backface-visibility: hidden; 
                -webkit-backface-visibility: hidden; 
            }
            /* Ключ для бегущей строки */
            @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); } 
            }
            .animate-scroll {
                animation: scroll 15s linear infinite;
                width: 200%; /* Удвоение ширины для бесконечной прокрутки */
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);


    return (
        // Общий макет страницы (как в оригинале: градиент + padding)
        <div className="min-h-screen relative pb-24"
             style={{ background: 'linear-gradient(to bottom, #d7c7ff, #fff8d7)' }}>
            
            <header className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md p-4 pt-8 z-10 shadow-sm">
                <h1 className="text-xl font-bold text-center">Мої Документи</h1>
            </header>

            <main className="pt-24 max-w-md mx-auto">
                <DocumentSlider />
            </main>

            {/* Фиксированная нижняя навигация */}
            <nav className="fixed bottom-0 left-0 right-0 bg-black text-white h-20 flex justify-around items-center z-10">
                {/* Иконки скопированы из исходного файла (documents (5).js) */}
                <Link href="/feed" className="flex flex-col items-center gap-1 opacity-60">
                    {/* ... Иконка для Стрічка ... */}
                    <span>Стрічка</span>
                </Link>
                
                {/* Активная ссылка */}
                <Link href="/documents" className="flex flex-col items-center gap-1 text-yellow-300">
                    {/* ... Иконка для Документи ... */}
                    <span>Документи</span>
                </Link>

                <Link href="/services" className="flex flex-col items-center gap-1 opacity-60">
                    {/* ... Иконка для Сервіси ... */}
                    <span>Сервіси</span>
                </Link>

                <Link href="/menu" className="flex flex-col items-center gap-1 opacity-60">
                    {/* ... Иконка для Меню ... */}
                    <span>Меню</span>
                </Link>
            </nav>
        </div>
    );
}

// Экспорт компонентов для использования в других файлах (если бы они были разделены)
export { DocumentCard, DocumentSlider };
