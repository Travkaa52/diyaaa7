import React, { useState, useEffect } from "react";
import styles from "./ForeginPassport.module.css";
import MoreInfoIcon from '../../assets/images/dots.png';
import QRIcon from '../../assets/images/qr-code2.png';
import BarcodeIcon from '../../assets/images/barcode.png';
import Barcode from '../../assets/images/code-bar.png';
import { useUserContext } from '../../userContext';

export default function ForeginPassport({ onMoreInfo, isFlipped, onFlip, activeCode, onToggleCode, isEnglish, toggleLanguage }) {
  const { user } = useUserContext();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [timer, setTimer] = useState(180);

  const translations = {
    uk: {
      title: "Закордонний паспорт",
      dobLabel: "Дата народження:",
      numberLabel: "Номер:",
      updatedText: "Документ оновлено о",
      codeValidText: "Код діятиме ще:",
      qrCode: "QR-код",
      barcode: "Штрихкод",
    },
    en: {
      title: "International Passport",
      dobLabel: "Date of Birth:",
      numberLabel: "Document number:",
      updatedText: "Document updated on",
      codeValidText: "The code will expire in:",
      qrCode: "QR-Code",
      barcode: "Barcode",
    },
  };

  const t = isEnglish ? translations.en : translations.uk;

  const convertDriveUrl = (url) => {
    const fileId = url.match(/[-\w]{25,}/);
    const driveUrl = fileId ? `https://lh3.googleusercontent.com/d/${fileId[0]}` : null;
    console.log("Converted Google Drive URL:", driveUrl);
    return driveUrl;
  };

  const photoUrl = user.uInternationalPhoto !== 'none' ? convertDriveUrl(user.uInternationalPhoto) : null;

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
      setTimer(180);
    }

    const timerInterval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`${styles.passport} ${isFlipped ? styles.flipped : ""}`}
      onClick={onFlip}
    >
      <div className={styles["passport-inner"]}>
        <div className={styles["passport-front"]}>
          <div className={styles["passport-container"]}>
            <h2 className={styles["passport-title"]}>{t.title}</h2>
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
                  <p>{t.dobLabel}</p>
                  <span>{user.uDOB}</span>
                </div>
                <div className={styles["passport-details__right-item"]}>
                  <p>{t.numberLabel}</p>
                  <span>{user.uInternationalNumber}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["marque-wrap"]}>
            <div className={styles.marquee}>
              <span style={{fontSize: 12, fontWeight: 400}}>
                • {t.updatedText} {currentTime} | {currentDate} • {t.updatedText} {currentTime} | {currentDate}
              </span>
            </div>
          </div>
          <div className={styles["passport-container"]}>
            <div className={styles["passport-bottom-wrap"]}>
              <div className={styles["passport-bottom-left"]} style={{paddingTop: '0px'}}>
              <span>{isEnglish ? user.uEnglishSurname : user.uSurname}</span>
              <span>{isEnglish ? user.uEnglishName :  user.uName}</span>
                {!isEnglish ? (user.uFather) : ("")}
              </div>
              <div className={styles["passport-bottom-right"]}>
                <img
                  src={MoreInfoIcon}
                  alt="More info"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoreInfo("foreginpassport");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["passport-back"]}>
          <div style={{transform: 'rotateY(180deg)'}}>
            {isEnglish ? (<h2>{t.codeValidText} {formatTime(timer)} min</h2>) : (<h2>{t.codeValidText} {formatTime(timer)}</h2>)}
            <img
              src={
                activeCode === "QR"
                  ? user.uQRUrl !== "none"
                      ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/international/id/${user.uID}`
                      : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/international/id/0`
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
                  e.stopPropagation();
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
                <span>{t.qrCode}</span>
              </div>
              <div
                className={styles['more-info__item-bottom']}
                onClick={(e) => {
                  e.stopPropagation();
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
                <span>{t.barcode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}