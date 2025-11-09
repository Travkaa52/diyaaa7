import React, { useState, useRef } from "react";
import styles from "./Documents.module.css";
import BgVideo from '../../assets/videos/background_gradient.mp4';
import Passport from "../Passport/Passport";
import MoreInfo from "../MoreInfo/MoreInfo";
import RateDocument from "../RateDocument/RateDocument";
import FullInfo from "../FullInfo/FullInfo";
import EDocument from "../EDocument/EDocument";
import TaxDoc from "../TaxDoc/TaxDoc";
import ForeginPassport from "../ForeginPassport/ForeginPassport";
import AdditionalMenu from "../AdditionalMenu/AdditionalMenu";
import DriveLicence from "../DriveLicence/DriveLicence";
import EducationalDocument from "../EducationalDocument/EducationalDocument";
import Weapon from "../Weapon/Weapon";
import { useUserContext } from '../../userContext';

export default function Documents() {
  const { user } = useUserContext();
  const [isMoreInfoVisible, setIsMoreInfoVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeDocumentCode, setActiveDocumentCode] = useState({});
  const [isFlipped, setIsFlipped] = useState({});
  const [isRateDocumentVisible, setIsRateDocumentVisible] = useState(false);
  const [isRateDocumentAnimating, setIsRateDocumentAnimating] = useState(false);
  const [fullInfoType, setFullInfoType] = useState(null);
  const [isFullInfoVisible, setIsFullVisible] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [languageStates, setLanguageStates] = useState({
    passport: false,
    eDocument: false,
    tax: false,
    foreginpassport: false,
    drivelicence: false,
    educational: false,
  });

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const toggleLanguage = (docType) => {
    setLanguageStates((prev) => {
      console.log(`Toggling language for ${docType} to:`, !prev[docType]);
      return {
        ...prev,
        [docType]: !prev[docType],
      };
    });
  };

  const handleCopyDeviceNumber = () => {
    setIsMessageVisible(true);
    setTimeout(() => setIsMessageVisible(false), 2500);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (swipeDistance > 50) {
      setCurrentDocumentIndex((prevIndex) =>
        prevIndex + 1 < documents.length ? prevIndex + 1 : 0
      );
    } else if (swipeDistance < -50) {
      setCurrentDocumentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : documents.length - 1
      );
    }
  };

  const handleMoreInfo = (docType) => {
    setIsAnimating(true);
    setFullInfoType(docType);
    setIsMoreInfoVisible(true);
  };

  const handleFullInfoClick = (docType) => {
    setFullInfoType(docType);
    setIsMoreInfoVisible(false);
    setIsFullVisible(true);
  };

  const handleCloseMoreInfo = () => {
    setIsAnimating(false);
    setTimeout(() => setIsMoreInfoVisible(false), 300);
  };

  const handleToggleCode = (docType, codeType) => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMoreInfoVisible(false);
      setActiveDocumentCode((prev) => ({
        ...prev,
        [docType]: codeType,
      }));
    }, 300);
  };

  const handleFlip = (docType) => {
    setIsFlipped((prev) => ({
      ...prev,
      [docType]: !prev[docType],
    }));
  };

  const handleOpenRateDocument = () => {
    setIsRateDocumentVisible(true);
  };

  const handleCloseRateDocument = () => {
    setIsRateDocumentAnimating(true);
    setTimeout(() => {
      setIsRateDocumentVisible(false);
      setIsRateDocumentAnimating(false);
    }, 300);
  };

  const documents = [
    {
      name: 'Passport',
      component: (
        <Passport
          onMoreInfo={handleMoreInfo}
          activeCode={activeDocumentCode.passport || 'QR'}
          isFlipped={isFlipped.passport || false}
          onFlip={() => handleFlip('passport')}
          onToggleCode={(codeType) => handleToggleCode('passport', codeType)}
          isEnglish={languageStates.passport}
          toggleLanguage={() => toggleLanguage('passport')}
        />
      ),
    },
    {
      name: 'EDocument',
      component: (
        <EDocument
          onFlip={() => handleFlip('eDocument')}
          isFlipped={isFlipped.eDocument || false}
          onMoreInfo={handleMoreInfo}
          isEnglish={languageStates.eDocument}
          toggleLanguage={() => toggleLanguage('eDocument')}
        />
      ),
    },
    {
      name: 'Tax',
      component: (
        <TaxDoc
          onFlip={() => handleFlip('tax')}
          isFlipped={isFlipped.tax || false}
          onMoreInfo={handleMoreInfo}
          onToggleCode={(codeType) => handleToggleCode('tax', codeType)}
          activeCode={activeDocumentCode.tax || 'QR'}
          onCopy={handleCopyDeviceNumber}
          isEnglish={languageStates.tax}
          toggleLanguage={() => toggleLanguage('tax')}
        />
      ),
    },
    ...(user.uInternationalActive !== 0
      ? [{
          name: 'ForeginPassport',
          component: (
            <ForeginPassport
              onMoreInfo={handleMoreInfo}
              activeCode={activeDocumentCode.foreginpassport || 'QR'}
              isFlipped={isFlipped.foreginpassport || false}
              onFlip={() => handleFlip('foreginpassport')}
              onToggleCode={(codeType) => handleToggleCode('foreginpassport', codeType)}
              isEnglish={languageStates.foreginpassport}
              toggleLanguage={() => toggleLanguage('foreginpassport')}
            />
          ),
        }]
      : []),
    ...(user.uLicenseActive !== 0
      ? [{
          name: 'drivelicence',
          component: (
            <DriveLicence
              onMoreInfo={handleMoreInfo}
              activeCode={activeDocumentCode.drivelicence || 'QR'}
              isFlipped={isFlipped.drivelicence || false}
              onFlip={() => handleFlip('drivelicence')}
              onToggleCode={(codeType) => handleToggleCode('drivelicence', codeType)}
              isEnglish={languageStates.drivelicence}
              toggleLanguage={() => toggleLanguage('drivelicence')}
            />
          ),
        }]
      : []),
    ...(user.uEducationActive !== 0
      ? [{
          name: 'educational',
          component: (
            <EducationalDocument
              onMoreInfo={handleMoreInfo}
              activeCode={activeDocumentCode.educational || 'QR'}
              isFlipped={isFlipped.educational || false}
              onFlip={() => handleFlip('educational')}
              onToggleCode={(codeType) => handleToggleCode('educational', codeType)}
              onCopy={handleCopyDeviceNumber}
              isEnglish={languageStates.educational}
              toggleLanguage={() => toggleLanguage('educational')}
            />
          ),
        }]
      : []),
      ...(user.uWeapon !== 0
        ? [{
            name: 'weapon',
            component: (
              <Weapon
                onMoreInfo={handleMoreInfo}
                activeCode={activeDocumentCode.educational || 'QR'}
                isFlipped={isFlipped.educational || false}
                onFlip={() => handleFlip('educational')}
                onToggleCode={(codeType) => handleToggleCode('educational', codeType)}
                onCopy={handleCopyDeviceNumber}
              />
            ),
          }]
        : []),
    { name: 'Additional', component: <AdditionalMenu /> },
  ];

  return (
    <div className={styles.container}>
      {isMessageVisible && (
        <div className={styles['copy-message']}>
          Номер скопійовано!
        </div>
      )}
      <div className={styles["video-background"]}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        >
          <source src={BgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          className={styles["slider"]}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {documents.map((doc, index) => (
            <div
              className={styles.sliderItem}
              key={doc.name}
              style={{
                transform: `translateX(-${currentDocumentIndex * 100}%)`,
              }}
            >
              {doc.component}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.paginationDots}>
        {documents.map((_, index) => (
          <div
            key={index}
            className={`${styles.paginationDot} ${currentDocumentIndex === index ? styles.paginationActive : ''}`}
            onClick={() => setCurrentDocumentIndex(index)}
          />
        ))}
      </div>

      {isFullInfoVisible && (
        <div className={`${styles["full-info-overlay"]} ${!isAnimating ? styles.hide : ''}`}>
          <FullInfo
            onClose={() => setIsFullVisible(false)}
            documentType={fullInfoType}
          />
        </div>
      )}

      {isMoreInfoVisible && (
        <div className={`${styles["more-info-overlay"]} ${!isAnimating ? styles.hide : ''}`}>
          <MoreInfo
            onClose={handleCloseMoreInfo}
            onToggleCode={(codeType) => handleToggleCode(fullInfoType, codeType)}
            onFlip={() => handleFlip(fullInfoType)}
            onOpenRateDocument={handleOpenRateDocument}
            documentType={fullInfoType}
            onFullInfoClick={handleFullInfoClick}
            isEnglish={languageStates[fullInfoType]}
            toggleLanguage={() => toggleLanguage(fullInfoType)}
          />
        </div>
      )}

      {isRateDocumentVisible && (
        <div className={`${styles["rate-document-overlay"]} ${isRateDocumentVisible ? 'visible' : ''}`}>
          <div className={`${styles["rate-document__wrap"]} ${isRateDocumentAnimating ? 'hidden' : ''}`}>
            <RateDocument onClose={handleCloseRateDocument} />
          </div>
        </div>
      )}
    </div>
  );
}