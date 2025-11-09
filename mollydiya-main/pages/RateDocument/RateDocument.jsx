import React from "react";
import styles from "./RateDocument.module.css";

export default function RateDocument({onClose}) {
    return (<div className={styles['rate-document-overlay']}>
        <div className={styles['rate-document__wrap']}>
            <div className={styles['rate-document__header']}>
                <h2>Поділіться враженнями</h2>
                <span onClick={onClose}>X</span>
            </div>
            <div className={styles['line-throught']}></div>
            <div className={styles['rate-document__main']}>
                <h2>Задоволені документом у Дії?</h2>
                <div>
                    <span onClick={onClose}>😡</span>
                    <span onClick={onClose}>😐</span>
                    <span onClick={onClose}>😁</span>
                    <span onClick={onClose}>😢</span>
                    <span onClick={onClose}>😍</span>
                </div>
            </div>
        </div>
    </div>);
}