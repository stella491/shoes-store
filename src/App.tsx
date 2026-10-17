import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Collection from "./Pages/Collection";
import Navbar from "./Components/Navbar";
import Product from "./Components/Product";
import { ToastContainer } from "react-toastify";
import CategoryPage from "./Pages/CategoryPage";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";
import RequireAuth from "./Components/RequireAuth";
import RequireAdmin from "./Components/RequireAdmin";
import Admin from "./Pages/Admin";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="collection" element={<Collection />} />

        <Route
          path="/product/:id"
          element={
            <RequireAuth>
              <Product/>
            </RequireAuth>
          }
        />

        <Route
          path="/category/:gender"
          element={
            <RequireAuth>
              <CategoryPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
