import React, {useState, useEffect} from "react";
import styles from "./Weapon.module.css";
import MoreInfoIcon from '../../assets/images/dots.png';
import QRIcon from '../../assets/images/qr-code2.png';
import BarcodeIcon from '../../assets/images/barcode.png';
import Barcode from '../../assets/images/code-bar.png';
import copyIcon from '../../assets/images/copy.png';
import { useUserContext } from '../../userContext';

export default function WeaponDoc({ onMoreInfo, isFlipped, onFlip, activeCode, onToggleCode, onCopy}) {
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
  return (
    <div
      className={`${styles.weapon} ${isFlipped ? styles.flipped : ""}`}
      onClick={onFlip} // Обработчик для смены состояния флипа
    >
      <div className={styles["weapon-inner"]}>
        {/* Передняя сторона */}
        <div className={styles["weapon-front"]}>
          <div className={styles["weapon-container"]}>
            <h2 className={styles["weapon-title"]}>Дозвіл на зберігання і носіння зброї фізичною особою</h2>
            <div className={styles["weapon-details"]}>
            <div className={styles["weapon-details__right-item"]}>
                <p>Зброя:</p>
                <span>{user.uWeaponName}</span>
            </div>
            </div>
          </div>
          <div className={styles["marque-wrap"]}>
            <div className={styles.marquee}>
              <span style={{fontSize: 12, fontWeight: 400}}>• Дозвіл дійсний до {user.uWeaponExpire} • Дозвіл дійсний до {user.uWeaponExpire} • Дозвіл дійсний до {user.uWeaponExpire} </span>
            </div>
          </div>
          <div className={styles["weapon-container"]}>
            <div className={styles["weapon-bottom-wrap"]}>
              <div className={styles["weapon-bottom-left"]} style={{paddingTop: '0px'}}>
                <span>{user.uWeaponNum}</span>
                <img src={copyIcon} alt="copy" onClick={(e) => {
                    e.stopPropagation();
                    onCopy();
                }}/>
              </div>
              <div className={styles["weapon-bottom-right"]}>
                <img
                  src={MoreInfoIcon}
                  alt="More info"
                  onClick={(e) => {
                    e.stopPropagation(); // Останавливаем клик для флипа
                    onMoreInfo("weapon");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Задняя сторона */}
        <div className={styles["weapon-back"]}>
          <div style={{transform: 'rotateY(180deg)'}}>
            <h2>Код діятиме ще: {formatTime(timer)}</h2>
            <img
              src={
                activeCode === "QR"
                ? user.uQRUrl !== "none"
                    ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/weapon/id/${user.uID}`
                    : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/weapon/id/0`
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
  );
}
