import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Для навігації
import styles from './Services.module.css';

import SearchIcon from '../../assets/images/search.png';
import MilitaryHelp from '../../assets/images/helmet.png';
import NezlamIcon from '../../assets/images/thunder.png';
import GerbIcon from '../../assets/images/gerb.png';
import VidnovIcon from '../../assets/images/repair.png';
import CarIcon from '../../assets/images/car.png';
import HouseIcon from '../../assets/images/house.png';
import IdeaIcon from '../../assets/images/idea.png';
import BoxIcon from '../../assets/images/box.png';
import CaseIcon from '../../assets/images/case.png';
import CharityIcon from '../../assets/images/charity.png';
import VerdictIcon from '../../assets/images/verdict.png';
import OselaIcon from '../../assets/images/osela.png';
import AlertIcon from '../../assets/images/alert.png';
import DovidkaIcon from '../../assets/images/dovidka.png';
import ControllerIcon from '../../assets/images/controller.png';
import CovidIcon from '../../assets/images/covid.png';

const servicesList = [
    { id: 1, name: "Допомога армії", icon: MilitaryHelp },
    { id: 2, name: "Незламність", icon: NezlamIcon },
    { id: 3, name: "Військові облігації", icon: GerbIcon },
    { id: 4, name: "єВідновлення", icon: VidnovIcon },
    { id: 5, name: "Водієві", icon: CarIcon },
    { id: 6, name: "Місце проживання", icon: HouseIcon },
    { id: 7, name: "Обмін лампочок", icon: IdeaIcon },
    { id: 8, name: "Послуги для ВПО", icon: BoxIcon },
    { id: 9, name: "Податки", icon: CaseIcon },
    { id: 10, name: "Допомога по безробіттю", icon: CharityIcon },
    { id: 11, name: "Судові послуги", icon: VerdictIcon },
    { id: 12, name: "єОселя", icon: OselaIcon },
    { id: 13, name: "Виконавчі провадження", icon: AlertIcon },
    { id: 14, name: "Довідки та витяги", icon: DovidkaIcon },
    { id: 15, name: "Розваги", icon: ControllerIcon },
    { id: 16, name: "COVID-сертифікати", icon: CovidIcon },
];

export default function Services() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); // Ініціалізація навігації

    const filteredServices = servicesList.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleServiceClick = (serviceName) => {
        navigate('/notfound', { state: { title: serviceName, lastPage: 'services' } });
    };

    return (
        <div className="scrollable">
            <div className={styles['bg']}>
            <div className={styles['header']}>
                <h2>Сервіси</h2>
            </div>
            <div className={styles['search-wrap']}>
                <img src={SearchIcon} alt="search" />
                <input 
                    placeholder="Пошук"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={styles['services-wrapper']}>
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <div 
                            key={service.id} 
                            className={styles['services-item']}
                            onClick={() => handleServiceClick(service.name)} // Обробник кліку
                        >
                            <div>
                                <img src={service.icon} alt={service.name} />
                            </div>
                            <span>{service.name}</span>
                        </div>
                    ))
                ) : (
                    <p className={styles.notfound}>Сервіси не знайдено</p>
                )}
            </div>
        </div>
        </div>
    );
}
