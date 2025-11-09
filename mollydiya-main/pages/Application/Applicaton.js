import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./Application.module.css";
import Home from "../Home/Home";
import Menu from "../Menu/Menu";
import Services from "../Services/Services";
import Documents from "../Documents/Documents";

export default function Application() {
    const location = useLocation();
    const [currentContent, setCurrentContent] = useState("home");
    useEffect(() => {
        const page = location.pathname.replace("/", "") || "home";
        setCurrentContent(page);
    }, [location.pathname]);


    const handleNavigation = (contentType) => {
        setCurrentContent(contentType);
    };

    return (
        <div className={styles.container}>
            <Navigation currentContent={currentContent} onNavigate={handleNavigation} />
            <div className={styles["second-container"]}>
                {currentContent === "home" && <Home />}
                {currentContent === "documents" && <Documents />}
                {currentContent === "services" && <Services />}
                {currentContent === "menu" && <Menu />}
            </div>
        </div>
    );
}
