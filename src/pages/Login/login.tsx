import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import "../../ui/login.scss";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime(); // Boshlanishida vaqtni o‘rnatish
        const interval = setInterval(updateTime, 60000); // Har 1 minutda yangilanadi

        return () => clearInterval(interval); // Cleanup
    }, []);

    const handleSubmit = (): void => {
        if (username.trim()) {
            localStorage.setItem("username", username);
            localStorage.setItem("token", "fake-token");
            navigate("/profile");
        }
    };

    return (
        <Card className="logins">
            <div className="login-enter-images">
                <img className="login-enter" src="/public/assets/images/login enter pictures.png" alt="" />
            </div>
            <div className="phone">
                <div className="phone-time">
                    <p>{currentTime}</p> {/* 📌 Telefonda ko‘rinadigan vaqt */}
                </div>
                <div className="phone-image">
                    <img src="/public/assets/icons/Signal.svg" alt="" />
                    <img src="/public/assets/icons/Connection.svg" alt="#" />
                    <img src="/public/assets/icons/Battery.svg" alt="#" />
                </div>
            </div>
            <div className="login-image">
                <img src="/public/assets/icons/LOGO.svg" alt="" />
            </div>
            <h4>Dasturga kirish</h4>
            <p className="logins-text">
                Iltimos, tizimga kirish uchun login va <br /> parolingizni kiriting.
            </p>
            <Form onFinish={handleSubmit}>
                <Form.Item
                className="login-input"
                    name="login"
                    rules={[{ required: true, message: "Please enter your login!" }]}
                >
                    <Input placeholder="Login" onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item
                className="login-pasword"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <p className="logins-textes">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
                <Button type="primary" htmlType="submit">
                    Kirish
                </Button>
            </Form>
        </Card>
    );
};

export default Login;
