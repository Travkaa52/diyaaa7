import React, { useState, useEffect, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
// Динамический импорт для QRCode (важный для Next.js SSR)
import dynamic from 'next/dynamic'; 
const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });

// ----------------------------------------------------------------------
// Имитация данных и служебные функции (как в оригинальном файле)
// ----------------------------------------------------------------------

const mockUserData = { 
  name: "Михайло", surname: "Касьян", patronymic: "Валерійович", birthDate: "11.08.2007",
  deviceNumber: "DEV-12345678", taxCardNumber: "TAX-901234567", passportNumber: "PAS-78901234",
  imageBase64: "https://via.placeholder.com/140x180?text=Photo", 
};

const DOC_INFO = {
    title: "єДокумент", 
    type: "edoc", 
    numberKey: "deviceNumber", 
    verificationText: "Перевірено Державною фіскальною службою" 
};

// Функция форматирования таймера (ММ:СС)
const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Стиль для скрытия обратной стороны (КЛЮЧЕВОЕ для 3D)
const backfaceHiddenStyle = { 
  backfaceVisibility: 'hidden', 
  WebkitBackfaceVisibility: 'hidden' 
};

// ----------------------------------------------------------------------
// ГЛАВНЫЙ КОМПОНЕНТ DocumentCard
// ----------------------------------------------------------------------

export const DocumentCard = ({ index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    // Состояние QR-кода и таймера (Логика безопасности)
    const [qrRefreshCount, setQrRefreshCount] = useState(0);
    const [countdown, setCountdown] = useState(180); // 3 минуты
    const [updateTime] = useState(new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }));
    
    // Хук для управления анимацией 3D-переворота
    const controls = useAnimation();

    // 1. ЛОГИКА ПЕРЕВОРОТА
    const handleFlip = () => {
        setIsFlipped(prev => !prev);
        // Запускаем анимацию на 180 градусов
        controls.start({ rotateY: isFlipped ? 0 : 180 });
    };

    // 2. ЛОГИКА ТАЙМЕРА QR-кода
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    setQrRefreshCount(c => c + 1); // Обновляем счетчик
                    return 180; // Сброс
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // 3. ДАННЫЕ QR-кода (обновляются при смене счетчика)
    const qrData = useMemo(() => {
        return JSON.stringify({
            surname: mockUserData.surname,
            name: mockUserData.name,
            docType: DOC_INFO.type,
            id: mockUserData[DOC_INFO.numberKey],
            refresh: qrRefreshCount, // Важно для обновления
        });
    }, [qrRefreshCount]);

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
                style={{ transformStyle: 'preserve-3d' }} // КЛЮЧЕВОЕ: сохраняет 3D-пространство
            >
                
                {/* -------------------- ЛИЦЕВАЯ СТОРОНА (FRONT) -------------------- */}
                <div
                    className="absolute w-full h-full rounded-3xl p-5 bg-white"
                    style={backfaceHiddenStyle}
                >
                    <h1 className="text-xl font-bold mb-4">{DOC_INFO.title}</h1>
                    <div className="flex gap-4 items-start">
                        <img 
                            src={mockUserData.imageBase64} 
                            alt="Photo" 
                            className="w-[100px] h-[130px] rounded-lg object-cover border border-gray-300" 
                        />
                        <div className="pt-2">
                            <p className="text-lg font-semibold">{mockUserData.surname}</p>
                            <p className="text-lg font-semibold">{mockUserData.name}</p>
                            <p className="text-lg font-semibold">{mockUserData.patronymic}</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <p className="text-sm text-gray-500">Дата народження: <span className="text-base text-black font-medium">{mockUserData.birthDate}</span></p>
                        <p className="text-sm text-gray-500 mt-2">Номер документа:</p>
                        <p className="text-xl font-mono text-black font-semibold">{mockUserData[DOC_INFO.numberKey]}</p>
                    </div>

                    {/* Бегущая строка (Тикер) */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#e8ffe0] flex items-center overflow-hidden rounded-b-3xl">
                        <p className="whitespace-nowrap animate-scroll text-sm text-green-800 px-4">
                            Документ оновлено о {updateTime} | {DOC_INFO.verificationText}
                        </p>
                    </div>
                </div>

                {/* -------------------- ОБРАТНАЯ СТОРОНА (BACK) -------------------- */}
                <div
                    className="absolute w-full h-full rounded-3xl p-5 flex flex-col items-center justify-between bg-[#f0f3f6]"
                    style={{ ...backfaceHiddenStyle, transform: 'rotateY(180deg)' }} // Изначально повернута на 180°
                >
                    {/* Блок с QR-кодом и Таймером */}
                    <div className="pt-8 flex flex-col items-center">
                        <p className="text-sm text-gray-600 mb-4 font-mono">
                            Код діятиме ще {formatCountdown(countdown)} хв
                        </p>
                        <div className="p-2 bg-white rounded-xl shadow-lg">
                            {/* QR-код рендерится только когда виден */}
                            {isFlipped && <QRCode value={qrData} size={200} level="H" />}
                        </div>
                        <p className="text-xs text-green-700 mt-4 font-medium">
                            Для перевірки дійсності документа
                        </p>
                    </div>

                    {/* Кнопки (Штрих-код и Поделиться) */}
                    <div className="flex justify-around w-full pb-6">
                        <UtilityButton iconKey="barcode" label="Штрих-код" />
                        <UtilityButton iconKey="share" label="Поділитися" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Вспомогательный компонент для кнопок
const UtilityButton = ({ iconKey, label }) => {
    // Выберите соответствующую SVG-иконку на основе iconKey
    const Icon = (props) => {
        if (iconKey === "barcode") return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M4 5h16M4 9h16M4 13h16M4 19h16" /></svg>
        );
        if (iconKey === "share") return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
        );
        return null;
    };
    
    return (
        <div className="flex flex-col items-center">
            <button className="w-12 h-12 bg-black rounded-xl text-white flex items-center justify-center shadow-lg">
                <Icon />
            </button>
            <span className="text-xs mt-2 text-gray-700">{label}</span>
        </div>
    );
};
