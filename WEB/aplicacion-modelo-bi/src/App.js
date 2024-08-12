import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Archivo from './components/Archivo';
import Prediccion from './components/Prediccion';


function App() {

  return (
    <div className="Pagina">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Archivo />} />
          <Route path="/prediccion" element={<Prediccion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
