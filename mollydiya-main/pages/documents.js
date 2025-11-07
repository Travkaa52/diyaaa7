// pages/documents.js (Обновленный)

import React, { useState } from 'react';
import Link from 'next/link';
// 💡 Импортируем хук для получения данных (оставим для функциональности)
import { useUserData } from '../components/UserDataContext';
import { useRouter } from 'next/router';
import { ChevronLeft, MoreHorizontal, Lightning, FileText, User, Smartphone, X } from 'lucide-react';

// Компонент, представляющий нижнюю навигационную панель
const BottomNavBar = () => {
    // В реальном приложении нужно использовать Link из next/link
    const NavItem = ({ icon: IconComponent, label, href, isActive }) => (
        <Link 
            href={href} 
            className={`flex flex-col items-center justify-center p-2 w-1/4 transition-colors ${isActive ? 'text-[#00C49F]' : 'text-gray-600'}`}
        >
            <IconComponent className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium leading-none">{label}</span>
        </Link>
    );

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-xl z-50">
            <div className="flex justify-around items-stretch h-full max-w-xl mx-auto">
                {/* Стрічка */}
                <NavItem icon={Smartphone} label="Стрічка" href="/home" isActive={false} />
                {/* Документи (АКТИВНО) */}
                <NavItem icon={FileText} label="Документи" href="/documents" isActive={true} />
                {/* Сервіси */}
                <NavItem icon={Lightning} label="Сервіси" href="/services" isActive={false} />
                {/* Меню */}
                <NavItem icon={User} label="Меню" href="/menu" isActive={false} />
            </div>
        </nav>
    );
};


// Компонент, имитирующий макет ID-карты (Фронт)
// Мы упростим IDCard, чтобы он соответствовал дизайну паспорта на скриншоте
const PassportCard = () => {
    // 💡 Получаем актуальные данные из контекста (предполагаем, что они есть)
    // Если контекста нет, используйте заглушку.
    const hasContext = typeof useUserData !== 'undefined';
    const mockData = {
        name: "Касьян",
        middleName: "Михайло",
        lastName: "Валерійович",
        dob: "11.08.2007",
        number: "013792783",
        updateDate: "05.11.2025 16:47",
        photoUrl: "https://placehold.co/96x128/D1D5DB/1F2937?text=PHOTO" // Заглушка
    };
    const userData = hasContext ? useUserData().userData : mockData;

    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mt-6 mx-auto max-w-md w-full">
            {/* Внутренний контейнер для паспорта */}
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Паспорт громадянина України
                </h2>

                <div className="flex gap-6 items-start">
                    {/* Фотография */}
                    <div className="w-24 h-32 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
                        {/* Имитация фотографии - используем заглушку */}
                        <img
                            src={userData.photoUrl} // Используем данные, если есть
                            alt="Passport photo"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Данные (Дата рождения, Номер) */}
                    <div className="flex-grow pt-1">
                        <p className="text-sm text-gray-500">Дата народження:</p>
                        <p className="text-lg font-medium text-gray-900 mb-4">{userData.dob}</p>

                        <p className="text-sm text-gray-500">Номер:</p>
                        <p className="text-lg font-medium text-gray-900 mb-6">{userData.number}</p>

                        {/* Имитация подписи */}
                        <div className="h-10 w-full">
                            <svg viewBox="0 0 200 50" className="w-24 h-12 stroke-gray-900" fill="none">
                                <path d="M10 40 Q 50 10, 100 20 T 190 30" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Разделитель */}
            <div className="h-[1px] bg-gray-200 mx-6"></div>

            {/* Секция Обновления и ФИО */}
            <div className="p-6 pt-4">
                {/* Дата обновления */}
                <p className="text-xs text-[#00C49F] font-medium mb-4 flex items-center">
                    <span className="h-2 w-2 bg-[#00C49F] rounded-full mr-2"></span>
                    Документ оновлено {mockData.updateDate} • Документ оновлено 
                    {/* Текст на скриншоте повторяется, имитируем это */}
                </p>

                {/* ФИО */}
                <div className="flex justify-between items-end">
                    <div className="text-xl font-semibold leading-snug">
                        <p>{userData.name}</p>
                        <p>{userData.middleName}</p>
                        <p>{userData.lastName}</p>
                    </div>

                    {/* Кнопка "три точки" */}
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <MoreHorizontal className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
            </div>

        </div>
    );
};


// Основной компонент страницы
export default function DocumentsPage() {
    const router = useRouter(); // Оставляем router для потенциальной навигации
    const [isFlipped, setIsFlipped] = useState(false); // Оставляем состояние перелистывания

    // Имитация иконки состояния (Wi-Fi/Сигнал)
    const SignalIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><path d="M16 8V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7l-3 4-2 3h12l-2-3-3-4h7a2 2 0 0 0 2-2V8h-6zM18 10h4M18 14h4"></path></svg>
    );
    
    // Имитация иконки 'Дія' с цифрой 8
    const DiiAStatusIcon = () => (
        <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
                <X className="w-3 h-3 text-white" strokeWidth={3} /> {/* Имитация значка */ }
            </div>
            <span className="text-xs font-semibold text-gray-800">8</span>
        </div>
    );


    return (
        <div className="min-h-screen relative overflow-hidden pb-16">
            {/* Градиентный фон (внешний) - ЦВЕТА СО СКРИНШОТА */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#d9e7d6] via-[#c3e1e5] to-[#b8d7ea] -z-[1]"></div>

            {/* Верхняя строка состояния (имитация) */}
            <div className="flex justify-between items-center px-6 pt-4 text-black text-sm font-sans">
                <span className="font-semibold">16:47 | 1,2 КБ/с</span>
                <div className="flex items-center space-x-2">
                    <SignalIcon />
                    <DiiAStatusIcon />
                </div>
            </div>

            {/* Заголовок страницы (светлый) */}
            <header className="px-4 py-3 flex items-center justify-between">
                {/* Кнопка Назад */}
                <button 
                    onClick={() => router.back()} 
                    className="p-1 rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-head font-medium text-gray-800">
                    Мої документи
                </h1>
                <div className="w-8 h-8"></div> {/* Для центрирования заголовка */}
            </header>

            {/* Контейнер для документа */}
            <div className="px-4">
                <PassportCard />

                {/* Имитация навигационных точек в середине */}
                <div className="flex justify-center mt-6 space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                </div>
            </div>

            {/* Нижнее навигационное меню */}
            <BottomNavBar />
        </div>
    );
}
