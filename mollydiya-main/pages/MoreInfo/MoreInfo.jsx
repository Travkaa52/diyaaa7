import React from "react";
import styles from './MoreInfo.module.css';
import { useNavigate } from "react-router-dom";

import DocIcon from '../../assets/images/document.png';
import QRIcon from '../../assets/images/qr-code2.png';
import BarcodeIcon from '../../assets/images/barcode.png';
import VitagIcon from '../../assets/images/vitag.png';
import StarIcon from '../../assets/images/star.png';
import ExchangeIcon from '../../assets/images/exchange.png';
import QuestionIcon from '../../assets/images/question.png';
import EnglishIcon from '../../assets/images/english.png';
import RefreshIcon from '../../assets/images/refresh.png';
import UaIcon from '../../assets/images/ua.png';
import DownloadIcon from "../../assets/images/download.png";
import weaponGetIcon from "../../assets/images/weaponGet.png";
import trashIcon from "../../assets/images/trash.png";

export default function MoreInfo({ documentType, onClose, onToggleCode, onFlip, onOpenRateDocument, onFullInfoClick, isEnglish, toggleLanguage }) {
  const navigate = useNavigate(); // Ініціалізація навігації

  const handleToggleCodeAndFlip = (codeType) => {
    onToggleCode(codeType);  // Меняем активный код
    onFlip();  // Флип паспорта
    onClose(); // Закрываем инфо
  };

  const handleFullInfoClick = () => {
    onFullInfoClick(documentType);  // Відкриваємо повну інформацію для цього документа
    onClose(); // Закриваємо інформацію
  };

  return (
    <div className={styles['more-info-overlay']} onClick={onClose}>
      <div className={styles['more-info']} onClick={(e) => e.stopPropagation()}>
        {documentType === 'passport' && (
          <div className={styles['more-info-wrap']}>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']}>
                <div className={styles["more-info__item"]} onClick={handleFullInfoClick}>
                  <img src={DocIcon} alt="Doc"/>
                  <span>Повна інформація</span>
                </div>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-second']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Витяг про місце проживання', lastPage: 'documents' } })}}>
                  <img src={VitagIcon} alt="Doc"/>
                  <span>Витяг про місце проживання</span>
                </div>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {onClose(); onOpenRateDocument(); }}>
                  <img src={StarIcon} alt="Doc"/>
                  <span>Оцінити документ</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Змінити порядок документів', lastPage: 'documents' } })}}>
                  <img src={ExchangeIcon} alt="Doc"/>
                  <span>Змінити порядок документів</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Питання та відповіді', lastPage: 'documents' } })}}>
                  <img src={QuestionIcon} alt="Doc"/>
                  <span>Питання та відповіді</span>
                </div>
              </div>
              <div className={styles['line-throught']}></div>
              <div className={styles['more-info__bottom']}>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('QR')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={QRIcon} alt="QR" />
                  </div>
                  <span>QR-код</span>
                </div>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('Barcode')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={BarcodeIcon} alt="Barcode" />
                  </div>
                  <span>Штрихкод</span>
                </div>
              </div>
            </div>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']} style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} onClick={onClose}>
                <span>Закрити</span>
              </div>
            </div>
          </div>
        )}
        {documentType === 'eDocument' && (
          <div className={styles['more-info-wrap']}>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']}>
                <div className={styles["more-info__item"]} onClick={handleFullInfoClick}>
                  <img src={DocIcon} alt="Doc"/>
                  <span>Повна інформація</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-second']}>
                <div className={styles["more-info__item"]} onClick={() => {handleToggleCodeAndFlip('QR')}}>
                  <img src={QRIcon} alt="Doc"/>
                  <span>Код для перевірки</span>
                </div>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Змінити порядок документів', lastPage: 'documents' } })}}>
                  <img src={ExchangeIcon} alt="Doc"/>
                  <span>Змінити порядок документів</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {onClose(); onOpenRateDocument(); }}>
                  <img src={StarIcon} alt="Doc"/>
                  <span>Оцінити документ</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Питання та відповіді', lastPage: 'documents' } })}}>
                  <img src={QuestionIcon} alt="Doc"/>
                  <span>Питання та відповіді</span>
                </div>
              </div>
            </div>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']} style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} onClick={onClose}>
                <span>Закрити</span>
              </div>
            </div>
          </div>
        )}
        {documentType === 'tax' && (
          <div className={styles['more-info-wrap']}>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Змінити порядок документів', lastPage: 'documents' } })}}>
                  <img src={ExchangeIcon} alt="Doc"/>
                  <span>Змінити порядок документів</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {onClose(); onOpenRateDocument(); }}>
                  <img src={StarIcon} alt="Doc"/>
                  <span>Оцінити документ</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Питання та відповіді', lastPage: 'documents' } })}}>
                  <img src={QuestionIcon} alt="Doc"/>
                  <span>Питання та відповіді</span>
                </div>
              </div>
              <div className={styles['line-throught']}></div>
              <div className={styles['more-info__bottom']}>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('QR')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={QRIcon} alt="QR" />
                  </div>
                  <span>QR-код</span>
                </div>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('Barcode')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={BarcodeIcon} alt="Barcode" />
                  </div>
                  <span>Штрихкод</span>
                </div>
              </div>
            </div>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']} style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} onClick={onClose}>
                <span>Закрити</span>
              </div>
            </div>
          </div>
        )}
        {documentType === 'foreginpassport' && (
          <div className={styles['more-info-wrap']}>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']}>
                <div className={styles["more-info__item"]} onClick={handleFullInfoClick}>
                  <img src={DocIcon} alt="Doc"/>
                  <span>Повна інформація</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-second']}>
                <div className={styles["more-info__item"]} onClick={() => {toggleLanguage(); onClose();}}>
                  {!isEnglish ? (<img src={EnglishIcon} alt="Doc"/>) : (<img src={UaIcon} alt="Doc"/>)}
                  <span>{isEnglish ? "Перекласти українською" : "Перекласти англійською"}</span>
                </div>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-second']} style={{marginTop: 15}}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Витяг про місце проживання', lastPage: 'documents' } })}}>
                  <img src={VitagIcon} alt="Doc"/>
                  <span>Витяг про місце проживання</span>
                </div>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {onClose(); onOpenRateDocument(); }}>
                  <img src={StarIcon} alt="Doc"/>
                  <span>Оцінити документ</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Змінити порядок документів', lastPage: 'documents' } })}}>
                  <img src={ExchangeIcon} alt="Doc"/>
                  <span>Змінити порядок документів</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Питання та відповіді', lastPage: 'documents' } })}}>
                  <img src={QuestionIcon} alt="Doc"/>
                  <span>Питання та відповіді</span>
                </div>
              </div>
              <div className={styles['line-throught']}></div>
              <div className={styles['more-info__bottom']}>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('QR')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={QRIcon} alt="QR" />
                  </div>
                  <span>QR-код</span>
                </div>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('Barcode')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={BarcodeIcon} alt="Barcode" />
                  </div>
                  <span>Штрихкод</span>
                </div>
              </div>
            </div>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']} style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} onClick={onClose}>
                <span>Закрити</span>
              </div>
            </div>
          </div>
        )}
        {documentType === 'drivelicence' && (
          <div className={styles['more-info-wrap']}>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']}>
                <div className={styles["more-info__item"]} onClick={handleFullInfoClick}>
                  <img src={DocIcon} alt="Doc"/>
                  <span>Повна інформація</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-second']}>
                <div className={styles["more-info__item"]} onClick={() => {toggleLanguage(); onClose();}}>
                {!isEnglish ? (<img src={EnglishIcon} alt="Doc"/>) : (<img src={UaIcon} alt="Doc"/>)}
                <span>{isEnglish ? "Перекласти українською" : "Перекласти англійською"}</span>
                </div>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-second']} style={{marginTop: 15}}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Заміна посвідчення водія', lastPage: 'documents' } })}}>
                  <img src={RefreshIcon} alt="Doc"/>
                  <span>Заміна посвідчення</span>
                </div>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {onClose(); onOpenRateDocument(); }}>
                  <img src={StarIcon} alt="Doc"/>
                  <span>Оцінити документ</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Змінити порядок документів', lastPage: 'documents' } })}}>
                  <img src={ExchangeIcon} alt="Doc"/>
                  <span>Змінити порядок документів</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Питання та відповіді', lastPage: 'documents' } })}}>
                  <img src={QuestionIcon} alt="Doc"/>
                  <span>Питання та відповіді</span>
                </div>
              </div>
              <div className={styles['line-throught']}></div>
              <div className={styles['more-info__bottom']}>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('QR')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={QRIcon} alt="QR" />
                  </div>
                  <span>QR-код</span>
                </div>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('Barcode')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={BarcodeIcon} alt="Barcode" />
                  </div>
                  <span>Штрихкод</span>
                </div>
              </div>
            </div>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']} style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} onClick={onClose}>
                <span>Закрити</span>
              </div>
            </div>
          </div>
        )}
        {documentType === 'educational' && (
          <div className={styles['more-info-wrap']}>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']}>
                <div className={styles["more-info__item"]} onClick={handleFullInfoClick}>
                  <img src={DocIcon} alt="Doc"/>
                  <span>Повна інформація</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-second']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Завантажити документ', lastPage: 'documents' } })}}>
                  <img src={DownloadIcon} alt="Doc"/>
                  <span>Завантажити документ (pdf)</span>
                </div>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-second']} style={{marginTop: 15}}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Оновити  документ', lastPage: 'documents' } })}}>
                  <img src={RefreshIcon} alt="Doc"/>
                  <span>Оновити документ</span>
                </div>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {onClose(); onOpenRateDocument(); }}>
                  <img src={StarIcon} alt="Doc"/>
                  <span>Оцінити документ</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Змінити порядок документів', lastPage: 'documents' } })}}>
                  <img src={ExchangeIcon} alt="Doc"/>
                  <span>Змінити порядок документів</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Питання та відповіді', lastPage: 'documents' } })}}>
                  <img src={QuestionIcon} alt="Doc"/>
                  <span>Питання та відповіді</span>
                </div>
              </div>
              <div className={styles['line-throught']}></div>
              <div className={styles['more-info__bottom']}>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('QR')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={QRIcon} alt="QR" />
                  </div>
                  <span>QR-код</span>
                </div>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('Barcode')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={BarcodeIcon} alt="Barcode" />
                  </div>
                  <span>Штрихкод</span>
                </div>
              </div>
            </div>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']} style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} onClick={onClose}>
                <span>Закрити</span>
              </div>
            </div>
          </div>
        )}
        {documentType === 'weapon' && (
          <div className={styles['more-info-wrap']}>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']}>
                <div className={styles["more-info__item"]} onClick={handleFullInfoClick}>
                  <img src={DocIcon} alt="Doc"/>
                  <span>Повна інформація</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-second']}>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-second']} style={{marginTop: 15}}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Витяг про дозвіл на зброю', lastPage: 'documents' } })}}>
                  <img src={weaponGetIcon} alt="Doc"/>
                  <span>Витяг про дозвіл на зброю</span>
                </div>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Вилучити документ', lastPage: 'documents' } })}}>
                  <img src={trashIcon} alt="Doc"/>
                  <span>Вилучити документ</span>
                </div>
                <div className={styles['line-throught']}></div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {onClose(); onOpenRateDocument(); }}>
                  <img src={StarIcon} alt="Doc"/>
                  <span>Оцінити документ</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Змінити порядок документів', lastPage: 'documents' } })}}>
                  <img src={ExchangeIcon} alt="Doc"/>
                  <span>Змінити порядок документів</span>
                </div>
              </div>
              <div className={styles['more-info__item-container-third']}>
                <div className={styles["more-info__item"]} onClick={() => {navigate('/notfound', { state: { title: 'Питання та відповіді', lastPage: 'documents' } })}}>
                  <img src={QuestionIcon} alt="Doc"/>
                  <span>Питання та відповіді</span>
                </div>
              </div>
              <div className={styles['line-throught']}></div>
              <div className={styles['more-info__bottom']}>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('QR')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={QRIcon} alt="QR" />
                  </div>
                  <span>QR-код</span>
                </div>
                <div className={styles['more-info__item-bottom']} onClick={() => handleToggleCodeAndFlip('Barcode')}>
                  <div className={styles['more-info__item-bottom-img']} style={{background: "black"}}>
                    <img src={BarcodeIcon} alt="Barcode" />
                  </div>
                  <span>Штрихкод</span>
                </div>
              </div>
            </div>
            <div className={styles['more-info-items__wrapper']}>
              <div className={styles['more-info__item-container']} style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} onClick={onClose}>
                <span>Закрити</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}