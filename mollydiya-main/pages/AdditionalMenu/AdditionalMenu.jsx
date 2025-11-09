import React from "react";
import styles from "./AdditionalMenu.module.css";
import { useNavigate } from "react-router-dom";

import addDocument from '../../assets/images/addDocument.png';
import swapDocument from '../../assets/images/swapDocument.png';

export default function AdditionalMenu({ }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.additional}`}
    >       
        <div className={styles['additional-wrap']} onClick={() => {navigate('/notfound', { state: { title: 'Додати документ', lastPage: 'documents' } })}}>
            <div className={styles['additional-item']}>
                <img src={addDocument} alt="#"/>
                <span>Додати документ</span>
            </div>
            <div className={styles['additional-item']} onClick={() => {navigate('/notfound', { state: { title: 'Змінити порядок документів', lastPage: 'documents' } })}}>
                <img src={swapDocument} alt="#"/>
                <span>Змінити порядок документів</span>
            </div>
        </div>
    </div>
  );
}
