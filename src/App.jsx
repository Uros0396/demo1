{
  /*import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Browse from "./Pages/Browse";
import NotFound from "./Pages/NotFound";
import Detail from "./Pages/Detail";

import { useState } from "react";
//import { stringify } from "querystring";

const App = () => {
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
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={handlerInput} name="email" type="email" />
        <input onChange={handlerInput} name="password" type="password" />
        <button type="submit">Enter</button>
      </form>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Detail/:asin" element={<Detail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;*/
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage"; // Importa LoginPage
import Home from "./Pages/Home";
import About from "./Pages/About";
import Browse from "./Pages/Browse";
import NotFound from "./Pages/NotFound";
import Detail from "./Pages/Detail";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      {/* Avvolge l'intera applicazione */}
      <Routes>
        <Route exact path="/" element={<LoginPage />} />{" "}
        {/* Percorso per il login */}
        <Route path="/Home" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/Detail/:asin" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
