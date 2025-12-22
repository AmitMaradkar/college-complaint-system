import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LoginCard({ title, color, path }) {
  const navigate = useNavigate();

  return (
    <Card className="p-4 text-center">
      <h4>{title}</h4>
      <Button
        className="mt-3"
        variant={color}
        onClick={() => navigate(path)}
      >
        Login
      </Button>
    </Card>
  );
}
