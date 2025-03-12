// CarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CarList.css'

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:5000/api/cars')
      .then((response) => {
        setCars(response.data.allCars);
      })
      .catch((error) => {
        console.error('There was an error fetching the cars!', error);
      });
  }, []);

  return (
    <div className="car-list">
      <h1>Lista de Carros</h1>
      <div className="car-grid">
        {cars.map((car) => (
          <div key={car._id} className="car-item">
            <img src={car.URLimg} alt={car.nombre} className="car-image" />
            <h3>{car.nombre}</h3>
            <p>{car.detalles}</p>
            <p><strong>Precio: </strong>{car.precio} USD</p>
            <p><strong>Año: </strong>{car.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
