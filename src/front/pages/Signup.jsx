import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    const response = await fetch(backendUrl + "/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Registro exitoso. Ahora inicia sesión.");
      navigate("/login"); // Redirige al login
    } else {
      alert("Error al registrarse. Intenta de nuevo.");
    }
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Signup;
