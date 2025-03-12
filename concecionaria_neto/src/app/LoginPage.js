import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      const data={
        email:username,
        password:password1
      }
      console.log("estoy mandano", data)
      const res= await axios.post("http://127.0.0.1:4010/user/login2",data)
      console.log(res.data)
      const UsuarioActualmenteLogeado= res.data.UsuarioLogeado
        //jalamos lo de la respuesta y lo guardamos
      localStorage.usuario=JSON.stringify(UsuarioActualmenteLogeado) //Guardo el usuario
      localStorage.id=JSON.stringify(UsuarioActualmenteLogeado._id) //Guardo su ID
      localStorage.nombre=JSON.stringify(UsuarioActualmenteLogeado.nombre)
      localStorage.logined=true
    } catch (error) {
      console.log("Algo salio mal,", error)
    }

    
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password1}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button onClick={handleLogin} className="login-button">
          Iniciar Sesión
        </button>

        <Link to="/RegisterUser" className="register-link">
          ¿No tienes cuenta? Regístrate aquí
        </Link>
      </div>
    </div>
  );
}
