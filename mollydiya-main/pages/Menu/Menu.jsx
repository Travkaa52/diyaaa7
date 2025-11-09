import React, {useState} from "react";
import styles from './Menu.module.css'; 
import { useNavigate } from "react-router-dom";

import EmailIcon from '../../assets/images/email.png';
import KeyIcon from '../../assets/images/key.png';
import FoldersIcon from '../../assets/images/folders.png';
import SettingsIcon from '../../assets/images/settings.png';
import UpdateIcon from '../../assets/images/refresh.png';
import DevicesIcon from '../../assets/images/smartphone.png';
import ChatIcon from '../../assets/images/chat.png';
import CopyIcon from '../../assets/images/copy.png';
import AskIcon from '../../assets/images/ask.png';

export default function Menu() {
    const handleClearUID = () => {
        localStorage.removeItem('uID');
        window.location.replace("../");
    };
    const navigate = useNavigate();
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    const handleCopyDeviceNumber = () => {
        setIsMessageVisible(true);
        setTimeout(() => setIsMessageVisible(false), 2500); // скрытие через 2 секунды
    };

    return(
    <div className="scrollable">
        <div className={styles.bg}>
            {isMessageVisible && (
                <div className={styles['copy-message']}>
                    Номер пристрою скопійовано!
                </div>
            )}
            <div className={styles.header}>
                <h2>Меню</h2>
                <p>Версія Дії: 4.12.4.1812</p>
            </div>
            <div className={styles['menu-items-wrap']}>
                <div className={styles['menu-item']} onClick={() => {navigate('/notfound', { state: { title: 'Повідомлення', lastPage: 'menu' } })}}>
                    <div className={styles['menu-container']}>
                        <img src={EmailIcon} alt="email"/>
                        <p>Повідомлення</p>
                    </div>
                </div>
                <div className={styles['menu-item']} onClick={() => {navigate('/notfound', { state: { title: 'Дія.Підпис', lastPage: 'menu' } })}}>
                    <div className={styles['menu-container']}>
                        <img src={KeyIcon} alt="key"/>
                        <p>Дія.Підпис</p>
                    </div>
                    <div className={styles['menu-line-throught']}></div>
                    <div className={styles['menu-container']} onClick={() => {navigate('/notfound', { state: { title: 'Історія підписань', lastPage: 'menu' } })}}>
                        <img src={FoldersIcon} alt="folders"/>
                        <p>Історія підписань</p>
                    </div>
                </div>
                <div className={styles['menu-item']}>
                    <div className={styles['menu-container']} onClick={() => {navigate('/notfound', { state: { title: 'Налаштування', lastPage: 'menu' } })}}>
                        <img src={SettingsIcon} alt="settings"/>
                        <p>Налаштування</p>
                    </div>
                    <div className={styles['menu-line-throught']}></div>
                    <div className={styles['menu-container']}>
                        <img src={UpdateIcon} alt="update"/>
                        <p>Оновити застосунок</p>
                    </div>
                    <div className={styles['menu-line-throught']}></div>
                    <div className={styles['menu-container']} onClick={() => {navigate('/notfound', { state: { title: 'Підключені пристрої', lastPage: 'menu' } })}}>
                        <img src={DevicesIcon} alt="devices"/>
                        <p>Підключені пристрої</p>
                    </div>
                </div>
                <div className={styles['menu-item']}>
                    <div className={styles['menu-container']} onClick={() => {navigate('/notfound', { state: { title: 'Служба підтримки', lastPage: 'menu' } })}}>
                        <img src={ChatIcon} alt="chat"/>
                        <p>Служба підтримки</p>
                    </div>
                    <div className={styles['menu-line-throught']}></div>
                    <div className={styles['menu-container']} onClick={handleCopyDeviceNumber}>
                        <img src={CopyIcon} alt="copy"/>
                        <p>Копіювати номер пристрою</p>
                    </div>
                    <div className={styles['menu-line-throught']}></div>
                    <div className={styles['menu-container']} onClick={() => {navigate('/notfound', { state: { title: 'Питання та відповіді', lastPage: 'menu' } })}}>
                        <img src={AskIcon} alt="ask"/>
                        <p>Питання та відповіді</p>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles['footer-btn']} onClick={handleClearUID}>
                    Вийти
                </div>
                <span onClick={() => window.open("https://diia.gov.ua/app_policy", "_blank")}>Повідомлення про обробку персональних данних</span>
            </div>
        </div>
    </div>
    )
}