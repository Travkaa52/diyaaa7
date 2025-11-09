import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import LightIcon from "../../assets/images/light.png";
import ArrowIcon from "../../assets/images/arrow.svg";
import QRIcon from "../../assets/images/qr.png";
import MilitaryObligation from "../../assets/images/military-obligation.png";
import ChatBotIcon from "../../assets/images/chatbot.png";
import HelpImage from "../../assets/images/help.png";
import { useUserContext } from '../../userContext';

export default function Home() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="scrollable">
<div className={[styles.bg]}>
      <header className={styles.authHeader}>
        <p>Привіт, {user.uName} 👋</p>
      </header>
      <div className={styles.content}>
        <section
          className={styles.underHeader}
          onClick={() => window.open("https://www.google.com/maps/search/Укриття", "_blank")}
        >
          <div className={styles.underHeaderTop}>
            <h2>Незламність</h2>
            <p>Мапа Пунктів Незламності та укриттів.<br />Завява про відсутній зв'язок.</p>
          </div>
          <div className={styles.underHeaderBottom}>
            <img
              className={styles.underHeaderBottomImg}
              src={LightIcon}
              alt="Light"
            />
            <div className={styles.arrowSvg}>
              <img src={ArrowIcon} alt="arrow" />
            </div>
          </div>
        </section>

        <section className={styles.menu}>
          <div className={[styles.menuItem]} onClick={() => {navigate('/notfound', { state: { title: 'QR-Сканнер', lastPage: 'home' } })}}>
            <img src={QRIcon} alt="QR" />
            <p>Сканувати QR-код</p>
          </div>
          <div className={styles.menuItem} onClick={() => {navigate('/notfound', { state: { title: 'Військові облігації', lastPage: 'home' } })}}>
            <img src={MilitaryObligation} alt="Military Obligation" />
            <p>Військові облігації</p>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => window.open("https://t.me/evorog_bot", "_blank")}
          >
            <img src={ChatBotIcon} alt="ChatBot" />
            <p>Чатбот єВорог</p>
          </div>
        </section>

        <section className={styles.militaryHelp}>
          <img
            src={HelpImage}
            alt="Help"
            onClick={() => window.open("https://prytulafoundation.org/donation", "_blank")}
          />
        </section>
        <section className={styles.popularServices}>
          <h2 className={styles.popularTitle}>Популярні послуги</h2>
          <div className={styles.popularWrapper}>
            <div className={styles.popularContainer} onClick={() => {navigate('/notfound', { state: { title: 'Реєстрація пошкодженого майна', lastPage: 'home' } })}}>
              <div className={styles.popularItem}>
                <p>Реєстрація пошкодженого майна</p>
                <div className={styles.arrowSvg}>
                  <img src={ArrowIcon} alt="arrow" />
                </div>
              </div>
            </div>
            <div className={styles.popularLineThrought}></div>
            <div className={styles.popularContainer} onClick={() => {navigate('/notfound', { state: { title: 'Заміна водійського посвідчення', lastPage: 'home' } })}}>
              <div className={styles.popularItem}>
                <p>Заміна водійського посвідчення</p>
                <div className={styles.arrowSvg}>
                  <img src={ArrowIcon} alt="arrow" />
                </div>
              </div>
            </div>
            <div className={styles.popularLineThrought}></div>
            <div className={styles.popularContainer} onClick={() => {navigate('/notfound', { state: { title: 'Податки ФОП', lastPage: 'home' } })}}>
              <div className={styles.popularItem}>
                <p>Податки ФОП</p>
                <div className={styles.arrowSvg}>
                  <img src={ArrowIcon} alt="arrow" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}
