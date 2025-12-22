import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/admin/login", {
        username,
        password
      });

      if (res.data.success) {
        navigate("/admin");
      } else {
        setError(res.data.message);
      }
    } catch {
      setError("Server error");
    }
  };

  return (
  <div className="page-bg bg-campus-1">
  <div className="page-content">

    <Container className="mt-5">
      <Card className="p-4">
        <h4>Admin Login</h4>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Control
          className="mb-3"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <Form.Control
          type="password"
          className="mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <Button variant="danger" onClick={login}>
          Login
        </Button>
      </Card>
    </Container>

  </div>
  </div>  
  );
}
