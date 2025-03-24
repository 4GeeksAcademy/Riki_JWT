import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    const response = await fetch(backendUrl + "/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Guarda el token
      alert("Inicio de sesión exitoso");
      navigate("/private"); // Redirige a una página protegida
    } else {
      alert("Error en las credenciales. Intenta de nuevo.");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
