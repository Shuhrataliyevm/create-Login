import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../ui/profile.scss";

const Profile = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "Foydalanuvchi"; // Default nom
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="profile-container">
            <div className="profile-phone">
                <div className="profile-time">
                    <p>{currentTime}</p>
                </div>
                <div className="phones-image">
                    <img src="/public/assets/icons/Signal.svg" alt="" />
                    <img src="/public/assets/icons/Connection.svg" alt="#" />
                    <img src="/public/assets/icons/Battery.svg" alt="#" />
                </div>
            </div>
            <div className="profile-card">
                <img
                    src="/public/assets/images/image@2x.png"
                    alt="Avatar"
                    className="profile-avatar"
                />
                <h2 className="profile-name">{username}</h2>
                <button className="logout-btn" onClick={handleLogout}>
                    <img src="/public/assets/icons/logout.svg" alt="#" />
                </button>
                <button onClick={() => navigate("/calendar")} className="calendar">

                    <img src="/public/assets/images/calendar.png" alt="#" />
                </button>
                <div className="reason">
                    <div className="texts">
                        <h4>135,214,200 so'm</h4>
                        <p>Umumiy nasiya:</p>
                        <div className="img">
                            <img src="/public/assets/images/Show.png" alt="#" />
                        </div>
                    </div>
                </div>
                <div className="spends">
                    <div className="spend">
                        <h5>Kechiktirilgan <br /> to'lovlar</h5>
                        <p className="color">26</p>
                    </div>
                    <div className="cost">
                        <h5>Mijozlar <br /> soni</h5>
                        <p className="colors">151</p>
                    </div>
                </div>

                <div className="carts">
                    <div className="cart">
                        <img src="/public/assets/images/Wallet icon.png" alt="" />
                        <p>Hisobingizda</p>
                        <h3>300 000 so'm</h3>
                        <button onClick={() => {
                            const amount = prompt("To‘lov miqdorini kiriting");
                            if (amount) {
                                console.log("To‘lov miqdori:", amount);
                            }
                        }}>+</button>

                        <div className="nace">
                            <p>Bu oy uchun to‘lov:</p>
                            <p id="cart-color">To‘lov qilingan</p>
                        </div>
                    </div>
                </div>

                <div className="nastroyka">
                    <div className="homes">
                        <img src="/public/assets/images/home.png" alt="" />
                        <p className="menu">Asosiy</p>
                    </div>
                    <div className="homes">
                        <img src="/public/assets/images/user.png" alt="" />
                        <p>Mijozlar</p>
                    </div>
                    <div className="homes">
                        <img src="/public/assets/images/Folder.png" alt="" />
                        <p>Hisobot</p>
                    </div>
                    <div className="homes">
                        <img src="/public/assets/images/Settings.png" alt="" />
                        <p>Sozlama</p>
                    </div>
                </div>

            </div>
            <div className="profiles-images">
                <img className="profile-img" src="/public/assets/images/login enter pictures.png" alt="" />
            </div>
        </div>
    );
};

export default Profile;
