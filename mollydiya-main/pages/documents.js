import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useSwipeable } from 'react-swipeable';

export default function DocumentsPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [updateTime, setUpdateTime] = useState('');

  const documents = [
    {
      title: 'Паспорт громадянина України',
      type: 'passport',
      name: 'Касьян Михайло Валерійович',
      dob: '11.08.2007',
      id: '013792783',
      photo: '/default-avatar.png',
    },
    {
      title: 'Картка платника податків',
      type: 'tax',
      id: '3930478359',
      dob: '11.08.2007',
      name: 'Касьян Михайло Валерійович',
    },
  ];

  useEffect(() => {
    const now = new Date();
    setUpdateTime(
      now.toLocaleString('uk-UA', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
    );
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentCard((prev) => (prev + 1) % documents.length),
    onSwipedRight: () => setCurrentCard((prev) => (prev - 1 + documents.length) % documents.length),
  });

  const doc = documents[currentCard];
  const qrData = JSON.stringify(doc);

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#d7c7ff] via-[#f0eaff] to-[#fff8d7]">
      <div {...handlers} className="mt-24 w-[90%] max-w-sm perspective cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-[420px] transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Лицевая сторона */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-900">{doc.title}</h2>
              {doc.photo && <img src={doc.photo} alt="Фото" className="w-24 h-28 rounded-xl mt-4" />}
              <p className="mt-3 text-sm text-gray-700">{doc.name}</p>
              <p className="text-sm text-gray-700">Дата народження: {doc.dob}</p>
              <p className="text-sm text-gray-700">Номер: {doc.id}</p>
            </div>
            <div className="bg-green-200 text-green-900 text-xs px-4 py-2 font-medium text-center">
              Документ оновлено {updateTime}
            </div>
          </div>

          {/* Зворотна сторона */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border border-gray-200 rotate-y-180 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-sm mb-2">Код діятиме ще 2:59 хв</p>
            <QRCode value={qrData} size={180} />
            <div className="flex justify-around mt-4 w-full text-xs">
              <div className="text-center">
                <div className="w-8 h-8 bg-black rounded-full mx-auto" />
                <p>QR-код</p>
              </div>
              <div className="text-center opacity-50">
                <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto" />
                <p>Штрих-код</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Пагінація */}
      <div className="flex gap-2 mt-4">
        {documents.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === currentCard ? 'bg-black' : 'bg-gray-300'}`} />
        ))}
      </div>
    </main>
  );
}

