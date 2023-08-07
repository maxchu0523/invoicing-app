import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Link to="invoice" relative="path">
        <Button variant="contained" color="primary">
          Go to Invoice Page
        </Button>
      </Link>
    </>
  );
}

export default App;
