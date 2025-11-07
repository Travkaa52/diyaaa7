import React, { useState } from 'react'; // 1. Импортируем useState
import { useRouter } from 'next/router';   // 2. Импортируем useRouter

// Компонент для иконки удаления (Backspace/X)
const XIcon = (props) => (
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
    className="lucide lucide-x w-6 h-6"
    {...props}
  >
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);


export default function Home() {
  // 3. Создаем состояние для хранения введенного PIN-кода (до 4 цифр)
  const [pin, setPin] = useState(''); 
  const router = useRouter(); 
  
  // 4. Функция для обработки нажатия на цифры
  const handlePinInput = (number) => {
    if (pin.length < 4) {
      const newPin = pin + number;
      setPin(newPin); // Обновляем состояние

      // Проверяем, если PIN-код стал длиной 4, переходим на /home
      if (newPin.length === 4) {
        // Устанавливаем небольшую задержку для визуального подтверждения ввода
        setTimeout(() => {
          // Замените "/home" на реальный путь, если он отличается (например, на "/mollydiya/home")
          router.push('/home'); 
        }, 300); 
      }
    }
  };

  // 5. Функция для удаления последней введенной цифры
  const handlePinDelete = () => {
    setPin(pin.slice(0, -1));
  };
  
  // Создаем массив для 4 точек-индикаторов
  const indicators = [0, 1, 2, 3];


  return (
    <main className="min-h-screen flex flex-col items-center relative before:bg-gradient-to-b before:from-[#B8D7EA] before:via-[#C3E1E5] before:to-[#D9E7D6] before:fixed before:inset-0 before:-z-[1] px-6 pt-20">
      <h1 className="text-2xl font-medium mb-12">Код для входу</h1>
      
      {/* 6. Динамические индикаторы PIN-кода */}
      <div className="flex gap-3 mb-12">
        {indicators.map((_, index) => (
          <div 
            key={index}
            className={`w-3 h-3 rounded-full ${
              pin.length > index ? 'bg-black' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
      
      {/* 7. Цифровая клавиатура */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-xs">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button 
            key={number}
            // Добавляем обработчик события
            onClick={() => handlePinInput(String(number))} 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground px-4 py-2 w-16 h-16 rounded-full bg-white/80 hover:bg-white/90 text-2xl"
          >
            {number}
          </button>
        ))}
        
        <div className="col-start-2">
          <button 
            // Добавляем обработчик для '0'
            onClick={() => handlePinInput('0')} 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground px-4 py-2 w-16 h-16 rounded-full bg-white/80 hover:bg-white/90 text-2xl"
          >
            0
          </button>
        </div>
        
        <div className="col-start-3">
          <button 
            // Добавляем обработчик для удаления
            onClick={handlePinDelete} 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground px-4 py-2 w-16 h-16 rounded-full bg-white/80 hover:bg-white/90"
          >
            <XIcon />
          </button>
        </div>
      </div>
      
      <button 
        onClick={() => alert("Any passcode will work!")} 
        className="mt-auto mb-8 text-gray-600 hover:text-gray-800"
      >
        Не пам'ятаю код для входу
      </button>
    </main>
  );
}