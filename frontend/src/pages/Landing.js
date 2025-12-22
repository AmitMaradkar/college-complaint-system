import { Container, Row, Col } from "react-bootstrap";
import LoginCard from "../components/LoginCard";

export default function Landing() {
  return (
      <div className="page-bg bg-campus-1">
    <div className="page-content">

    <Container className="mt-5">
      <h2 className="text-center mb-5">
        Welcome to CampusConnect: Campus Complaint Management System
      </h2>
        

      <Row className="justify-content-center">
        <Col md={4}>
          <LoginCard
            title="Student Login"
            color="primary"
            path="/student/login"
          />
        </Col>

        <Col md={4}>
          <LoginCard
            title="Admin Login"
            color="danger"
            path="/admin/login"
          />
        </Col>
      </Row>          
    </Container>

      <div className="tagline">
          “Bridging the gap between problems and progress.”
        </div>

   </div>
  </div>
  );
}
