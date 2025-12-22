import { Navbar, Container, Button } from "react-bootstrap";

export default function AppNavbar({ title, logout }) {
  return (
    <Navbar style={{ backgroundColor: "#0982c8ff" }} variant="dark">
      <Container>
        <Navbar.Brand style={{ fontWeight: "600", color: "white" }}>
          {title}
        </Navbar.Brand>

        {logout && (
          <Button variant="outline-light" onClick={logout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
