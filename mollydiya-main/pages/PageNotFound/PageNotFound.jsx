    import React from "react";
    import { useLocation, useNavigate } from "react-router-dom"; 
    import styles from './PageNotFound.module.css';
    import ArrowIcon from "../../assets/images/arrow.svg";

    export default function PageNotFound() {
        const location = useLocation();
        const navigate = useNavigate();

        const { title, lastPage } = location.state || { title: "Невідомий сервіс", lastPage: "home" };

        const handleBack = () => {
            navigate(-1, {
                state: {
                    fromPage: title, // передаємо попередню сторінку
                }
            });
        };

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <img 
                        src={ArrowIcon} 
                        alt="Back" 
                        onClick={handleBack} 
                        style={{ cursor: 'pointer' }} 
                    />
                    <span>{title}</span>
                </div>
                <div className={styles.body}>
                    <span style={{ fontSize: '64px' }}>🤷‍♂️</span>
                    <span>Трапилась якась помилка, вам слід перезапустити додаток</span>
                </div>
            </div>
        );
    }
