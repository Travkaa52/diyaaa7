import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { useUserData } from '../components/UserDataContext';

export default function DocumentsPage() {
  const { userData } = useUserData();
  const [updateTime, setUpdateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setUpdateTime(formatted);
  }, []);

  const qrData = JSON.stringify({
    surname: userData?.surname,
    name: userData?.name,
    patronymic: userData?.patronymic,
    dob: userData?.dob,
    id: userData?.idNumber || '013792783',
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d7c7ff] via-[#f0eaff] to-[#fff8d7] pb-20 flex flex-col items-center">
      <div className="mt-20 w-[90%] max-w-sm">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          {/* Верхняя часть с заголовком */}
          <div className="p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Паспорт громадянина України
            </h2>
            <div className="flex mt-4 gap-4">
              {/* Фото */}
              <img
                src={userData?.photoUrl || '/default-avatar.png'}
                alt="User Photo"
                className="w-24 h-28 object-cover rounded-xl border border-gray-300"
              />

              {/* Данные */}
              <div className="flex flex-col justify-between text-sm">
                <p>
                  <span className="font-medium text-gray-700">Дата народження:</span><br />
                  {userData?.dob || '11.08.2007'}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Номер:</span><br />
                  {userData?.idNumber || '013792783'}
                </p>
                {/* Подпись */}
                <div className="mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 50"
                    className="w-16 h-10 text-gray-600"
                  >
                    <path
                      d="M10 35 Q 40 10, 70 35 T 90 35"
                      stroke="black"
                      strokeWidth="2"
                      fill="transparent"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Зелёная полоса обновления */}
          <div className="bg-green-200 text-green-900 text-xs px-4 py-2 font-medium flex items-center justify-center">
            Документ оновлено {updateTime}
          </div>

          {/* Нижняя часть — имя и QR-код */}
          <div className="p-5 flex justify-between items-center">
            <div>
              <p className="font-bold text-lg text-gray-900 leading-tight">
                {userData?.surname || 'Касьян'}<br />
                {userData?.name || 'Михайло'}<br />
                {userData?.patronymic || 'Валерійович'}
              </p>
            </div>
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
              <QRCode value={qrData} size={48} fgColor="#000000" bgColor="#ffffff" />
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-black text-white h-[80px] pb-4 flex justify-around items-center text-[10px]">
        <Link href="/home" className="flex flex-col items-center gap-1 opacity-60">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-left"><path d="M15 12H3"></path><path d="M17 18H3"></path><path d="M21 6H3"></path></svg>
          <span>Стрічка</span>
        </Link>

        <Link href="/documents" className="flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
          <span>Документи</span>
        </Link>

        <Link href="/services" className="flex flex-col items-center gap-1 opacity-60">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
          <span>Сервіси</span>
        </Link>

        <Link href="/menu" className="flex flex-col items-center gap-1 opacity-60">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Меню</span>
        </Link>
      </nav>
    </main>
  );
}
