import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import './RegisterUser.css';
import axios from "axios"
import { useNavigate } from "react-router-dom";


const RegistroUsuario = () => {
   const navigate= useNavigate()
    const [usuario, setUsuario] = useState({
      name: "",
      email: "",
      password: "",
    });
  
    const onChangeInput = (e) => {
      const { name, value } = e.target;
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        [name]: value,
      }));

    };
  
    const onSubmit =async (e) => {
      e.preventDefault();
      console.log("Datos del usuario:", usuario);
      try {
        await axios.post("http://127.0.0.1:4010/user/register", usuario)
        navigate('/')
      } catch (error) {
        console.log("Algo salio mal: ", error)
      }
    };
  
    return (
      <Container className="mt-5">
        <Card className="registro-card">
          <Card.Body>
            <Card.Title className="Tittle">Registro de Usuario</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="name"
                  value={usuario.name}
                  onChange={onChangeInput}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  name="email"
                  value={usuario.email}
                  onChange={onChangeInput}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  name="password"
                  value={usuario.password}
                  onChange={onChangeInput}
                  required
                />
              </Form.Group>
              <Button className="Registro" type="submit" variant="primary">
              Registrarse
            </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  };
  
  export default RegistroUsuario;