import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useUserData } from '../components/UserDataContext';
import { useRouter } from 'next/router';

// Іконка "стрілка назад" (Lucide: ArrowLeft)
const ArrowLeft = (props) => (
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
    className="lucide lucide-arrow-left"
    {...props}
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export default function EditDataPage() {
  const router = useRouter();
  const { userData, updateUserData } = useUserData();
  // Використовуємо локальний стан для форм
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Оновлюємо глобальний контекст
    updateUserData(formData);
    // Імітуємо перехід назад до меню
    alert('Дані успішно оновлено!');
    router.push('/menu');
  };

  return (
    <>
      <Head>
        <title>Редагувати дані | Дія</title>
      </Head>

      <main className="min-h-[100dvh] bg-white p-5">
        
        {/* Хедер */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.push('/menu')} className="text-gray-600 active:text-gray-800 p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Редагувати дані</h1>
          <div className="w-10"></div> {/* Заглушка для центрування */}
        </div>

        {/* Форма редагування */}
        <div className="space-y-6">
          
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <label htmlFor="name" className="text-xs font-medium text-gray-500 block mb-1">Ім'я</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-lg font-medium bg-transparent focus:outline-none"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <label htmlFor="surname" className="text-xs font-medium text-gray-500 block mb-1">Прізвище</label>
            <input
              id="surname"
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full text-lg font-medium bg-transparent focus:outline-none"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <label htmlFor="patronymic" className="text-xs font-medium text-gray-500 block mb-1">По батькові</label>
            <input
              id="patronymic"
              type="text"
              name="patronymic"
              value={formData.patronymic}
              onChange={handleChange}
              className="w-full text-lg font-medium bg-transparent focus:outline-none"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <label htmlFor="phone" className="text-xs font-medium text-gray-500 block mb-1">Телефон</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full text-lg font-medium bg-transparent focus:outline-none"
            />
          </div>
          
          {/* Кнопка Зберегти */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg active:bg-blue-700 transition duration-150 mt-8"
          >
            Зберегти зміни
          </button>
        </div>

      </main>
    </>
  );
}
