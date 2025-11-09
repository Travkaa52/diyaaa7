import React from 'react';
import './Navigation.css'; // Стилі для навігації
import MenuIcon from '../../assets/images/Menu.png';
import MenuIconActive from '../../assets/images/active-Menu.png';
import DocumentIcon from '../../assets/images/Documents.png';
import DocumentActiveIcon from '../../assets/images/Documents-active.png';
import HomeIcon from '../../assets/images/tape.png';
import HomeIconActive from '../../assets/images/tape-active.png';
import ServicesIcon from '../../assets/images/services.png';
import ServicesIconActive from '../../assets/images/services-active.png'


// Компонент навігації
export default function Navigation({ currentContent, onNavigate }) {
    return (
        <div className="navigation">
            <div
                className={`nav-btn ${currentContent === "home" ? "active" : ""} home`}
                onClick={() => onNavigate("home")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNavigate("home")} // Для підтримки доступності
            >
                <img 
                    src={currentContent === "home" ? HomeIconActive : HomeIcon} 
                    alt="home" 
                />
                <span>Стрічка</span>
            </div>
            <div
                className={`nav-btn ${currentContent === "documents" ? "active" : ""} documents`}
                onClick={() => onNavigate("documents")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNavigate("documents")} // Для підтримки доступності
            >
                <img 
                    src={currentContent === "documents" ? DocumentActiveIcon : DocumentIcon}
                    className='documents-icon'
                    alt="Documents" 
                />
                <span>Документи</span>
            </div>
            <div
                className={`nav-btn ${currentContent === "services" ? "active" : ""} services`}
                onClick={() => onNavigate("services")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNavigate("services")} // Для підтримки доступності
            >
                <img 
                    src={currentContent === "services" ? ServicesIconActive : ServicesIcon} 
                    alt="services" 
                />
                <span>Сервіси</span>
            </div>
            <div
                className={`nav-btn ${currentContent === "menu" ? "active" : ""} menu`}
                onClick={() => onNavigate("menu")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNavigate("menu")} // Для підтримки доступності
            >
                <img 
                    src={currentContent === "menu" ? MenuIconActive : MenuIcon} 
                    alt="menu" 
                />
                <span>Меню</span>
            </div>
        </div>
    );
}
