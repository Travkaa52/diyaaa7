import React, { useState, useEffect } from "react";
import styles from "./DriveLicence.module.css";
import MoreInfoIcon from '../../assets/images/dots.png';
import QRIcon from '../../assets/images/qr-code2.png';
import BarcodeIcon from '../../assets/images/barcode.png';
import Barcode from '../../assets/images/code-bar.png';
import { useUserContext } from '../../userContext';

export default function DriveLicence({ onMoreInfo, isFlipped, onFlip, activeCode, onToggleCode, isEnglish, toggleLanguage }) {
  const { user } = useUserContext();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [timer, setTimer] = useState(180);

  const translations = {
    uk: {
      title: "Посвідчення водія",
      dobLabel: "Дата народження:",
      categoryLabel: "Категорія:",
      numberLabel: "Номер документа:",
      updatedText: "Документ оновлено о",
      codeValidText: "Код діятиме ще:",
      qrCode: "QR-код",
      barcode: "Штрихкод",
    },
    en: {
      title: "Driving Licence",
      dobLabel: "Date of Birth:",
      categoryLabel: "Category:",
      numberLabel: "Licence number:",
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

  const photoUrl = user.uLicensePhoto !== 'none' ? convertDriveUrl(user.uLicensePhoto) : null;

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
      className={`${styles.licence} ${isFlipped ? styles.flipped : ""}`}
      onClick={onFlip}
    >
      <div className={styles["licence-inner"]}>
        {/* Передняя сторона */}
        <div className={styles["licence-front"]}>
          <div className={styles["licence-container"]}>
            <h2 className={styles["licence-title"]}>{t.title}</h2>
            <div className={styles["licence-details"]}>
              <div className={styles["licence-details__left"]}>
                <img
                  src={photoUrl}
                  alt="licence"
                  className={styles["licence-photo"]}
                />
              </div>
              <div className={styles["licence-details__right"]}>
                <div className={styles["licence-details__right-item"]}>
                  <p>{t.dobLabel}</p>
                  <span>{user.uDOB}</span>
                </div>
                <div className={styles["licence-details__right-item"]}>
                  <p>{t.categoryLabel}</p>
                  <span>{user.uLicenseCategories}</span>
                </div>
                <div className={styles["licence-details__right-item"]}>
                  <p>{t.numberLabel}</p>
                  <span>{user.uLicenseNumber}</span>
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
          <div className={styles["licence-container"]}>
            <div className={styles["licence-bottom-wrap"]}>
              <div className={styles["licence-bottom-left"]} style={{paddingTop: '0px'}}>
              <span>{isEnglish ? user.uEnglishSurname : user.uSurname}</span>
              <span>{isEnglish ? user.uEnglishName :  user.uName}</span>
                {!isEnglish ? (<span>{user.uFather}</span>):("")}
              </div>
              <div className={styles["licence-bottom-right"]}>
                <img
                  src={MoreInfoIcon}
                  alt="More info"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoreInfo("drivelicence");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Задняя сторона */}
        <div className={styles["licence-back"]}>
          <div style={{transform: 'rotateY(180deg)'}}>
          {isEnglish ? (<h2>{t.codeValidText} {formatTime(timer)} min</h2>) : (<h2>{t.codeValidText} {formatTime(timer)}</h2>)}
            <img
              src={
                activeCode === "QR"
                  ? user.uQRUrl !== "none"
                      ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/license/id/${user.uID}`
                      : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/license/id/0`
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