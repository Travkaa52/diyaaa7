// components/SplashScreen.js
import React from 'react';
import './SplashScreen.css';
import splashVideo from './assets/videos/Splash.MP4'; // Укажите путь к вашему видео

const SplashScreen = () => (
  <div className="splash-screen">
    <video
      className="splash-video"
      src={splashVideo}
      autoPlay
      loop
      muted
      playsInline
    />
  </div>
);

export default SplashScreen;
