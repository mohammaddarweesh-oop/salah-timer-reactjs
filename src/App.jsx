import { Container } from "@mui/material";
import "./App.css";
import MainContent from "./Components/MainContent";

function App() {
  return (
    <>
      <div className="main-div">
        <Container>
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;
