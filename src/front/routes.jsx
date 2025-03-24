import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import {Home} from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Private from "./pages/Private";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Rutas protegidas */}
      <Route path="/private" element={
        <PrivateRoute>
          <Private />
        </PrivateRoute>
      } />
    </Route>
  )
);

