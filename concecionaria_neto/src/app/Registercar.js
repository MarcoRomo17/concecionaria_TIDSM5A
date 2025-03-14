import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import axios from "axios";
import './RegisterCar.css';

const RegisterCar = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const [carro, setCarro] = useState({
    nombre: "",
    precio: "",
    URLimg: "",
    year: "",
    detalles: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarro((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/cars", carro);
      alert(response.data.msg);
      setCarro({
        nombre: "",
        precio: "",
        URLimg: "",
        year: "",
        detalles: "",
      });
    } catch (error) {
      console.error("Error al registrar el carro", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Registrar Carro</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={carro.nombre}
            onChange={handleChange}
            required
          />
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={carro.precio}
            onChange={handleChange}
            required
          />
          <label>URL de Imagen</label>
          <input
            type="text"
            name="URLimg"
            value={carro.URLimg}
            onChange={handleChange}
            required
          />
          <label>Año</label>
          <input
            type="number"
            name="year"
            value={carro.year}
            onChange={handleChange}
            required
          />
          <label>Detalles</label>
          <textarea
            name="detalles"
            value={carro.detalles}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrar Carro</button>
          <button type="button" className="back-button" onClick={() => navigate("/dashboard")}>
            Regresar al Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCar;
