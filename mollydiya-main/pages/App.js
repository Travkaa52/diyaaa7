import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './SplashScreen'; // Импортируем SplashScreen
import UserAuth from './app/userAuth/userAuth';
import Application from './app/Application/Applicaton';
import PageNotFound from './app/PageNotFound/PageNotFound';
import { UserProvider } from './userContext';
import './App.css';

const App = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Splash screen логика
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const preventLandscape = () => {
      if (window.innerHeight < window.innerWidth) {
        document.body.style.transform = 'rotate(0deg)';
      }
    };

    window.addEventListener('orientationchange', preventLandscape);

    return () => {
      window.removeEventListener('orientationchange', preventLandscape);
      document.body.style.transform = '';
    };
  }, []);

  // Логика обновления высоты
  useEffect(() => {
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateVH();
    window.addEventListener('resize', updateVH);

    return () => {
      window.removeEventListener('resize', updateVH);
    };
  }, []);

  // Логика проверки устройства
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isInWebAppiOS = window.navigator.standalone === true;
    const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;

    if (!isMobile || (!isInWebAppiOS && !isInWebAppChrome)) {
      setIsWorking(false);
    }
  }, []);

  if (!isWorking) {
    return (
      <div
        style={{
          padding: '10vh 2vw',
          textAlign: 'center',
          color: '#000000',
          fontFamily: 'e-UkraineHead-Regular',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <h2>@darkdiya_offical</h2>
        <p>Сайт доступний тільки для мобільних пристроїв.</p>
        <p>Натисніть на три крапки в браузері і додайте цю сторінку на головний екран.</p>
        <h2>@darkdiya_offical</h2>
      </div>
    );
  }

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserAuth />} />
          <Route path="/home" element={<Application />} />
          <Route path="/notfound" element={<PageNotFound />} />
          <Route path="/qr-scanner" element={<div>QR-сканер</div>} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
