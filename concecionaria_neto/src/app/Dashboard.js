import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Form, Dropdown } from "react-bootstrap";
import "./Dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default function Dashboard() {
  const [cars, setCars] = useState([]);
  useEffect(()=>{
    getAllCars()
  },[])
  const [busqueda, setBusqueda] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);


  const getAllCars= async()=>{
    const vehicles= await axios.get("http://127.0.0.1:4010/carro/getAll")
    const allCars= vehicles.data.allCars
   // console.log(allCars)
   setCars(allCars)
  }


  const carros = [
    {
      id: 1,
      nombre: "Toyota Corolla",
      URLimg: "https://th.bing.com/th/id/OIP.sskhamCSgWDF7CwNn38JTgHaEo?rs=1&pid=ImgDetMain",
      detalles: "Sedan compacto con gran eficiencia en cuanto su ahorro de combustible",
      descripcionExtendida: "El Toyota Corolla 2024 es sinónimo de confiabilidad y eficiencia. Su diseño moderno y tecnología avanzada hacen que cada viaje sea placentero y seguro. Con una excelente economía de combustible y un interior cómodo, es ideal para familias y profesionales que buscan estilo y rendimiento.",
      precio: "$22,500 USD",
      year: 2024,
    },

    {
      id: 2,
      nombre: "Honda Civic",
      imagen: "https://th.bing.com/th/id/OIP.wwJnb1z1yXH78CBKKsBtIAHaEL?w=284&h=180&c=7&pcl=1b1a19&r=0&o=5&dpr=1.3&pid=1.7",
      descripcion: "Compacto con alto rendimiento y diseño elegante",
      descripcionExtendida: "El Honda Civic 2024 combina un diseño deportivo con tecnología de punta. Su motor eficiente y su sistema de seguridad avanzado hacen que cada viaje sea cómodo y seguro. Perfecto para quienes buscan un auto confiable y con estilo.",
      precio: "$24,000 USD",
      año: 2024,
    },

    {
      id: 3,
      nombre: "Ford Mustang",
      imagen: "https://th.bing.com/th/id/OIP.xNfDeB4uoLZC_IpviEC1QgHaEK?w=321&h=180&c=7&pcl=1b1a19&r=0&o=5&dpr=1.3&pid=1.7",
      descripcion: "Clásico muscle car con un potente motor V8.",
      descripcionExtendida: "El Ford Mustang 2023 es el ícono de los muscle cars. Con su motor V8 rugiente y un diseño agresivo, ofrece una experiencia de conducción emocionante. Ideal para los amantes de la velocidad y la adrenalina.",
      precio: "$35,000 USD",
      año: 2023,
    },

    {
      id: 4,
      nombre: "Chevrolet Camaro",
      imagen: "https://th.bing.com/th/id/OIP.ktlWLFTzybI_LE8eSOEBzAHaE8?w=254&h=180&c=7&pcl=1b1a19&r=0&o=5&dpr=1.3&pid=1.7",
      descripcion: "Diseño agresivo y alto rendimiento.",
      descripcionExtendida: "El Chevrolet Camaro 2023 ofrece una combinación perfecta de potencia y diseño. Con su desempeño impresionante y tecnología de vanguardia, es un auto deportivo ideal para quienes buscan emoción en la carretera.",
      precio: "$37,000 USD",
      año: 2023,
    },

    {
      id: 5,
      nombre: "Tesla Model 3",
      imagen: "https://th.bing.com/th/id/OIP.Px_Vbzh4kcAoKwaTwVlOrgHaFj?w=238&h=180&c=7&pcl=1b1a19&r=0&o=5&dpr=1.3&pid=1.7",
      descripcion: "Eléctrico con tecnología de conducción autónoma.",
      descripcionExtendida: "El Tesla Model 3 es el auto del futuro. Con su sistema de conducción autónoma y su increíble eficiencia eléctrica, ofrece una experiencia de manejo innovadora, segura y ecológica.",
      precio: "$40,000 USD",
      año: 2023,
    },

    {
      id: 7,
      nombre: "Mazda CX-5",
      imagen: "https://th.bing.com/th/id/OIP.6UTUKc37nCR6DzhLXSuklwHaE8?w=282&h=188&c=7&pcl=1b1a19&r=0&o=5&dpr=1.3&pid=1.7",
      descripcion: "SUV compacto con diseño y desempeño impresionante.",
      descripcionExtendida: "El Mazda CX-5 2023 es un SUV que combina lujo y desempeño. Su diseño atractivo, excelente manejo y tecnología avanzada lo convierten en una opción ideal para quienes buscan estilo y funcionalidad.",
      precio: "$33,000 USD",
      año: 2023,
    }
  ];

  const logout = () => {
    localStorage.clear()
    window.location.href = "/"
}

  return (
    <div className="main_content">
      <nav>
        <h2 className="text-center mt-4">Bienvenido a la Concesionaria Neto</h2>
        <Row className="mb-4 justify-content-center sticky-search-bar">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Busca un carro"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />  <button class="logout">Salir</button>
          </Col>
       
        </Row>
        
        <Row className="row-cols-1 row-cols-lg-3 g-4">
            {
              cars.map((car)=>(
                <Col key={car.id}>
                <Card className="car-card shadow-sm">
                  <Card.Img variant="top" src={car.URLimg} className="car-image" />
                  <Card.Body>
                    <Card.Title>
                      {car.nombre} ({car.year})
                    </Card.Title>
                    <Card.Text>{car.detalles}</Card.Text>
                    <Card.Text>
                      <strong>{car.precio}</strong>
                    </Card.Text>
                    <Dropdown onToggle={() => setDropdownOpen(dropdownOpen === car.id ? null : car.id)}>
                      <Dropdown.Toggle variant="primary">
                        Detalles
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="p-3">
                        <Dropdown.ItemText>{car.detalles}</Dropdown.ItemText>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Body>
                </Card>
              </Col>
              ))
            }
        </Row>
      </nav>
    </div>
  );
}
