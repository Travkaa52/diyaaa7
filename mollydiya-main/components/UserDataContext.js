import React, { createContext, useContext, useState } from 'react';

// 1. Создаем контекст для данных пользователя
const UserDataContext = createContext(null);

// Моковые данные, имитирующие профиль пользователя Дія
const MOCK_USER_DATA = {
  name: "Петро",
  surname: "Іваненко",
  patronymic: "Олександрович",
  phone: "+380 97 123 45 67",
  email: "petro.ivanenko@diiatest.com",
  documents: [
    { type: "ID-картка", number: "123456789", issued: "2020-01-01" },
    { type: "Водійське посвідчення", number: "ABC987654", issued: "2018-05-15" }
  ],
};

/**
 * Провайдер, который оборачивает приложение и предоставляет доступ к данным пользователя.
 */
export const UserDataProvider = ({ children }) => {
  // Используем useState для хранения и обновления данных
  const [userData, setUserData] = useState(MOCK_USER_DATA);

  // Функция для обновления данных (если понадобится в будущем)
  const updateUserData = (newData) => {
    setUserData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

/**
 * Хук для удобного доступа к данным пользователя в компонентах.
 */
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === null) {
    // Эта ошибка срабатывает, если хук вызван вне провайдера
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
