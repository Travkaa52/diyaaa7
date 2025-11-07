import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import Head from 'next/head';

// Импорт стилей react-slick (предполагается, что они добавлены в styles/globals.css)
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// -----------------------------------------------------------------------------
// Вспомогательные компоненты
// -----------------------------------------------------------------------------

/**
 * Имитация верхней панели состояния телефона
 */
const StatusBar = () => (
  <div className="w-full h-8 flex justify-between items-center px-4 pt-1 text-white font-medium text-xs">
    <div className="flex items-center space-x-1">
      {/* Имитация иконки оператора */}
      <span className="text-sm">Kyivstar</span>
    </div>
    {/* Время */}
    <div className="text-sm">18:50</div>
    {/* Имитация индикаторов сети/батареи */}
    <div className="flex items-center space-x-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 2a10 10 0 0 0-9.84 8.215L12 22 21.84 10.215A10 10 0 0 0 12 2Z"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M7 6V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"></path><path d="M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6"></path><path d="M11 10h2"></path><path d="M11 14h2"></path></svg>
    </div>
  </div>
);

/**
 * Бегущая строка (Marquee)
 */
const MarqueeText = ({ text, color, bgColor }) => (
  <div className={`absolute bottom-0 left-0 right-0 h-8 ${bgColor} overflow-hidden`}>
    <div className={`whitespace-nowrap w-full ${color} text-sm font-semibold`} style={{ animation: 'marquee 10s linear infinite' }}>
      <span className="inline-block p-1">
        {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp;
      </span>
      <span className="inline-block p-1">
        {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp;
      </span>
    </div>

    <style jsx global>{`
      @keyframes marquee {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-50%, 0, 0); }
      }
    `}</style>
  </div>
);

// -----------------------------------------------------------------------------
// Компонент: ЄДокумент (Скриншот 1)
// -----------------------------------------------------------------------------

const EdocumentCard = ({ userPhotoUrl }) => {
  const [photo, setPhoto] = useState(userPhotoUrl);

  const handlePhotoUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const name = "ІВАН ПЕТРЕНКО ІВАНОВИЧ";
  const birthDate = "15.06.1985";
  const taxId = "1234567890";

  return (
    <div className="w-[90vw] h-[65vh] mx-auto rounded-3xl relative overflow-hidden shadow-2xl bg-[#0057b7]">
      {/* Фон-градиент - синий/желтый */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0057b7] to-[#ffd700] opacity-80" />

      {/* Голова документа */}
      <div className="relative p-6 z-10 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="text-white">
            <h1 className="text-xl font-bold">ЄДокумент</h1>
            <p className="text-sm opacity-80 mt-1">
              Діє на території України.
            </p>
          </div>
          {/* Имитация иконки QR-кода */}
          <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-5 h-5"><rect width="8" height="8" x="2" y="2" rx="1" /><rect width="8" height="8" x="14" y="2" rx="1" /><rect width="8" height="8" x="2" y="14" rx="1" /><path d="M14 10h.01" /><path d="M18 10h.01" /><path d="M14 14h.01" /><path d="M18 14h.01" /><path d="M16 16h.01" /><path d="M16 18h.01" /><path d="M16 20h.01" /><path d="M20 16h.01" /><path d="M20 20h.01" /></svg>
          </div>
        </div>

        {/* Основная информация */}
        <div className="flex-grow flex flex-col justify-between">
            <div className="text-white">
                <p className="text-2xl font-extrabold leading-snug">{name}</p>
            </div>

            <div className="flex justify-between items-end mt-4">
                {/* Левая часть: Данные */}
                <div className="space-y-3">
                    <div>
                        <p className="text-xs opacity-70">Дата народження</p>
                        <p className="text-lg font-bold">{birthDate}</p>
                    </div>
                    <div>
                        <p className="text-xs opacity-70">РНОКПП</p>
                        <p className="text-lg font-bold">{taxId}</p>
                    </div>
                </div>

                {/* Правая часть: Фото */}
                <div className="relative w-24 h-32 bg-white/20 rounded-lg border-2 border-white/50 overflow-hidden">
                    {photo ? (
                        <img src={photo} alt="User Photo" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-white text-xs text-center p-2">
                           Завантажити фото 
                        </div>
                    )}
                    {/* Кнопка загрузки фото */}
                    <input
                      type="file"
                      id="photo-upload-e"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      aria-label="Завантажити фото"
                    />
                </div>
            </div>
        </div>
      </div>

      {/* Бегущая строка (внизу) */}
      <MarqueeText 
        text="А ми тую червону калину підіймемо, а ми нашу славну Україну, гей-гей, розвеселимо..." 
        color="text-white" 
        bgColor="bg-black/30" 
      />
    </div>
  );
};

// -----------------------------------------------------------------------------
// Компонент: Картка платника податків (Скриншот 2 и 3)
// -----------------------------------------------------------------------------

const TaxpayerCard = () => {
    const name = "ІВАН ПЕТРЕНКО ІВАНОВИЧ";
    const birthDate = "15.06.1985";
    const taxId = "1234567890";
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        // Имитация копирования в буфер обмена
        navigator.clipboard.writeText(taxId).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error('Не удалось скопировать текст: ', err);
            // Добавим fallback, если clipboard API недоступен
            const tempInput = document.createElement('textarea');
            tempInput.value = taxId;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };


    return (
        <div className="w-[90vw] h-[65vh] mx-auto rounded-3xl relative overflow-hidden shadow-2xl bg-white">
            {/* Фон - легкий серый градиент, как на скриншоте */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f0f0] to-[#e6e6e6]" />

            <div className="relative p-6 z-10 flex flex-col justify-between h-full">
                {/* Голова документа */}
                <div className="flex justify-between items-start mb-4">
                    <div className="text-gray-800">
                        <h1 className="text-xl font-bold">Картка платника податків</h1>
                        <p className="text-sm opacity-80 mt-1">
                            Електронний аналог документа.
                        </p>
                    </div>
                    {/* Имитация иконки QR-кода */}
                    <div className="w-10 h-10 bg-gray-200/50 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 w-5 h-5"><rect width="8" height="8" x="2" y="2" rx="1" /><rect width="8" height="8" x="14" y="2" rx="1" /><rect width="8" height="8" x="2" y="14" rx="1" /><path d="M14 10h.01" /><path d="M18 10h.01" /><path d="M14 14h.01" /><path d="M18 14h.01" /><path d="M16 16h.01" /><path d="M16 18h.01" /><path d="M16 20h.01" /><path d="M20 16h.01" /><path d="M20 20h.01" /></svg>
                    </div>
                </div>

                {/* Основная информация */}
                <div className="flex-grow flex flex-col justify-center text-gray-800 space-y-6">
                    <div>
                        <p className="text-xs opacity-70">РНОКПП (ІПН)</p>
                        <div className="flex items-center space-x-2">
                            <p className="text-3xl font-extrabold leading-snug tracking-wider">{taxId}</p>
                            <button 
                                onClick={handleCopy}
                                className="p-1 rounded-full hover:bg-gray-200 transition duration-150"
                                aria-label="Копировать РНОКПП"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 w-4 h-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                            </button>
                        </div>
                        {isCopied && <span className="text-xs text-green-600">Скопійовано!</span>}
                    </div>

                    <hr className="border-gray-300/50" />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs opacity-70">Прізвище, Ім'я, По батькові</p>
                            <p className="text-base font-medium">{name}</p>
                        </div>
                        <div>
                            <p className="text-xs opacity-70">Дата народження</p>
                            <p className="text-base font-medium">{birthDate}</p>
                        </div>
                    </div>
                </div>

                {/* Надпись "ДІЯ" внизу (имитация) */}
                <div className="text-right text-4xl font-black text-gray-300 opacity-20">ДІЯ</div>
            </div>

            {/* Бегущая строка (внизу) - цвет как на скриншоте 2/3 */}
            <MarqueeText 
                text="РНОКПП дійсний. Перевірено державною службою. Перевірено державною службою." 
                color="text-gray-800" 
                bgColor="bg-[#a8e063]/70" // Светло-зеленый/лаймовый
            />
        </div>
    );
};

// -----------------------------------------------------------------------------
// Основная страница с каруселью
// -----------------------------------------------------------------------------

const DocumentsPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const userPhotoUrl = "https://placehold.co/150x200/185077/ffffff?text=Ваше+Фото";

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    swipeToSlide: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    appendDots: dots => (
      <div
        style={{
          bottom: '10px',
          padding: '10px',
        }}
      >
        <ul className="flex justify-center space-x-1"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/40'} transition-all duration-300`}
      ></div>
    )
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <Head>
        <title>Документи | Дія Клон</title>
      </Head>

      {/* Верхняя панель состояния */}
      <StatusBar />

      {/* Основной контент */}
      <main className="flex-grow pt-4 pb-20 overflow-hidden">
        {/* Заголовок */}
        <div className="px-4 mb-8">
          <h1 className="text-white text-3xl font-bold">Документи</h1>
        </div>

        {/* Слайдер Документов */}
        <div className="w-full">
          <Slider {...sliderSettings}>
            <div className="px-1 py-4">
              <EdocumentCard userPhotoUrl={userPhotoUrl} />
            </div>
            <div className="px-1 py-4">
              <TaxpayerCard />
            </div>
          </Slider>
        </div>
      </main>

      {/* Нижнее меню (Меню Навигации) - Точное повторение цветов и градиента */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#1e1e1e] shadow-[0_-5px_15px_rgba(0,0,0,0.5)] z-20">
        {/* Имитация разделителя/тени сверху */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="flex justify-around items-center h-full px-4 text-white text-xs">
          
          {/* Стрічка */}
          <Link href="#" className="flex flex-col items-center gap-1 w-1/4 opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss w-6 h-6"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
            <span>Стрічка</span>
          </Link>
          
          {/* Документи (Активна) */}
          <div className="flex flex-col items-center gap-1 w-1/4">
            {/* Яркий голубой цвет для активной иконки */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-6 h-6"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
            <span className="text-[#00BFFF] font-medium">Документи</span>
          </div>

          {/* Послуги */}
          <Link href="#" className="flex flex-col items-center gap-1 w-1/4 opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-6 h-6"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4Z"/></svg>
            <span>Послуги</span>
          </Link>

          {/* Меню */}
          <Link href="#" className="flex flex-col items-center gap-1 w-1/4 opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu w-6 h-6"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <span>Меню</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default DocumentsPage
