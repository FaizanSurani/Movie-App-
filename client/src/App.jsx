import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieForm from "./pages/MovieForm";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Header from "./components/Header";

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/search" element={<Search />} />
        <Route path="/addMovie" element={<MovieForm />} />
        <Route path="/signup" element={<Signup /> } />
        <Route path="/login" element={<Login /> } />
      </Routes>
    </BrowserRouter>
    </>
  );
}
