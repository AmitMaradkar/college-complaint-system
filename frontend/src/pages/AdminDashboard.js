import { useEffect, useState } from "react";
import api from "../services/api";
import AppNavbar from "../components/Navbar";
import StatusCard from "../components/StatusCard";
import {
  Container,
  Card,
  Table,
  Form,
  Alert,
  Row,
  Col
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/dashboard")
      .then(res => setComplaints(res.data))
      .catch(() => setMessage("Please login again"));

    api.get("/admin/analytics")
      .then(res => setStats(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.post("/admin/update-status", { id, status });
    const res = await api.get("/admin/dashboard");
    setComplaints(res.data);
  };

  const logout = async () => {
    await api.get("/admin/logout");
    window.location.href = "/";
  };

  return (
    <>
      <AppNavbar title="Admin Dashboard" logout={logout} />

    <div className="page-bg bg-campus-3">
      <div className="page-content">
      <Container className="mt-4">
        {message && <Alert variant="danger">{message}</Alert>}

        {/* ANALYTICS DASHBOARD */}
        <Row className="mb-4">
          <Col><StatusCard title="Submitted" count={stats.Submitted || 0} color="secondary" /></Col>
          <Col><StatusCard title="In Progress" count={stats["In Progress"] || 0} color="warning" /></Col>
          <Col><StatusCard title="Resolved" count={stats.Resolved || 0} color="success" /></Col>
          <Col><StatusCard title="Rejected" count={stats.Rejected || 0} color="danger" /></Col>
        </Row>

        {/* COMPLAINT TABLE */}
        <Card className="p-3">
          <h5>Complaints</h5>

          <Table bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Roll No</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c.id}>
                  <td
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => navigate(`/admin/complaint/${c.id}`)}
                  >
                    {c.id}
                  </td>
                  <td>{c.roll_no}</td>
                  <td>{c.title}</td>
                  <td>
                    <Form.Select
                      value={c.status}
                      onChange={e => updateStatus(c.id, e.target.value)}
                    >
                      <option>Submitted</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Rejected</option>
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>

    </div>
    </div>  
    </>
  );
}
