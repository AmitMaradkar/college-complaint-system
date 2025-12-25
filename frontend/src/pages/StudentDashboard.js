import { useEffect, useState } from "react";
import api from "../services/api";
import AppNavbar from "../components/Navbar";
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Alert
} from "react-bootstrap";

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "student") {
    navigate("/student/login");
  }
}, []);


export default function StudentDashboard() {
  const [sections, setSections] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/student/dashboard")
      .then(res => {
        setSections(res.data.sections);
        setComplaints(res.data.complaints);
      })
      .catch(() => setMessage("Please login again"));
  }, []);

  const logout = async () => {
    await api.get("/student/logout");
    window.location.href = "/";
  };

  const submitComplaint = async () => {
    if (!sectionId || !title || !description) {
      setMessage("All fields are required");
      return;
    }

    await api.post("/student/complaint", {
      section_id: sectionId,
      title,
      description
    });

    setMessage("Complaint submitted successfully");

    const res = await api.get("/student/dashboard");
    setComplaints(res.data.complaints);

    setSectionId("");
    setTitle("");
    setDescription("");
  };

  // ✅ JSX MUST BE INSIDE RETURN
  return (
    <>
      {/* NAVBAR */}
      <AppNavbar title="Student Dashboard" logout={logout} />

    <div className="page-bg bg-campus-2">
      <div className="page-content">

      <Container className="mt-4">
        {message && <Alert variant="info">{message}</Alert>}

        <Card className="p-4 mb-4">
          <h5>Submit Complaint</h5>

          <Form.Select
            className="mb-3"
            value={sectionId}
            onChange={e => setSectionId(e.target.value)}
          >
            <option value="">Select Section</option>
            {sections.map(s => (
              <option key={s.id} value={s.id}>
                {s.section_name}
              </option>
            ))}
          </Form.Select>

          <Form.Control
            className="mb-3"
            placeholder="Complaint Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <Form.Control
            as="textarea"
            className="mb-3"
            placeholder="Complaint Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <Button onClick={submitComplaint}>
            Submit Complaint
          </Button>
        </Card>

        <Card className="p-3">
          <h5>My Complaints</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td>{c.status}</td>
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
