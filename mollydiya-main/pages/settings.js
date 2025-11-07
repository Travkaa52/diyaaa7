// pages/settings.js

import React, { useState } from 'react';
import Link from 'next/link';
import { useUserData } from '../components/UserDataContext';
import { useRouter } from 'next/router';

export default function SettingsPage() {
  const { userData, updateUserData } = useUserData();
  // Инициализируем состояние формы текущими данными
  const [formData, setFormData] = useState(userData);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Данные ФИО сохраняем в верхнем регистре для имитации документа
    setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
  };

  const handleFileChange = (e) => {
    // Для простоты макета: при выборе файла мы просто меняем URL фото.
    // Фактический файл с именем 'my_custom_photo.jpg' пользователь должен положить в /public вручную.
    setFormData(prev => ({ ...prev, photoUrl: '/my_custom_photo.jpg' })); 
    alert("Изображение сохранено. Поместите ваше фото с именем 'my_custom_photo.jpg' в папку /public.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(formData); // Сохраняем данные в контекст и Local Storage
    alert('✅ Данные успешно сохранены!');
    router.push('/documents'); // Переходим на страницу документа для проверки
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#7AC7C0] via-[#B8D7EA] to-[#C5B6E0] pb-24 px-4">
      <div className="pt-20 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Редактирование данных</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl space-y-5">
          
          {/* Поле Фамилия */}
          <div>
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Прізвище</label>
            <input
              type="text"
              name="surname"
              id="surname"
              value={formData.surname}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-[#1C8A8C] focus:border-[#1C8A8C] uppercase"
              required
            />
          </div>

          {/* Поле Имя */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ім’я</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-[#1C8A8C] focus:border-[#1C8A8C] uppercase"
              required
            />
          </div>

          {/* Поле Отчество */}
          <div>
            <label htmlFor="patronymic" className="block text-sm font-medium text-gray-700">По батькові</label>
            <input
              type="text"
              name="patronymic"
              id="patronymic"
              value={formData.patronymic}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-[#1C8A8C] focus:border-[#1C8A8C] uppercase"
            />
          </div>

          {/* Поле Дата рождения */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Дата народження (ДД.ММ.РРРР)</label>
            <input
              type="text"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-[#1C8A8C] focus:border-[#1C8A8C]"
              placeholder="01.01.1990"
            />
          </div>

          {/* Поле Фото */}
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">Фото (Загрузка для макета)</label>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1C8A8C]/10 file:text-[#1C8A8C] hover:file:bg-[#1C8A8C]/20"
            />
            <p className="mt-2 text-xs text-gray-500">
                **Внимание:** фактический файл фото нужно вручную назвать **my_custom_photo.jpg** и положить в папку **public/**.
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1C8A8C] hover:bg-[#156e6f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C8A8C]"
          >
            Зберегти дані
          </button>
        </form>
      </div>
    </main>
  );
}
