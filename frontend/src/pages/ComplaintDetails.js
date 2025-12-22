import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import AppNavbar from "../components/Navbar";
import { Container, Card } from "react-bootstrap";

export default function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    api.get(`/admin/complaint/${id}`)
      .then(res => setComplaint(res.data));
  }, [id]);

  if (!complaint) return null;

  return (
    <>
      <AppNavbar title="Complaint Details" />

    <div className="page-bg bg-campus-3">
      <div className="page-content">
      <Container className="mt-4">
        <Card className="p-4">
          <p><b>Complaint ID:</b> {complaint.id}</p>
          <p><b>Roll No:</b> {complaint.roll_no}</p>
          <p><b>Section:</b> {complaint.section_name}</p>
          <p><b>Title:</b> {complaint.title}</p>
          <p><b>Description:</b> {complaint.description}</p>
          <p><b>Status:</b> {complaint.status}</p>
        </Card>
      </Container>

     </div>
    </div>  
    </>
  );
}
