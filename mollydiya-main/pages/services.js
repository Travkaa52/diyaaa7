import React from 'react';
import Link from 'next/link';

// =========================================================================
// 1. КОМПОНЕНТИ ІКОНОК (відновлені з services.js)
// =========================================================================

// Компонент для іконки пошуку
const SearchIcon = (props) => (
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
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// Складна іконка для Військових облігацій / Армії дронів
const BondIcon = () => (
    <svg width="40" height="68" viewBox="0 0 40 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="40" height="68" fill="transparent" />
        <rect x="5" y="5" width="30" height="58" rx="5" fill="#5B6D7A" />
        <path d="M20 15L15 20H25L20 15Z" fill="#FEEA00" />
        <path d="M20 53L15 48H25L20 53Z" fill="#FEEA00" />
        <rect x="10" y="25" width="20" height="5" rx="2.5" fill="white" />
        <rect x="10" y="35" width="20" height="5" rx="2.5" fill="white" />
        <rect x="10" y="45" width="20" height="5" rx="2.5" fill="white" />
    </svg>
);

// Іконка для Податків (Tax Icon)
const TaxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M21 15V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
        <path d="M7 9h.01"/><path d="M7 13h.01"/><path d="M11 9h.01"/><path d="M11 13h.01"/><path d="M15 9h.01"/><path d="M15 13h.01"/>
    </svg>
);

// Іконка для Штрафів (Fine Icon)
const FineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
);

// Іконка для Довідки (Certificate Icon)
const CertificateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="8" y1="13" x2="16" y2="13"/>
        <line x1="8" y1="17" x2="16" y2="17"/>
    </svg>
);

// =========================================================================
// 2. КОМПОНЕНТИ СЕРВІСІВ (створені на основі UI)
// =========================================================================

// Компонент для великої картки сервісу (наприклад, Пенсія, Допомога)
const LargeServiceCard = ({ title, description, href, icon, color }) => (
    <Link href={href} className={`flex flex-col p-5 rounded-2xl ${color} h-40 transition-shadow hover:shadow-lg`}>
        <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-black/10 backdrop-blur-sm">
                {icon}
            </div>
        </div>
        <h3 className="text-white text-xl font-bold mt-auto">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
    </Link>
);

// Компонент для маленької картки сервісу (наприклад, Податки, Штрафи)
const SmallServiceCard = ({ title, href, icon, color }) => (
    <Link href={href} className={`flex flex-col p-4 rounded-xl ${color} h-28 transition-shadow hover:shadow-lg justify-between`}>
        <div className="p-2 rounded-xl bg-black/10 backdrop-blur-sm self-start">
            {icon}
        </div>
        <h3 className="text-white text-lg font-bold mt-auto">{title}</h3>
    </Link>
);


// =========================================================================
// 3. ОСНОВНА СТОРІНКА SERVICES
// =========================================================================

export default function ServicesPage() {
    
    // Дані для карток сервісів
    const largeServices = [
        { 
            title: "Військові облігації", 
            description: "Підтримай економіку та ЗСУ", 
            href: "/bonds", 
            icon: <BondIcon />, 
            color: "bg-[#28385A]", // Темно-синій/сірий
        },
        { 
            title: "Армія дронів", 
            description: "Підтримай армію, стань пілотом", 
            href: "/drones", 
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 21a2 2 0 0 0 2-2v-3h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V4a2 2 0 0 0-2-2z"/><path d="M12 21a2 2 0 0 1-2-2v-3H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2z"/></svg>, 
            color: "bg-[#336699]", // Блакитний
        },
    ];

    const smallServices = [
        { title: "Податки ФОП", href: "/taxes", icon: <TaxIcon />, color: "bg-[#4CAF50]" },
        { title: "Штрафи ПДР", href: "/fines", icon: <FineIcon />, color: "bg-[#FF9800]" },
        { title: "Довідки та витяги", href: "/certificates", icon: <CertificateIcon />, color: "bg-[#03A9F4]" },
    ];


    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#e3eaff] to-[#e8ebf7]">
            <header className="pt-14 pb-4 px-4 max-w-md mx-auto w-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Сервіси</h1>
                
                {/* Рядок пошуку */}
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Пошук сервісів"
                        className="w-full h-12 pl-12 pr-4 bg-white rounded-full shadow-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <SearchIcon width="20" height="20" />
                    </div>
                </div>
            </header>

            <main className="flex-1 px-4 pb-[120px] max-w-md mx-auto w-full">
                {/* 1. Великі картки / Топові сервіси */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Популярне</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {largeServices.map((service, index) => (
                            <LargeServiceCard key={index} {...service} />
                        ))}
                    </div>
                </section>

                {/* 2. Маленькі картки / Взаємодія з державою */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Взаємодія з державою</h2>
                    <div className="grid grid-cols-3 gap-3">
                        {smallServices.map((service, index) => (
                            <SmallServiceCard key={index} {...service} />
                        ))}
                        <Link 
                            href="/more-services" 
                            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-200 h-28 hover:bg-gray-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 mb-1"><path d="M12 5v14M5 12h14"/></svg>
                            <span className="text-sm font-bold text-gray-700">Більше</span>
                        </Link>
                    </div>
                </section>

                {/* 3. Інші розділи (заглушка) */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Сім'я та діти</h2>
                    <div className="p-4 bg-white rounded-xl shadow-sm text-gray-600">
                        Список сервісів: "єМалятко", "Допомога при народженні".
                    </div>
                </section>
            </main>

            {/* Нижня навігація */}
            <nav className="fixed bottom-0 left-0 right-0 z-10 bg-black text-white h-[80px] pb-4 flex justify-around items-center text-[10px]">
                <Link
                    href="/home"
                    className="flex flex-col items-center gap-1 opacity-60 w-1/4"
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
                        className="lucide lucide-align-left text-white"
                    >
                        <path d="M15 12H3"></path>
                        <path d="M17 18H3"></path>
                        <path d="M21 6H3"></path>
                    </svg>
                    <span>Стрічка</span>
                </Link>

                <Link href="/documents" className="flex flex-col items-center gap-1 opacity-60 w-1/4">
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
                        className="lucide lucide-file-text text-white"
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
                    className="flex flex-col items-center gap-1 w-1/4" // Активний стан
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
                        className="lucide lucide-zap text-white"
                    >
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                    </svg>
                    <span>Сервіси</span>
                </Link>

                <Link
                    href="/menu"
                    className="flex flex-col items-center gap-1 opacity-60 w-1/4"
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
                        className="lucide lucide-user text-white"
                    >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Меню</span>
                </Link>
            </nav>
        </div>
    );
}
