import { Card } from "react-bootstrap";

export default function StatusCard({ title, count, color }) {
  return (
    <Card className={`p-3 text-white bg-${color}`}>
      <h5>{count}</h5>
      <p>{title}</p>
    </Card>
  );
}
