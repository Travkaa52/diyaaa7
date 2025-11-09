import React, { useState, useEffect } from "react";
import styles from './FullInfo.module.css';

import CopyIcon from '../../assets/images/copy.png';
import QRIcon from '../../assets/images/qr-code2.png';
import BarcodeIcon from '../../assets/images/barcode.png';
import Barcode from '../../assets/images/code-bar.png';
import { useUserContext } from '../../userContext';

export default function FullInfo({ documentType, onClose }) {
    function fomatedRecord(dob) {
        const [day, month, year] = dob.split('.').map(Number);
        const formattedDate = `${year}${('0' + month).slice(-2)}${('0' + day).slice(-2)}`;
        const formattedDayMonth = `${('0' + month).slice(-2)}${('0' + day).slice(-2)}`;
        return `${formattedDate}-${formattedDayMonth}0`;
      }
    function calculateYears(dob, type) {
        if (!dob) {
          return '';
        }
        const [day, month, year] = dob.split('.').map(Number);
        const birthDate = new Date(year, month - 1, day); 
      
        if (type === 1) {
          birthDate.setFullYear(birthDate.getFullYear() + 18);
          birthDate.setDate(birthDate.getDate() + 15);
        } else if (type === 2) {
          birthDate.setFullYear(birthDate.getFullYear() + 18 + 10);
          birthDate.setDate(birthDate.getDate() + 15);
        } else if (type === 3) {
          birthDate.setFullYear(birthDate.getFullYear() + 10);
          birthDate.setDate(birthDate.getDate());
        }
        
        const formattedDate = [
          ('0' + birthDate.getDate()).slice(-2),
          ('0' + (birthDate.getMonth() + 1)).slice(-2),
          birthDate.getFullYear()
        ].join('.');
      
        return formattedDate;
      }
    const { user } = useUserContext();
    const convertDriveUrl = (url) => {
        const fileId = url.match(/[-\w]{25,}/);
        const driveUrl = fileId ? `https://lh3.googleusercontent.com/d/${fileId[0]}` : null;
        console.log("Converted Google Drive URL:", driveUrl);
        return driveUrl;
    };
    
    const photoUrlPassport = user.uPhoto !== 'none' ? convertDriveUrl(user.uPhoto) : null;
    const photoUrlDrive = user.uLicensePhoto !== 'none' ? convertDriveUrl(user.uLicensePhoto) : null;
    const photoUrlInternational = user.uInternationalPhoto !== 'none' ? convertDriveUrl(user.uInternationalPhoto) : null;
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    const handleCopyDeviceNumber = () => {
        setIsMessageVisible(true);
        setTimeout(() => setIsMessageVisible(false), 2500); // скрытие через 2 секунды
    };
    const [activeCode, setActiveCode] = useState('QR');
    const [timer, setTimer] = useState(180);
    const [startY, setStartY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragAmount, setDragAmount] = useState(0);
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    
    useEffect(() => {
        const updateDateTime = () => {
        const now = new Date();
        setCurrentTime(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`);
        setCurrentDate(`${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1).toString().padStart(2, "0")}.${now.getFullYear()}`);
        };
        updateDateTime();
        const intervalId = setInterval(updateDateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);
    
    const handleHeaderTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
    };
    
    const handleHeaderTouchMove = (e) => {
        const diff = e.touches[0].clientY - startY;
        if (diff > 0) {
            setDragAmount(diff);
            if (diff > 50) {
                setIsDragging(true);
            }
        }
    };
    
    const handleHeaderTouchEnd = () => {
        if (isDragging && dragAmount > 100) {
            // Анимация скрытия
            document.querySelector(`.${styles['full-info']}`).classList.add(styles['closing']);
            setTimeout(() => {
                setDragAmount(0);
                onClose();
            }, 300); // Время анимации
        } else {
            setDragAmount(0);
        }
        setIsDragging(false);
    };
    
        
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
    <div className={`${styles['full-info-overlay']} ${styles.show}`} onClick={onClose}>
        {isMessageVisible && (
                <div className={styles['copy-message']}>
                    Номер скопійовано!
                </div>
            )}
      <div
        className={styles['full-info']}
        style={{ transform: `translateY(${dragAmount}px)` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles['full-info__header']}
            onTouchStart={handleHeaderTouchStart}
            onTouchMove={handleHeaderTouchMove}
            onTouchEnd={handleHeaderTouchEnd}
        ></div>
        <div className={styles['full-info-wrap']}>
          {documentType === 'passport' && (
            <div className={styles['full-info-content']}>
                <div className={styles['full-info-container']}>
                    <h2 className={styles['full-info__header-title']}>Паспорт громадянина України</h2>
                    <div className={styles['passport_number']}>
                        <span>{user.uPassportnumber}</span>
                        <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}/>
                    </div>
                </div>
                <div className={styles["marque-wrap"]}>
                    <div className={styles.marquee}>
                        <span style={{fontSize: 7}}>• Документ оновлено о {currentTime} | {currentDate} • Документ оновлено о {currentTime} | {currentDate} • Документ оновлено о {currentTime} | {currentDate}</span>
                    </div>
                </div>
                <div className={styles['full-info-container']}>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info-container__name']}>
                            <span className={styles['full-info-container-name']}>{user.uSurname} {user.uName}</span>
                            <span className={styles['full-info-container-name']}>{user.uFather}</span>
                        </div>
                        <span className={styles['full-info-container-name-eng']}>{user.uEnglishSurname} {user.uEnglishName}</span>
                        <div className={styles['passport-details__wrap']}>
                            <div className={styles['passport-details__wrap-left']}>
                                <img src={photoUrlPassport} alt="photo"/>
                            </div>
                            <div className={styles['passport-details__wrap-right']}>
                                <p className={styles['passport-details__wrap-right-item']}>Дата<br />народження:</p>
                                <p className={styles['passport-details__wrap-right-item__eng']}>Date of birth:</p>
                                <p className={styles['passport-details__wrap-right-item']}>{user.uDOB}</p>
                                <img src={user.uSignature} alt="signature"/>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                        <div className={styles['full-info__item']}>
                            <div className={styles['full-info__item-left']}>
                                <span>Стать:</span>
                                <span className={styles['english']}>Sex</span>
                            </div>
                            <div className={styles['full-info__item-right']}>
                                <span>{user.uSex}</span>
                                <span className={styles['english']}>{user.uSex === 'Ч' ? 'M' : 'F'}</span>
                            </div>
                        </div>
                        <div className={styles['full-info__item']}>
                            <div className={styles['full-info__item-left']}>
                                <span>Громадянство:</span>
                                <span className={styles['english']}>Nationality</span>
                            </div>
                            <div className={styles['full-info__item-right']}>
                                <span>Україна</span>
                                <span className={styles['english']}>Ukraine</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Дата видачі:</span>
                                    <span className={styles['english']}>Date of issue</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{calculateYears(user.uDOB, 1)}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Дійсний до:</span>
                                    <span className={styles['english']}>Date of expiry</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{calculateYears(user.uDOB, 2)}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Орган, що видав:</span>
                                    <span className={styles['english']}>Authority</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uAuthority}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>РНОКПП (ІПН):</span>
                                    <span className={styles['english']}>Individual Tax Number</span>
                                </div>
                                <div className={styles['full-info__item-right-second']}>
                                    <span>{user.uTaxnum}</span>
                                    <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}ß/>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left-third']}>
                                    <span>Пройшов перевірку Державною податковою службою {currentDate}</span>
                                    <span className={styles['english']}>Varified by State Tax Service on {currentDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Запис № (УНЗР):</span>
                                    <span className={styles['english']}>Record No.</span>
                                </div>
                                <div className={styles['full-info__item-right-second']}>
                                    <span>{fomatedRecord(user.uDOB)}</span>
                                    <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}/>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Місце народження:</span>
                                    <span className={styles['english']}>Place of birth</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span style={{textTransform: 'uppercase'}}>М. {user.uCity} {user.uArea} ОБЛАСТЬ УКРАЇНА</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left-third']}>
                                    <span>Місце проживання</span>
                                    <span className={styles['english']}>Legal address</span>
                                    <span style={{textTransform: 'uppercase'}}>Україна {user.uArea} область {user.uRayon} район м. {user.uCity} вул. {user.uStreet} буд. {user.uStreetNum}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Дата реєстрації:</span>
                                    <span className={styles['english']}>Registered on:</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span style={{textTransform: 'uppercase'}}>17.04.2022</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                    <div>
                        <div className={styles["full-info__qr"]}>
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
                                setActiveCode('QR');
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
                                setActiveCode('Barcode');
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
          )}
          {documentType === 'foreginpassport' && (
            <div className={styles['full-info-content']}>
                <div className={styles['full-info-container']}>
                    <h2 className={styles['full-info__header-title']}>Internetional Passport</h2>
                    <h3 className={styles['full-info__header-subtitle']}>Закордонний паспорт</h3>
                    <h3 className={styles['full-info__header-subtitle']}>Ukraine • Україна</h3>
                    <div className={styles['passport_number']}>
                        <span>{user.uInternationalNumber}</span>
                        <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}/>
                    </div>
                </div>
                <div className={styles["marque-wrap"]}>
                    <div className={styles.marquee}>
                        <span style={{fontSize: 7}}>• Документ оновлено о {currentTime} | {currentDate} • Document updated on {currentTime} | {currentDate} • Документ оновлено о {currentTime} | {currentDate}</span>
                    </div>
                </div>
                <div className={styles['full-info-container']}>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info-container__name']}>
                            <span className={styles['full-info-container-name']}>{user.uSurname} {user.uName}</span>
                            <span className={styles['full-info-container-name']}>{user.uFather}</span>
                        </div>
                        <span className={styles['full-info-container-name-eng']}>{user.uEnglishSurname} {user.uEnglishName}</span>
                        <div className={styles['passport-details__wrap']}>
                            <div className={styles['passport-details__wrap-left']}>
                                <img src={photoUrlInternational} alt="photo"/>
                            </div>
                            <div className={styles['passport-details__wrap-right']}>
                                <p className={styles['passport-details__wrap-right-item']}>Дата<br />народження:</p>
                                <p className={styles['passport-details__wrap-right-item__eng']}>Date of birth:</p>
                                <p className={styles['passport-details__wrap-right-item']}>{user.uDOB}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                        <div className={styles['full-info__item']}>
                            <div className={styles['full-info__item-left']}>
                                <span>Стать:</span>
                                <span className={styles['english']}>Sex</span>
                            </div>
                            <div className={styles['full-info__item-right']}>
                                <span>{user.uSex}</span>
                                <span className={styles['english']}>{user.uSex === 'Ч' ? 'M' : 'F'}</span>
                            </div>
                        </div>
                        <div className={styles['full-info__item']}>
                            <div className={styles['full-info__item-left']}>
                                <span>Громадянство:</span>
                                <span className={styles['english']}>Nationality</span>
                            </div>
                            <div className={styles['full-info__item-right']}>
                                <span>Україна</span>
                                <span className={styles['english']}>Ukraine</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Дата видачі:</span>
                                    <span className={styles['english']}>Date of issue</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uInternationalGiven}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Дійсний до:</span>
                                    <span className={styles['english']}>Date of expiry</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{calculateYears(user.uInternationalGiven, 3)}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Орган, що видав:</span>
                                    <span className={styles['english']}>Authority</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uAuthority}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>РНОКПП (ІПН):</span>
                                    <span className={styles['english']}>Individual Tax Number</span>
                                </div>
                                <div className={styles['full-info__item-right-second']}>
                                    <span>{user.uTaxnum}</span>
                                    <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}ß/>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left-third']}>
                                    <span>Пройшов перевірку Державною податковою службою {currentDate}</span>
                                    <span className={styles['english']}>Varified by State Tax Service on {currentDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Запис № (УНЗР):</span>
                                    <span className={styles['english']}>Record No.</span>
                                </div>
                                <div className={styles['full-info__item-right-second']}>
                                    <span>{fomatedRecord(user.uDOB)}</span>
                                    <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}/>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Тип:</span>
                                    <span className={styles['english']}>Type</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span style={{textTransform: 'uppercase'}}>P</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Код держави:</span>
                                    <span className={styles['english']}>Country code</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span style={{textTransform: 'uppercase'}}>UKR</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Місце народження:</span>
                                    <span className={styles['english']}>Place of birth:</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span style={{textTransform: 'uppercase'}}>М. {user.uCity}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                    <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left-third']}>
                                    <span>Місце проживання</span>
                                    <span className={styles['english']}>Legal address</span>
                                    <span style={{textTransform: 'uppercase'}}>Україна {user.uArea} область {user.uRayon} район м. {user.uCity} вул. {user.uStreet} буд. {user.uStreetNum}</span>
                                </div>
                            </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                    <div>
                        <div className={styles["full-info__qr"]}>
                            <h2>Код діятиме ще: {formatTime(timer)}</h2>
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
                                e.stopPropagation(); // Останавливаем клик для флипа
                                setActiveCode('QR');
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
                                setActiveCode('Barcode');
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
          )}
          {documentType === 'eDocument' && (
            <div className={styles['full-info-content']}>
                <div className={styles['full-info-container']}>
                    <h2 className={styles['full-info__header-title']}>єДокумент</h2>
                </div>
                <div className={styles["marque-wrap"]}>
                    <div className={styles.marquee}>
                        <span style={{fontSize: 7}}>Документ діє під час воєнного стану. Ой у лузі
                            червона калина похилилася, чогось наша славна
                            Україна зажурилася. А ми тую червону калину
                            підіймемо, а ми нашу славну Україну, гей, гей,
                            розвеселимо!</span>
                    </div>
                </div>
                <div className={styles['full-info-container']}>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info-container__name']}>
                            <span className={styles['full-info-container-name']}>{user.uSurname} {user.uName}</span>
                            <span className={styles['full-info-container-name']}>{user.uFather}</span>
                        </div>
                        <span className={styles['full-info-container-name-eng']}>{user.uEnglishSurname} {user.uEnglishName}</span>
                        <div className={styles['passport-details__wrap']}>
                            <div className={styles['passport-details__wrap-left']}>
                                <img src={photoUrlPassport} alt="photo"/>
                            </div>
                            <div className={styles['passport-details__wrap-right']}>
                                <p className={styles['passport-details__wrap-right-item']}>Дата<br />народження:</p>
                                <p className={styles['passport-details__wrap-right-item__eng']}>Date of birth:</p>
                                <p className={styles['passport-details__wrap-right-item']}>{user.uDOB}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                        <div className={styles['full-info__item']}>
                            <div className={styles['full-info__item-left']}>
                                <span>Стать:</span>
                                <span className={styles['english']}>Sex</span>
                            </div>
                            <div className={styles['full-info__item-right']}>
                                <span>{user.uSex}</span>
                                <span className={styles['english']}>{user.uSex === 'Ч' ? 'М' : 'F'}</span>
                            </div>
                        </div>
                        <div className={styles['full-info__item-second']} style={{margnTop: '100px'}}>
                            <div className={styles['full-info__item-left']}>
                                <span>РНОКПП (ІПН):</span>
                                <span className={styles['english']}>Individual Tax Number</span>
                            </div>
                            <div className={styles['full-info__item-right-second']}>
                                <span>{user.uTaxnum}</span>
                                <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}ß/>
                            </div>
                        </div>
                        <div className={styles['full-info__item-second']}>
                            <div className={styles['full-info__item-left-third']}>
                                <span>Документ, що посвідчує особу:</span>
                                <span>Паспорт громадянина України<br/>{user.uPassportnumber}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                        <div className={styles['full-info__item-second']}>
                            <div className={styles['full-info__item-left-third']}>
                                <span>Місце проживання зазначене в банку:</span>
                                <span>Україна, облась {user.uArea}, район {user.uRayon}, місто {user.uCity}, вулиця {user.uStreet}, буд {user.uStreetNum}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                    <div>
                        <div className={styles["full-info__qr"]} style={{flexDirection: 'row', padding: 30}}>
                            <img
                            src={
                                activeCode === "QR"
                                ? user.uQRUrl !== "none"
                                    ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/edoc/id/${user.uID}`
                                    : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/edoc/id/0`
                                : Barcode
                            }
                            style={{ height: activeCode === "Barcode" ? "120px" : "", marginTop: activeCode === "Barcode" ? "70px" : "", marginBottom: activeCode === "Barcode" ? "60px" : "" }}
                            alt="QR Code"
                            className={styles["qr-code"]}
                            />
                            <div className={styles['more-info__bottom']}>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )}
          {documentType === 'drivelicence' && (
            <div className={styles['full-info-content']}>
                <div className={styles['full-info-container']}>
                    <h2 className={styles['full-info__header-title']}>Посвідчення водія</h2>
                    <div className={styles['passport_number']}>
                        <span>{user.uLicenseNumber}</span>
                        <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}/>
                    </div>
                </div>
                <div className={styles["marque-wrap"]}>
                    <div className={styles.marquee}>
                        <span style={{fontSize: 7}}>• Документ оновлено о {currentTime} | {currentDate} • Документ оновлено о {currentTime} | {currentDate} • Документ оновлено о {currentTime} | {currentDate}</span>
                    </div>
                </div>
                <div className={styles['full-info-container']}>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                        <div className={styles['full-info__item']}>
                            <div className={styles['full-info__item-left']}>
                                <span>1. Прізвище:</span>
                                <span className={styles['english']}>Surname</span>
                            </div>
                            <div className={styles['full-info__item-right']}>
                                <span>{user.uSurname}</span>
                                <span className={styles['english']}>{user.uEnglishSurname}</span>
                            </div>
                        </div>
                        <div className={styles['full-info__item']}>
                            <div className={styles['full-info__item-left']}>
                                <span>2. Ім'я та по батькові:</span>
                                <span className={styles['english']}>Given names</span>
                            </div>
                            <div className={styles['full-info__item-right']}>
                                <span>{user.uName} {user.uFather}</span>
                                <span className={styles['english']}>{user.uSurname}</span>
                            </div>
                        </div>
                        <div className={styles['full-info__item']} style={{alignItems: 'top'}}>
                            <div className={styles['full-info__item-left']}>
                                <span>3. Дата і місце народження:</span>
                                <span className={styles['english']}>Date and place of birth</span>
                            </div>
                            <div className={styles['full-info__item-right']}>
                                <span style={{textTransform: 'uppercase'}}>{user.uDOB} <br/>{user.uArea}<br/>ОБЛ.</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>4a. Дата видачі:</span>
                                    <span className={styles['english']}>Date of issue</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uLicenseDOI}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>4b. Дійсний до:</span>
                                    <span className={styles['english']}>Date of expiry</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{calculateYears(user.uLicenseDOI, 3)}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>4c. Орган, що видав:</span>
                                    <span className={styles['english']}>Authority</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>(0501) ВРЕР з обслуговування м. {user.uCity}, {user.uRayon.replace(/ий$/, 'ого')} району</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>4d. Запис № (УНЗР):</span>
                                    <span className={styles['english']}>Record No.</span>
                                </div>
                                <div className={styles['full-info__item-right-second']}>
                                    <span>{fomatedRecord(user.uDOB)}</span>
                                    <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>5. Номер документа:</span>
                                    <span className={styles['english']}>Licence number</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uLicenseNumber}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>9. Категорія:</span>
                                    <span className={styles['english']}>Category</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uLicenseCategories}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left-third']}>
                                    <span>10. Дата відкриття категорії</span>
                                    <span className={styles['english']}>Category issuing date</span>
                                    <span>{user.uLicenseDOI}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                    <div>
                        <div className={styles["full-info__qr"]}>
                            <h2>Код діятиме ще: {formatTime(timer)}</h2>
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
                                e.stopPropagation(); // Останавливаем клик для флипа
                                setActiveCode('QR');
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
                                setActiveCode('Barcode');
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
          )}
          {documentType === 'educational' && (
            <div className={styles['full-info-content']}>
                <div className={styles['full-info-container']}>
                    <h2 className={styles['full-info__header-title']}>{user.uEducationName}</h2>
                    <div className={styles['passport_number']}>
                        <span>{user.uEducationNumber}</span>
                        <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}/>
                    </div>
                </div>
                <div className={styles["marque-wrap"]}>
                    <div className={styles.marquee}>
                        <span style={{fontSize: 7}}>• Документ оновлено о {currentTime} | {currentDate} • Документ оновлено о {currentTime} | {currentDate} • Документ оновлено о {currentTime} | {currentDate}</span>
                    </div>
                </div>
                <div className={styles['full-info-container']}>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info-container__name']} style={{fontSize: '18px'}}>
                            <span className={styles['full-info-container-name']} style={{fontSize: '18px'}}>{user.uSurname} {user.uName}</span>
                            <span className={styles['full-info-container-name']} style={{fontSize: '18px'}}>{user.uFather}</span>
                        </div>
                        <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Дата народження:</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uDOB}</span>
                                </div>
                            </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left-third']}>
                                    <span>Повна назва документа</span>
                                    <span>{user.uEducationName}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left-third']}>
                                    <span>Заклад освіти</span>
                                    <span>{user.uEducationZaklad}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Дата видачі:</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uEducationalGiven}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Дата закінчення навчання:</span>
                                </div>
                                <div className={styles['full-info__item-right-second']}>
                                    <span>{user.uEducationalGiven}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-wrapper']}>
                        <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Директор:</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uEducationDirector}</span>
                                </div>
                            </div>
                            <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left-third']}>
                                    <span>Заклад освіти, що видав документ:</span>
                                    <span>{user.uEducationZaklad}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                    <div>
                        <div className={styles["full-info__qr"]}>
                            <h2>Код діятиме ще: {formatTime(timer)}</h2>
                            <img
                                src={
                                    activeCode === "QR"
                                    ? user.uQRUrl !== "none"
                                        ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/education/id/${user.uID}`
                                        : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/education/id/0`
                                    : Barcode
                                }
                                alt="QR Code"
                            className={styles["qr-code"]}
                            />
                            <div className={styles['more-info__bottom']}>
                            <div
                            className={styles['more-info__item-bottom']}
                            onClick={(e) => {
                                e.stopPropagation(); // Останавливаем клик для флипа
                                setActiveCode('QR');
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
                                setActiveCode('Barcode');
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
          )}
           {documentType === 'weapon' && (
            <div className={styles['full-info-content']}>
                <div className={styles['full-info-container']}>
                    <h2 className={styles['full-info__header-title']}>Дозвіл на зберігання і носіння зброї фізичною особою</h2>
                    <div className={styles['passport_number']}>
                        <span>{user.uWeaponNum}</span>
                        <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}/>
                    </div>
                </div>
                <div className={styles["marque-wrap"]}>
                    <div className={styles.marquee}>
                         <span style={{fontSize: 12}}>• Дозвіл дійсний до {user.uWeaponExpire} • Дозвіл дійсний до {user.uWeaponExpire} • Дозвіл дійсний до {user.uWeaponExpire} </span>
                    </div>
                </div>
                <div className={styles['full-info-container']}>
                    <div className={styles['full-info-container__item']}>
                        <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Дата видачі:</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uWeaponGiven}</span>
                                </div>
                        </div>
                            <div className={styles['full-info__item-left-third']} style={{marginTop: '1vh'}}>
                                <span>Орган що видав:</span>
                                <span>{user.uWeaponWhoGiven}</span>
                            </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                        <h2 className={styles['full-info__header-title']} style={{fontSize: 16}}>{user.uWeaponName}</h2>
                        <div className={styles['full-info__item-second']}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Тип:</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uWeaponType}</span>
                                </div>
                        </div>
                        <div className={styles['full-info__item-second']} style={{marginTop: '1vh'}}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Модель:</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uWeaponModel}</span>
                                </div>
                        </div>
                        <div className={styles['full-info__item-second']} style={{marginTop: '1vh'}}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Категорія:</span>
                                </div>
                                <div className={styles['full-info__item-right']}>
                                    <span>{user.uWeaponCategory}</span>
                                </div>
                        </div>
                        <div className={styles['full-info__item-second']} style={{marginTop: '1vh'}}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Серійний номер:</span>
                                </div>
                                <div className={styles['full-info__item-right-second']}>
                                    <span>{user.uWeaponSerial}</span>
                                    <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}/>
                                </div>
                        </div>
                        <div className={styles['full-info__item-second']} style={{marginTop: '1vh'}}>
                                <div className={styles['full-info__item-left']}>
                                    <span>Додатковий номер:</span>
                                </div>
                                <div className={styles['full-info__item-right-second']}>
                                    <span>{user.uWeaponAdditionalNumber}</span>
                                    <img src={CopyIcon} alt="copy" onClick={handleCopyDeviceNumber}/>
                                </div>
                        </div>
                        <div className={styles['full-info__item-second']} style={{marginTop: '1vh'}}>
                                <div className={styles['full-info__item-left-third']}>
                                    <span>Виробник:</span>
                                    <span>{user.uWeaponProduced}</span>
                                </div>
                            </div>
                    </div>
                    <div className={styles['full-info-container__item']}>
                    <div>
                        <div className={styles["full-info__qr"]}>
                            <h2>Код діятиме ще: {formatTime(timer)}</h2>
                            <img
                                src={
                                    activeCode === "QR"
                                    ? user.uQRUrl !== "none"
                                        ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/education/id/${user.uID}`
                                        : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://5.44.252.59:3001/document_type/education/id/0`
                                    : Barcode
                                }
                                alt="QR Code"
                            className={styles["qr-code"]}
                            />
                            <div className={styles['more-info__bottom']}>
                            <div
                            className={styles['more-info__item-bottom']}
                            onClick={(e) => {
                                e.stopPropagation(); // Останавливаем клик для флипа
                                setActiveCode('QR');
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
                                setActiveCode('Barcode');
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
          )}
        </div>
      </div>
    </div>
  );
}
