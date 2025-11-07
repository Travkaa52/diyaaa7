// components/UserDataContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// Данные по умолчанию, которые будут использоваться при первом запуске
const defaultUserData = {
  surname: 'КОРИСТУВАЧ',
  name: 'ГЕНЕРАТИВНИЙ',
  patronymic: 'АНДРІЙОВИЧ',
  dob: '01.01.1990',
  photoUrl: '/user_default_photo.jpg', // Положите заглушку-фото в папку public
};

const UserDataContext = createContext();

// 💡 Хук для быстрого доступа к данным в любом компоненте
export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(defaultUserData);

  // 1. Загрузка данных из Local Storage при первом запуске
  useEffect(() => {
    // Проверяем, есть ли сохраненные данные в браузере пользователя
    const savedData = localStorage.getItem('diiaMockUserData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  // 2. Функция для сохранения данных и обновления Local Storage
  const updateUserData = (newData) => {
    setUserData(prev => {
      const updated = { ...prev, ...newData };
      // Сохраняем новые данные в Local Storage
      localStorage.setItem('diiaMockUserData', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
