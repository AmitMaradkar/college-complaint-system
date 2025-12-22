import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

export default function StudentRegister() {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    const res = await api.post("/student/register", {
      roll_no: rollNo,
      name,
      password
    });

    if (res.data.success) {
      navigate("/student/login");
    } else {
      setMessage(res.data.message);
    }
  };

  return (

  <div className="page-bg bg-campus-1">
  <div className="page-content">  
    <Container className="mt-5">
      <Card className="p-4">
        <h4>Create Student Account</h4>

        {message && <Alert variant="danger">{message}</Alert>}

        <Form.Control
          className="mb-3"
          placeholder="Roll Number"
          onChange={e => setRollNo(e.target.value)}
        />

        <Form.Control
          className="mb-3"
          placeholder="Full Name"
          onChange={e => setName(e.target.value)}
        />

        <Form.Control
          type="password"
          className="mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <Button onClick={register}>Register</Button>
      </Card>
    </Container>

  </div>
  </div>  
  );
}
