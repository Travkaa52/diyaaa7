// pages/documents.js (Оновлений файл: фінальний дизайн за зразком)

import React, { useState, useCallback } from 'react';
// 💡 Припускаємо, що next/link та next/router доступні в реальному Next.js середовищі
// import Link from 'next/link'; 
// import { useRouter } from 'next/router'; 

// --- ІНЛАЙН SVG ІКОНКИ (ДЛЯ СТАТУСУ ТА МЕНЮ) ---

// Іконка "Назад" (ChevronLeft)
const ChevronLeftIcon = ({ className = "w-6 h-6 text-gray-800" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

// Іконка "Меню/Три точки" (MoreHorizontal)
const MoreHorizontalIcon = ({ className = "w-6 h-6 text-gray-600" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="1"/>
        <circle cx="19" cy="12" r="1"/>
        <circle cx="5" cy="12" r="1"/>
    </svg>
);

// Іконки для нижнього меню (як на скріншоті)
const SmartphoneIcon = ({ className = "w-6 h-6 mb-0.5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);
const FileTextIcon = ({ className = "w-6 h-6 mb-0.5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
        <path d="M10 9H8"/>
        <path d="M16 13H8"/>
        <path d="M16 17H8"/>
    </svg>
);
const LightningIcon = ({ className = "w-6 h-6 mb-0.5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4"/>
    </svg>
);
const UserIcon = ({ className = "w-6 h-6 mb-0.5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
);

// Іконка "Крестик" (X) - для імітації значка "Дія" в статусі
const DiiAStatusIcon = () => (
    <div className="flex items-center space-x-1">
        {/* Імітація іконки Дія */}
        <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
        </div>
        <span className="text-xs font-semibold text-gray-800">8</span>
    </div>
);

// Імітація іконки сигналу мобільної мережі
const SignalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
        <path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/>
        <path d="M12 12h.01"/>
        <path d="M16 12h.01"/>
        <path d="M20 12h.01"/>
        <path d="M22 14v4a2 2 0 0 1-2 2h-4"/>
    </svg>
);

// --- КОМПОНЕНТ: Нижня панель навігації ---
const BottomNavBar = ({ activeItem }) => {
    const NavItem = ({ icon: IconComponent, label, href, isActive }) => (
        // В реальному застосунку тут буде Link. Залишаємо заглушку для клікабельності.
        <a
            href={href} 
            className={`flex flex-col items-center justify-center p-2 w-1/4 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}
        >
            <IconComponent className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium leading-none">{label}</span>
        </a>
    );

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1B1B1B] z-50">
            <div className="flex justify-around items-stretch h-full max-w-xl mx-auto">
                <NavItem icon={SmartphoneIcon} label="Стрічка" href="#" isActive={activeItem === 'feed'} />
                <NavItem icon={FileTextIcon} label="Документи" href="#" isActive={activeItem === 'documents'} />
                <NavItem icon={LightningIcon} label="Сервіси" href="#" isActive={activeItem === 'services'} />
                <NavItem icon={UserIcon} label="Меню" href="#" isActive={activeItem === 'menu'} />
            </div>
        </nav>
    );
};


// --- КОМПОНЕНТ: Картка Паспорта ---
const PassportCard = ({ photoUrl, onPhotoUpload }) => {
    // 💡 Використовуємо дані зі скріншота для точності
    const mockData = {
        name: "Касьян",
        middleName: "Михайло",
        lastName: "Валерійович",
        dob: "11.08.2007",
        number: "013792783",
        updateDate: "05.11.2025 16:47",
    };
    
    // URL-адреса для заглушки фото
    const PLACEHOLDER_PHOTO_URL = "https://placehold.co/96x128/D1D5DB/1F2937?text=ФОТО";

    // Використовуємо завантажене фото, якщо воно є, інакше - заглушку
    const finalPhotoUrl = photoUrl || PLACEHOLDER_PHOTO_URL;

    // Текст для імітації "біжучого рядка" / водяного знака
    const watermarkText = "Документ оновлено 05.11.2025 16:47 • Документ оновлено ";


    return (
        <div className="bg-white rounded-3xl shadow-xl mx-auto w-full relative">
            
            {/* Біжучий рядок/Водяний знак */}
            <div className="absolute left-0 right-0 top-[220px] h-6 overflow-hidden z-0">
                <style jsx>{`
                    @keyframes slide {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .watermark {
                        white-space: nowrap;
                        font-size: 13px;
                        color: #00C49F; 
                        position: absolute;
                        animation: slide 10s linear infinite;
                        opacity: 1; /* Згідно з вашим скріншотом, текст видимий */
                        font-weight: 500;
                        padding-top: 2px;
                    }
                `}</style>
                <div className="watermark">
                    {watermarkText} {watermarkText}
                </div>
            </div>

            <div className="p-6 relative z-10">
                {/* Заголовок */}
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Паспорт громадянина України
                </h2>

                <div className="flex gap-6 items-start">
                    {/* Контейнер для Фотографії та кнопки завантаження */}
                    <div className="w-24 h-32 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative">
                        
                        {/* 1. Зображення */}
                        {/* 💡 Якщо фото відсутнє, відображаємо місце для завантаження */}
                        {finalPhotoUrl === PLACEHOLDER_PHOTO_URL ? (
                            <label className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mb-1">
                                    <path d="M12 5v14"/><path d="M5 12h14"/>
                                </svg>
                                <span className="text-xs font-semibold">Завантажити</span>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={onPhotoUpload} 
                                />
                            </label>
                        ) : (
                            <img
                                src={finalPhotoUrl} 
                                alt="Фотографія власника паспорта"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    {/* Дані */}
                    <div className="flex-grow pt-1">
                        <p className="text-sm text-gray-500 leading-snug">Дата народження:</p>
                        <p className="text-lg font-medium text-gray-900 mb-4">{mockData.dob}</p>

                        <p className="text-sm text-gray-500 leading-snug">Номер:</p>
                        <p className="text-lg font-medium text-gray-900 mb-6">{mockData.number}</p>

                        {/* Імітація підпису */}
                        <div className="h-10 w-full">
                            <svg viewBox="0 0 200 50" className="w-20 h-10 stroke-gray-900" fill="none">
                                <path d="M10 40 Q 50 10, 100 20 T 190 30" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Секція ПІБ */}
            <div className="p-6 pt-0 relative z-10">
                
                {/* ПІБ */}
                <div className="flex justify-between items-end">
                    <div className="text-xl font-semibold leading-snug">
                        <p>{mockData.name}</p>
                        <p>{mockData.middleName}</p>
                        <p>{mockData.lastName}</p>
                    </div>

                    {/* Кнопка "три точки" */}
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <MoreHorizontalIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- ОСНОВНИЙ КОМПОНЕНТ СТОРІНКИ ---
const DocumentsPage = () => {
    // 💡 Використовуємо заглушку для useRouter.back(), якщо next/router недоступний
    const router = { back: () => console.log('Simulating router.back()') };
    
    // СТАТУС: для зберігання Data URL завантаженого фото
    const [photoUrl, setPhotoUrl] = useState(''); 

    // Функція для обробки завантаження фото
    const handlePhotoUpload = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Зберігаємо Data URL у стані
                setPhotoUrl(reader.result); 
            };
            // Читаємо файл як Data URL
            reader.readAsDataURL(file);
        }
    }, []);
    

    return (
        <div className="min-h-screen relative overflow-hidden pb-16 font-sans">
            {/* Градієнтний фон, максимально схожий на скріншот */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#d9e7d6] via-[#c3e1e5] to-[#b8d7ea] -z-[1]"></div>
            
            <div className="max-w-md mx-auto">
                {/* Верхня строка стану */}
                <div className="flex justify-between items-center px-4 pt-4 text-black text-sm">
                    <span className="font-semibold">16:47 | 1,2 КБ/с</span>
                    <div className="flex items-center space-x-2">
                        <SignalIcon />
                        <DiiAStatusIcon />
                    </div>
                </div>

                {/* Заголовок сторінки */}
                <header className="px-4 py-3 flex items-center justify-between">
                    <button 
                        onClick={() => router.back()} 
                        className="p-1 rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <h1 className="text-xl font-medium text-gray-800">
                        Мої документи
                    </h1>
                    <div className="w-8 h-8"></div>
                </header>

                {/* Контейнер для документа */}
                <div className="px-4">
                    <PassportCard 
                        photoUrl={photoUrl} 
                        onPhotoUpload={handlePhotoUpload} 
                    />

                    {/* Імітація навігаційних точок (слайдера) */}
                    <div className="flex justify-center mt-6 space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    </div>
                </div>
            </div>

            {/* Нижня панель навігації */}
            <BottomNavBar activeItem="documents" />
        </div>
    );
};

export default DocumentsPage;
