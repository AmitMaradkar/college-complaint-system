import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

export default function StudentLogin() {
    const [rollNo, setRollNo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await api.post("/student/login", {
                roll_no: rollNo,
                password
            });

            if (res.data.success) {
                navigate("/student");
            } else {
                setError(res.data.message);
            }
        } catch {
            setError("Server error");
        }
    };


    api.post("/student/login", data)
  .then(res => {
    if (res.data.success) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/student/dashboard");
    }
  })
  .catch(() => alert("Invalid credentials"));


    return (

    <div className="page-bg bg-campus-1">
    <div className="page-content">

        <Container className="mt-5">
            <Card className="p-4">
                <h4>Student Login</h4>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Control
                    placeholder="Roll Number"
                    className="mb-3"
                    onChange={e => setRollNo(e.target.value)}
                />

                <Form.Control
                    type="password"
                    placeholder="Password"
                    className="mb-3"
                    onChange={e => setPassword(e.target.value)}
                />

                <Button onClick={login}>Login</Button>
                <p className="mt-3">
                 New student? <a href="/student/register">Create account</a>
                </p>

            </Card>
        </Container>
    </div>
    </div>
    );
}
