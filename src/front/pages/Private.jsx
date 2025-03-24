import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Página Protegida</h2>
      <p>{message}</p>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Private;
