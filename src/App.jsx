import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./views/auth/Login/Index"
import Pegawai from "./views/pegawai/Index"
import TambahPegawai from "./views/pegawai/Tambah"
import EditPegawai from "./views/pegawai/Edit"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/pegawai" element={<Pegawai />} />
        <Route path="/pegawai/tambah" element={<TambahPegawai />} />
        <Route path="/pegawai/edit/:id" element={<EditPegawai />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
