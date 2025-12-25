import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

export default function StudentLogin() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { roll_no: rollNo, password };

    try {
      const res = await api.post("/student/login", data);

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/student/dashboard");
      } else {
        setError(res.data.message);
      }
    } catch {
      setError("⚠ Server error. Try again.");
    }
  };

  return (
    <div className="page-bg bg-campus-1">
      <div className="page-content">
        <Container className="mt-5">
          <Card className="p-4">
            <h4>Student Login</h4>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Control
                placeholder="Roll Number"
                className="mb-3"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />

              <Form.Control
                type="password"
                placeholder="Password"
                className="mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit">Login</Button>
            </Form>

            <p className="mt-3">
              New student? <a href="/student/register">Create account</a>
            </p>
          </Card>
        </Container>
      </div>
    </div>
  );
}
