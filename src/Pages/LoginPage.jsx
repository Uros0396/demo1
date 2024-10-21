{
  /*import { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({});

  const handlerInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4500/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.statusCode === 200) {
        onLogin(true); // Chiama la funzione di login al successo
      } else {
        alert("Login fallito");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          onChange={handlerInput}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={handlerInput}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
};

export default LoginPage;*/
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.statusCode === 200) {
        navigate("/home"); // Reindirizza alla homepage
      } else {
        alert(data.message || "Login fallito"); // Mostra il messaggio di errore dal backend
      }
    } catch (error) {
      console.log(error);
      alert("Si è verificato un errore durante la connessione al server.");
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={onSubmit}
        className="d-flex flex-column justify-content-center align-content-center"
      >
        <input
          onChange={handleInput}
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email" // Corretto a autoComplete
        />
        <input
          onChange={handleInput}
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password" // Corretto a autoComplete
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
