import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import Home from "./pages/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import ShowContact from "./components/ShowContact";


function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
          <Route path="/show/:id" element={<ShowContact />} />
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  );
}

export default App;


