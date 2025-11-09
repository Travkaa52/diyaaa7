import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import styles from './userAuth.module.css';
import DeleteIcon from '../../assets/images/delete.png';
import BiometrisIcon from '../../assets/images/biometrics.png';
import FaceIDIcon from '../../assets/images/FaceID.png';
import { useUserContext } from '../../userContext';
import { io } from 'socket.io-client';

export default function UserAuth() {
  const [input, setInput] = useState([]);
  const [shake, setShake] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Программно устанавливаем фокус на поле ввода
    }
  }, []);

  const [uID, setUID] = useState(localStorage.getItem('uID') || '');
  const [userID, setUserID] = useState('');
  const { user, setUserData } = useUserContext();
  const [socket, setSocket] = useState(null);

  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const signatureRef = useRef(null);

  useEffect(() => {
    const socketConnection = io('wss://darkdiya.fun/');
    setSocket(socketConnection);

    socketConnection.on('receive-user-data', (userData) => {
      if (userData.error) {
        console.error(userData.error);
      } else {
        setUserData(userData);
      }
    });

    if (uID) {
      socketConnection.emit('get-user-data', uID);
    }

    return () => {
      socketConnection.disconnect();
    };
  }, [uID, setUserData]);

  const handleSubmitUID = () => {
    if (!userID.trim()) return;
    setUID(userID);
    localStorage.setItem('uID', userID);
  };

  const handleKeyPress = (value) => {
    if (input.length < 4) {
      if (value === 'biometrics') return;
      const newInput = [...input, value];
      setInput(newInput);

      if (user && newInput.join('') === user.uPincode.toString()) {
        if (!isSubscriptionValid(user.uSubscribe)) {
          handleCopyDeviceNumber();
          return;
        }
        navigate('/home', { replace: true });
      } else if (newInput.length === 4) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setInput([]);
      }
    }
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleCopyDeviceNumber = () => {
    setIsMessageVisible(true);
    setTimeout(() => setIsMessageVisible(false), 2500);
  };

  const isSubscriptionValid = (subscribeDate) => {
    const [day, month, year] = subscribeDate.split('.').map(Number);
    const subscriptionDate = new Date(year, month - 1, day);
    return subscriptionDate >= new Date();
  };

  const saveSignature = () => {
    if (signatureRef.current) {
      const signature = signatureRef.current.toDataURL(); // Получаем изображение в формате Base64
      socket.emit('save-signature', { uID, signature }); // Отправляем данные на сервер
    }
  };

  // Обработчик успешного сохранения на сервере:
  useEffect(() => {
    if (socket) {
      socket.on('signature-saved', (response) => {
        if (response.success) {
          console.log('Подпись успешно сохранена');
          window.location.reload(); // Перезагрузка страницы
        } else {
          console.error('Ошибка сохранения подписи:', response.message);
        }
      });
    }
  }, [socket]);

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  // Обработчик для очистки uID и перезагрузки страницы
  const handleClearUID = () => {
    localStorage.removeItem('uID');
    setUID('');
  };

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const buttons = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { 
      label: isIOS 
        ? <img src={FaceIDIcon} alt="Face ID" /> 
        : <img src={BiometrisIcon} alt="Biometrics" />, 
      value: 'biometrics', 
      className: 'biometric' 
    },
    { label: '0', value: '0' },
    { 
      label: <img src={DeleteIcon} alt="Backspace" />, 
      value: 'backspace', 
      className: 'delete' 
    },
  ];

  if (!uID) {
    return (
      <div className={styles['center-container']}>
        <div className={styles['user-id-container']}>
          <h1>Введіть ваш айді користувача</h1>
          <input
            type="text"
            placeholder="Введіть ваш айді коритсувача"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            ref={inputRef}
            autoFocus
          />
          <button onClick={handleSubmitUID}>Підтвердити</button>
        </div>
      </div>
    ); 
  }

  if (user && user.uSignature === 'none') {
    return (
      <div className={styles['signature']}>
        <div className={styles['signature-container']}>
          <h1>Ваш підпис</h1>
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 150,
              height: 150,
              className: styles['signature-pad'],
            }}
            ref={signatureRef}
          />
          <div className={styles['signature-buttons']}>
            <button onClick={saveSignature}>Сохранить</button>
            <button onClick={clearSignature}>Очистить</button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles['load-page']}>
        <h2>Завантаження данних...</h2>
        <button onClick={handleClearUID}>Очистити айді користувача</button>
      </div>
    );
  }

  return (
    <div className={styles.bg}>
      {isMessageVisible && (
        <div className={styles['copy-message']}>
          Ваша підписка не дійсна!
        </div>
      )}
      <h1 className={styles.authTitle}>Код для входу</h1>
      <div className={styles.authWrap}>
        <div className={`${styles.authDotsWrap} ${shake ? styles.shake : ''}`}>
          {Array(4).fill(null).map((_, index) => (
            <div 
              key={index} 
              className={styles.authDot} 
              style={{ 
                backgroundColor: index < input.length ? '#000' : '#fff' 
              }} 
            />
          ))}
        </div>
        <div className={styles.keypad}>
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`${styles['keypadBtn']} ${button.className ? styles[button.className] : ''}`}
              onClick={() => 
                button.value === 'backspace' ? handleBackspace() : handleKeyPress(button.value)
              }
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.Footer}>
        <h2>Не пам'ятаю код для входу</h2>
      </div>
    </div>
  );
}