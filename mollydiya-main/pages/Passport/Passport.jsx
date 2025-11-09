import React, { useState, useEffect } from "react";
import styles from "./Passport.module.css";
import MoreInfoIcon from '../../assets/images/dots.png';
import QRIcon from '../../assets/images/qr-code2.png';
import BarcodeIcon from '../../assets/images/barcode.png';
import Barcode from '../../assets/images/code-bar.png';
import { useUserContext } from '../../userContext';

export default function Passport({ onMoreInfo, isFlipped, onFlip, activeCode, onToggleCode }) {
  const { user } = useUserContext();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [timer, setTimer] = useState(180); // Таймер (время в секундах, 180 сек = 3 минуты)

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      const formattedDate = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1).toString().padStart(2, "0")}.${now.getFullYear()}`;
      setCurrentTime(formattedTime);
      setCurrentDate(formattedDate);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setTimer(180); // Reset the timer to 3 minutes once it reaches 0
    }

    const timerInterval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup the interval when component is unmounted
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const convertDriveUrl = (url) => {
    const fileId = url.match(/[-\w]{25,}/);
    const driveUrl = fileId ? `https://lh3.googleusercontent.com/d/${fileId[0]}` : null;
    console.log("Converted Google Drive URL:", driveUrl);
    return driveUrl;
  };

  const photoUrl = user.uPhoto !== 'none' ? convertDriveUrl(user.uPhoto) : null;

  return (
    <div className={styles['passport-container']}>
      <div
        className={`${styles.passport} ${isFlipped ? styles.flipped : ""}`}
        onClick={onFlip} // Обработчик для смены состояния флипа
      >
        <div className={styles["passport-inner"]}>
          {/* Передняя сторона */}
          <div className={styles["passport-front"]}>
            <div className={styles["passport-container"]}>
              <h2 className={styles["passport-title"]}>Паспорт громадянина України</h2>
              <div className={styles["passport-details"]}>
                <div className={styles["passport-details__left"]}>
                  <img
                    src={photoUrl}
                    alt="Passport"
                    className={styles["passport-photo"]}
                  />
                </div>
                <div className={styles["passport-details__right"]}>
                  <div className={styles["passport-details__right-item"]}>
                    <p>Дата<br/>народження:</p>
                    <span>{user.uDOB}</span>
                  </div>
                  <div className={styles["passport-details__right-item"]}>
                    <p>Номер:</p>
                    <span>{user.uPassportnumber}</span>
                  </div>
                  <div className={styles["passport-details__right-item"]}>
                    <img
                      src={user.uSignature}
                      alt="Passport signature"
                      className={styles["passport-signature"]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["marque-wrap"]}>
              <div className={styles.marquee}>
                <span style={{fontSize: 12, fontWeight: 400}}>• Документ оновлено о {currentTime} | {currentDate} • Документ оновлено о {currentTime} | {currentDate}</span>
              </div>
            </div>
            <div className={styles["passport-container"]}>
              <div className={styles["passport-bottom-wrap"]}>
                <div className={styles["passport-bottom-left"]} style={{paddingTop: '0px'}}>
                  <span>{user.uSurname}</span>
                  <span>{user.uName}</span>
                  <span>{user.uFather}</span>
                </div>
                <div className={styles["passport-bottom-right"]}>
                  <img
                    src={MoreInfoIcon}
                    alt="More info"
                    onClick={(e) => {
                      e.stopPropagation(); // Останавливаем клик для флипа
                      onMoreInfo("passport");
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Задняя сторона */}
          <div className={styles["passport-back"]}>
            <div style={{transform: 'rotateY(180deg)'}}>
              <h2>Код діятиме ще: {formatTime(timer)}</h2>
              <img
                src={
                  activeCode === "QR"
                    ? user.uQRUrl !== "none"
                        ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/passport/id/${user.uID}`
                        : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/passport/id/0`
                    : Barcode
                }
                style={{ height: activeCode === "Barcode" ? "120px" : "", marginTop: activeCode === "Barcode" ? "70px" : "", marginBottom: activeCode === "Barcode" ? "60px" : "" }}
                alt="QR Code"
                className={styles["qr-code"]}
              />
              <div className={styles['more-info__bottom']}>
                <div
                  className={styles['more-info__item-bottom']}
                  onClick={(e) => {
                    e.stopPropagation(); // Останавливаем клик для флипа
                    onToggleCode('QR');
                  }}
                >
                  <div className={styles['more-info__item-bottom-img']} style={activeCode === "QR" ? {background: "black"} : {background: "#ddd"}}>
                    <img
                      src={QRIcon}
                      alt="QR"
                      className={activeCode === 'QR' ? styles.activeImage : styles.inactiveImage}
                    />
                  </div>
                  <span>QR-код</span>
                </div>
                <div
                  className={styles['more-info__item-bottom']}
                  onClick={(e) => {
                    e.stopPropagation(); // Останавливаем клик для флипа
                    onToggleCode('Barcode');
                  }}
                >
                  <div className={styles['more-info__item-bottom-img']} style={activeCode === "Barcode" ? {background: "black"} : {background: "#ddd"}}>
                    <img
                      src={BarcodeIcon}
                      alt="Barcode"
                      className={activeCode === 'Barcode' ? styles.activeImage : styles.inactiveImage}
                    />
                  </div>
                  <span>Штрихкод</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}