import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Inicio de sesión exitoso");

        // Guardar token JWT (si el backend lo envía)
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
      } else {
        setMessage("❌ Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setMessage("❌ Error al conectar con el servidor");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
