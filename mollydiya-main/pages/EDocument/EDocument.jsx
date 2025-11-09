import React from "react";
import styles from "./EDocument.module.css";
import MoreInfoIcon from '../../assets/images/dots.png';
import { useUserContext } from '../../userContext';

export default function EDocument({ onMoreInfo, isFlipped, onFlip }) {
  const { user } = useUserContext();
  const convertDriveUrl = (url) => {
    const fileId = url.match(/[-\w]{25,}/);
    const driveUrl = fileId ? `https://lh3.googleusercontent.com/d/${fileId[0]}` : null;
    console.log("Converted Google Drive URL:", driveUrl);
    return driveUrl;
};

const photoUrl = user.uPhoto !== 'none' ? convertDriveUrl(user.uPhoto) : null;
  return (
    <div
      className={`${styles.edoc} ${isFlipped ? styles.flipped : ""}`}
      onClick={onFlip} // Обработчик для смены состояния флипа
    >
      <div className={styles["edoc-inner"]}>
        {/* Передняя сторона */}
        <div className={styles["edoc-front"]}>
          <div className={styles["edoc-container"]}>
            <h2 className={styles["edoc-title"]}>єДокумент</h2>
            <div className={styles["edoc-details"]}>
              <div className={styles["edoc-details__left"]}>
                <img
                  src={photoUrl}
                  alt="edoc"
                  className={styles["edoc-photo"]}
                />
              </div>
              <div className={styles["edoc-details__right"]}>
                <div className={styles["edoc-details__right-item"]}>
                  <p>Дата<br/>народження:</p>
                  <span>{user.uDOB}</span>
                </div>
                <div className={styles["edoc-details__right-item"]}>
                  <p>РНОКПП:</p>
                  <span>{user.uTaxnum}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["marque-wrap"]}>
            <div className={styles.marquee}>
              <span style={{fontSize: 12, fontWeight: 400}}>Документ діє під час воєнного стану. Ой у лузі
                            червона калина похилилася, чогось наша славна
                            Україна зажурилася. А ми тую червону калину
                            підіймемо, а ми нашу славну Україну, гей, гей,
                            розвеселимо!</span>
            </div>
          </div>
          <div className={styles["edoc-container"]}>
            <div className={styles["edoc-bottom-wrap"]}>
              <div className={styles["edoc-bottom-left"]} style={{paddingTop: '0px'}}>
                <span>{user.uSurname}</span>
                <span>{user.uName}</span>
                <span>{user.uFather}</span>
              </div>
              <div className={styles["edoc-bottom-right"]}>
                <img
                  src={MoreInfoIcon}
                  alt="More info"
                  onClick={(e) => {
                    e.stopPropagation(); // Останавливаем клик для флипа
                    onMoreInfo("eDocument");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Задняя сторона */}
        <div className={styles["edoc-back"]}>
          <div style={{transform: 'rotateY(180deg)'}} className={styles['qr-back']}>
            <img src={user.uQRUrl !== "none" ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/edoc/id/${user.uID}`: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/edoc/id/0`}
              alt="QR Code"
              className={styles["qr-code"]}
            />
            </div>
        </div>
      </div>
    </div>
  );
}
