import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../ui/calendar.scss";

const months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
];

const weekDays = ["DU", "SE", "CH", "PA", "JU", "SH", "YA"];

const Calendar = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(9); 
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const handleMonthChange = (step: number) => {
        setCurrentMonth((prev) => (prev + step + 12) % 12);
        setSelectedDay(null);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={() => navigate(-1)} className="back-button">⬅</button>
                <h2>Kalendar</h2>
            </div>
            <div className="calendar-body">
                <div className="month-navigation">
                    <button onClick={() => handleMonthChange(-1)} className="nav-button">‹</button>
                    <h3>{months[currentMonth]}, 2025</h3>
                    <button onClick={() => handleMonthChange(1)} className="nav-button">›</button>
                </div>
                <p>Oylik jami: <strong>50 125 000 so'm</strong></p>

                <div className="calendar-grid">
                    {weekDays.map((day, index) => (
                        <div key={index} className="calendar-weekday">{day}</div>
                    ))}

                    {[...Array(31)].map((_, i) => (
                        <div
                            key={i}
                            className={`calendar-day ${selectedDay === i + 1 ? "selected" : ""}`}
                            onClick={() => setSelectedDay(i + 1)}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>

                <div className="payment-info">
                    <h4 className="month">1 {months[currentMonth]} kuni to‘lov kutilmoqda</h4>
                    <div className="payment-card">
                        <p>Avazbek Jahongirov</p>
                        <span>UZS 1 000 000</span>
                    </div>
                    <div className="payment-card">
                        <p>Otabek Sulaymonov</p>
                        <span>UZS 1 000 000</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
