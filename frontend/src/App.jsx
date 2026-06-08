
import Navbar from "./components/Navbar"
import { Route, Routes, Navigate } from "react-router"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import CreateProductPage from "./pages/CreateProductPage"
import EditProductPage from "./pages/EditProductPage"
import useAuthReq from "./hooks/useAuthReq"
import useUserSync from "./hooks/useUserSync"

function App() {

  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded) return null;

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <main className="max-5xl mx-auto px-4 py-8">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/profile" element={isSignedIn ? <ProfilePage /> : <Navigate to={"/"} />} />
          <Route path="/create" element={isSignedIn ? <CreateProductPage /> : <Navigate to={"/"} />} />
          <Route path="/edit/:id" element={isSignedIn ? <EditProductPage /> : <Navigate to={"/"} />} />

        </Routes>

      </main>
    </div>
  )
}

export default App
